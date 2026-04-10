import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { Sandbox } from "@e2b/code-interpreter";
import {
  openai,
  createAgent,
  createTool,
  createNetwork,
  type Message,
  createState,
} from "@inngest/agent-kit";

import { db, messages, fragments, projects } from "@/db";
import type { MessageMetadata, DesignSystemRecommendation } from "@/db/schema";
import { FRAGMENT_TITLE_PROMPT, PROMPT, RESPONSE_PROMPT } from "@/prompt";
import {
  searchDesignSystems,
  getDesignSystemById,
  formatDesignSystemForPrompt,
} from "@/lib/design-systems";
import {
  searchFoundationalDocs,
  formatFoundationalDocForPrompt,
} from "@/lib/foundational-docs";
import {
  searchIconLibraries,
  getIconLibraryById,
  searchIconsInLibrary,
  formatIconSearchResults,
} from "@/lib/icon-libraries";

import {
  validateDesignSystem,
  formatValidationResult,
  validateFoundations,
} from "@/lib/validate-design-system";

import { inngest } from "./client";
import { SANDBOX_TIMEOUT } from "./types";
import {
  getSandbox,
  lastAssistantTextMessageContent,
} from "./utils";
import { emitProjectEvent } from "./emit-event";

interface AgentState {
  summary: string;
  files: { [path: string]: string };
}


export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    // Set status to GENERATING at the start
    await step.run("set-generating-status", async () => {
      await db
        .update(projects)
        .set({ designSystemStatus: "GENERATING", currentStep: "sandbox:Creating workspace..." })
        .where(eq(projects.id, event.data.projectId));
      await emitProjectEvent(event.data.projectId, "step", { phase: "sandbox", detail: "Creating workspace..." });
    });

    // Check if the query is clear enough to proceed without clarification
    const clarification = await step.run("check-query-clarity", async () => {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You assess if a UI/component build request has enough detail to proceed. Return JSON: { "clear": boolean, "question": string | null }. "question" should be a single friendly clarifying question if "clear" is false. Be lenient — only mark as unclear when truly ambiguous what to build (e.g. "build something", "make a page" with zero context). Most requests are clear enough.`,
              },
              { role: "user", content: event.data.value },
            ],
            response_format: { type: "json_object" },
            max_tokens: 100,
          }),
        });
        const data = await res.json() as { choices: Array<{ message: { content: string } }> };
        return JSON.parse(data.choices[0]?.message?.content ?? '{"clear":true,"question":null}') as {
          clear: boolean;
          question: string | null;
        };
      } catch {
        return { clear: true, question: null };
      }
    });

    let promptValue = event.data.value;

    if (!clarification.clear && clarification.question) {
      await step.run("ask-clarification", async () => {
        await db
          .update(projects)
          .set({ currentStep: `question:${clarification.question}` })
          .where(eq(projects.id, event.data.projectId));
        await emitProjectEvent(event.data.projectId, "step", { phase: "question", detail: clarification.question });
      });

      const clarificationAnswer = await step.waitForEvent("wait-for-clarification", {
        event: "user/clarification-answer",
        timeout: "10m",
        match: "data.projectId",
      });

      await step.run("process-clarification", async () => {
        await db
          .update(projects)
          .set({ currentStep: "sandbox:Creating workspace..." })
          .where(eq(projects.id, event.data.projectId));
        await emitProjectEvent(event.data.projectId, "step", { phase: "sandbox", detail: "Creating workspace..." });
      });

      if (clarificationAnswer?.data?.answer) {
        promptValue = `${event.data.value}\n\nAdditional context: ${clarificationAnswer.data.answer}`;
      }
    }

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("better-design-sandbox");
      await sandbox.setTimeout(SANDBOX_TIMEOUT);
      // Install motion if not already in the template
      await sandbox.commands.run("npm install motion --save 2>/dev/null || true", { timeoutMs: 30000 });
      return sandbox.sandboxId;
    });

    // Store sandbox URL early so the frontend can show a live preview while generation continues
    await step.run("store-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      const url = `https://${host}`;
      await db
        .update(projects)
        .set({ sandboxUrl: url })
        .where(eq(projects.id, event.data.projectId));
      return url;
    });

    // Fetch design system context if available
    const designSystemContext = await step.run(
      "get-design-system-context",
      async () => {
        await db
          .update(projects)
          .set({ currentStep: "design:Loading design system..." })
          .where(eq(projects.id, event.data.projectId));
        await emitProjectEvent(event.data.projectId, "step", { phase: "design", detail: "Loading design system..." });

        const designSystemId = event.data.designSystemId;
        if (!designSystemId) {
          return "";
        }

        const designSystem = await getDesignSystemById(designSystemId);
        if (!designSystem) {
          return "";
        }

        return formatDesignSystemForPrompt(designSystem);
      },
    );

    // Write base motion helper needed by animated components. lib/utils.ts is
    // owned by each design system (synced to DB as the "lib-utils" row) and
    // written by scaffold-design-system below — don't duplicate it here.
    await step.run("write-base-files", async () => {
      const sandbox = await getSandbox(sandboxId);
      const motionLib = `"use client"

import { useEffect, useState } from "react"

export const springInteraction = {
  type: "spring",
  stiffness: 500,
  damping: 35,
}

export const springStateChange = {
  type: "spring",
  stiffness: 400,
  damping: 30,
}

export function useDataState(ref) {
  const [state, setState] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    setState(el.getAttribute("data-state"))

    const observer = new MutationObserver(() => {
      setState(el.getAttribute("data-state"))
    })

    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] })

    return () => observer.disconnect()
  }, [ref])

  return state
}
`
      await sandbox.files.write("lib/motion.ts", motionLib);
    });

    // Deterministically scaffold design system files before the agent starts
    await step.run(
      "scaffold-design-system",
      async () => {
        const designSystemId = event.data.designSystemId;
        if (!designSystemId) return {};

        const designSystem = await getDesignSystemById(designSystemId);
        if (!designSystem) return {};

        const sandbox = await getSandbox(sandboxId);
        const writtenFiles: { [path: string]: string } = {};

        // Write globals.css first
        const globalsComponent = designSystem.components.find(
          (c) => c.name === "globals",
        );
        if (globalsComponent) {
          await db
            .update(projects)
            .set({ currentStep: "design:Applying theme..." })
            .where(eq(projects.id, event.data.projectId));
          await emitProjectEvent(event.data.projectId, "step", { phase: "design", detail: "Applying theme..." });

          await sandbox.files.write("app/globals.css", globalsComponent.code);
          writtenFiles["app/globals.css"] = globalsComponent.code;
          await emitProjectEvent(event.data.projectId, "file", { path: "app/globals.css", content: globalsComponent.code });
        }

        // Write all component overrides (includes app/page.tsx and app/layout.tsx if seeded)
        for (const component of designSystem.components.filter(
          (c) => c.name !== "globals",
        )) {
          const destination =
            component.destination || `components/ui/${component.name}.tsx`;

          await db
            .update(projects)
            .set({ currentStep: `design:Scaffolding ${component.name}...` })
            .where(eq(projects.id, event.data.projectId));
          await emitProjectEvent(event.data.projectId, "step", { phase: "design", detail: `Scaffolding ${component.name}...` });

          try {
            // Inject globals.css import into layout.tsx if missing
            let code = component.code;
            if (destination === "app/layout.tsx" && !code.includes('import "./globals.css"') && !code.includes("import './globals.css'")) {
              code = `import "./globals.css";\n` + code;
            }
            await sandbox.files.write(destination, code);
            writtenFiles[destination] = code;
            await emitProjectEvent(event.data.projectId, "file", { path: destination, content: code });
          } catch (e) {
            console.error(`Failed to scaffold ${component.name}:`, e);
          }
        }

        await db
          .update(projects)
          .set({ currentStep: null })
          .where(eq(projects.id, event.data.projectId));

        // Return only paths to keep Inngest step payload small
        return Object.keys(writtenFiles);
      },
    );

    const previousMessages = await step.run(
      "get-previous-messages",
      async () => {
        const formattedMessages: Message[] = [];

        const dbMessages = await db.query.messages.findMany({
          where: eq(messages.projectId, event.data.projectId),
          orderBy: desc(messages.createdAt),
          limit: 5,
        });

        for (const message of dbMessages) {
          formattedMessages.push({
            type: "text",
            role: message.role === "ASSISTANT" ? "assistant" : "user",
            content: message.content,
          });
        }

        return formattedMessages.reverse();
      },
    );

    await step.run("set-building-status", async () => {
      await db
        .update(projects)
        .set({ currentStep: "agent:Building your UI..." })
        .where(eq(projects.id, event.data.projectId));
      await emitProjectEvent(event.data.projectId, "step", { phase: "agent", detail: "Building your UI..." });
    });

    const state = createState<AgentState>(
      {
        summary: "",
        files: {}, // scaffolded files are written to sandbox but not tracked in agent state to keep payload small
      },
      {
        messages: previousMessages,
      },
    );

    // Build system prompt with design system context
    let systemPrompt = PROMPT;

    if (designSystemContext) {
      systemPrompt += `\n\n# Design System Guidelines\n\n${designSystemContext}`;
    }

    const codeAgent = createAgent<AgentState>({
      name: "design-system-builder",
      description: "An expert coding agent",
      system: systemPrompt,
      model: openai({
        model: "gpt-4.1",
        defaultParameters: {
          temperature: 0.1,
        },
      }),
      tools: [
        createTool({
          name: "terminal",
          description: "Use the terminal to run commands",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = { stdout: "", stderr: "" };

              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                  },
                });
                return result.stdout;
              } catch (e) {
                console.error(
                  `Command failed: ${e} \nstdout: ${buffers.stdout}\nstderror: ${buffers.stderr}`,
                );
                return `Command failed: ${e} \nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}`;
              }
            });
          },
        }),
        createTool({
          name: "createOrUpdateFiles",
          description: "Create or update files in the sandbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              }),
            ),
          }),
          handler: async (
            { files },
            { step, network },
          ) => {
            // Block overwriting scaffold-managed files
            const PROTECTED = new Set(["app/page.tsx", "app/layout.tsx"]);
            const allowedFiles = files.filter((f) => !PROTECTED.has(f.path));

            // Only allow globals.css modifications
            const globalsOnly = allowedFiles.filter(
              (f) => f.path === "app/globals.css" || f.path.startsWith("components/ui/")
            );

            if (globalsOnly.length === 0) {
              return;
            }

            const newFiles = await step?.run(
              "createOrUpdateFiles",
              async () => {
                try {
                  await db
                    .update(projects)
                    .set({ currentStep: `agent:Writing ${globalsOnly.length} file${globalsOnly.length !== 1 ? "s" : ""}...` })
                    .where(eq(projects.id, event.data.projectId));
                  const sandbox = await getSandbox(sandboxId);
                  const written: { [path: string]: string } = {};
                  for (const file of globalsOnly) {
                    await sandbox.files.write(file.path, file.content);
                    written[file.path] = file.content;
                    await emitProjectEvent(event.data.projectId, "file", { path: file.path, content: file.content });
                  }
                  // Return only newly-written files (not cumulative) to keep Inngest step payload small
                  return written;
                } catch (e) {
                  return "Error: " + e;
                }
              },
            );

            if (typeof newFiles === "object") {
              // Merge new files into existing state rather than replacing
              network.state.data.files = {
                ...(network.state.data.files || {}),
                ...newFiles,
              };
            }
          },
        }),
        createTool({
          name: "readFiles",
          description: "Read files from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step }) => {
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }
                return JSON.stringify(contents);
              } catch (e) {
                return "Error: " + e;
              }
            });
          },
        }),
        createTool({
          name: "switchDesignSystem",
          description:
            "Switch to a different design system when the user requests a visual style change or mentions wanting it to look like a specific product (e.g., 'make it look like Airbnb', 'more minimal like Linear'). Returns the new design system context to use.",
          parameters: z.object({
            query: z
              .string()
              .describe(
                "The design system or style the user wants (e.g., 'Airbnb', 'Linear', 'minimal', 'modern dashboard')",
              ),
          }),
          handler: async ({ query }, { step }) => {
            return await step?.run("switch-design-system", async () => {
              const results = await searchDesignSystems(query, 1);
              if (results.length === 0) {
                return "No matching design system found for the requested style.";
              }

              const newDesignSystem = results[0];

              await db
                .update(projects)
                .set({ designSystemId: newDesignSystem.id })
                .where(eq(projects.id, event.data.projectId));

              const fullDesignSystem = await getDesignSystemById(
                newDesignSystem.id,
              );
              if (!fullDesignSystem) {
                return `Switched to ${newDesignSystem.title} but could not load full details.`;
              }

              const context = formatDesignSystemForPrompt(fullDesignSystem);
              return `Successfully switched to ${newDesignSystem.title} design system (${newDesignSystem.matchScore}% match).\n\n${context}`;
            });
          },
        }),
        createTool({
          name: "getUIGuidance",
          description:
            "Get UI design guidance and best practices for a specific topic. Use this when you need guidance on shadows, borders, colors, animations, spacing, or other UI design decisions.",
          parameters: z.object({
            topic: z
              .string()
              .describe(
                "The UI topic to get guidance on (e.g., 'shadows instead of borders', 'color contrast', 'animation timing', 'button spacing')",
              ),
          }),
          handler: async ({ topic }, { step }) => {
            return await step?.run("get-ui-guidance", async () => {
              const results = await searchFoundationalDocs(topic, 2);
              if (results.length === 0) {
                return "No specific guidance found for this topic. Use your best judgment based on modern UI best practices.";
              }

              return results
                .map((doc) => formatFoundationalDocForPrompt(doc))
                .join("\n\n---\n\n");
            });
          },
        }),
        createTool({
          name: "searchIcons",
          description:
            "Search for icons matching a term. Returns icons from the project's configured icon library with consistent styling. Always use this tool to find icons - never guess icon names.",
          parameters: z.object({
            query: z
              .string()
              .describe(
                "What icon you need (e.g., 'home', 'settings', 'user', 'arrow right', 'shopping cart')",
              ),
          }),
          handler: async ({ query }, { step }) => {
            return await step?.run("search-icons", async () => {
              // Get project's icon library config
              const project = await db.query.projects.findFirst({
                where: eq(projects.id, event.data.projectId),
              });

              const libraryId = project?.iconLibraryId || "phosphor";
              const variant = project?.iconVariant || undefined;

              const library = await getIconLibraryById(libraryId);
              if (!library) {
                return `Icon library "${libraryId}" not found. Using default search.`;
              }

              const icons = await searchIconsInLibrary(
                query,
                library,
                variant,
                10,
              );

              return formatIconSearchResults(icons, library, variant);
            });
          },
        }),
      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);

          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        },
      },
    });

    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents: [codeAgent],
      maxIter: 15,
      defaultState: state,
      router: async ({ network }) => {
        const summary = network.state.data.summary;

        if (summary) {
          return;
        }

        return codeAgent;
      },
    });

    const result = await network.run(promptValue, { state });

    // Validate design system completeness
    await step.run("validate-design-system", async () => {
      await db
        .update(projects)
        .set({ currentStep: "finalizing:Validating output..." })
        .where(eq(projects.id, event.data.projectId));
      await emitProjectEvent(event.data.projectId, "step", { phase: "finalizing", detail: "Validating output..." });
      const files = result.state.data.files || {};

      // Validate component completeness
      const componentValidation = validateDesignSystem(files);
      const foundationValidation = validateFoundations(files);

      console.log("\n=== Design System Validation ===");
      console.log(formatValidationResult(componentValidation));

      if (!foundationValidation.hasFoundations) {
        console.log("\n⚠️  Missing Foundations files:");
        foundationValidation.missing.forEach(path => {
          console.log(`  - ${path}`);
        });
      } else {
        console.log("\n✓ All Foundations files present");
      }

      // Enforce globals.css import in layout.tsx — agent sometimes forgets it
      const sandbox = await getSandbox(sandboxId);
      try {
        const layoutContent = await sandbox.files.read("app/layout.tsx");
        if (!layoutContent.includes('import "./globals.css"') && !layoutContent.includes("import './globals.css'")) {
          const fixed = `import "./globals.css";\n` + layoutContent;
          await sandbox.files.write("app/layout.tsx", fixed);
          console.log("✓ Injected missing globals.css import into layout.tsx");
        }
      } catch {
        console.log("⚠️  Could not read/fix app/layout.tsx");
      }

      return {
        componentValidation,
        foundationValidation,
      };
    });

    const fragmentTitle = await step.run("generate-fragment-title", async () => {
      await db
        .update(projects)
        .set({ currentStep: "finalizing:Generating response..." })
        .where(eq(projects.id, event.data.projectId));
      await emitProjectEvent(event.data.projectId, "step", { phase: "finalizing", detail: "Generating response..." });
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: FRAGMENT_TITLE_PROMPT },
            { role: "user", content: result.state.data.summary || "Design system documentation" },
          ],
          max_tokens: 20,
        }),
      });
      const data = await res.json() as { choices: Array<{ message: { content: string } }> };
      return data.choices[0]?.message?.content?.trim() || "Design System";
    });

    const responseText = await step.run("generate-response", async () => {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: RESPONSE_PROMPT },
            { role: "user", content: result.state.data.summary || "Design system documentation site" },
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json() as { choices: Array<{ message: { content: string } }> };
      return data.choices[0]?.message?.content?.trim() || "Your design system documentation is ready!";
    });

    const isError = Object.keys(result.state.data.files || {}).length === 0;

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    // Collect all files from sandbox to show complete file tree in Code tab
    const allFiles = await step.run("collect-sandbox-files", async () => {
      const sandbox = await getSandbox(sandboxId);
      const collected: Record<string, string> = { ...result.state.data.files };

      const staticPaths = ["app/globals.css", "app/layout.tsx", "app/page.tsx"];
      for (const path of staticPaths) {
        if (collected[path]) continue;
        try {
          collected[path] = await sandbox.files.read(path);
        } catch {
          // file doesn't exist, skip
        }
      }

      try {
        const uiFiles = await sandbox.files.list("components/ui");
        await Promise.all(
          uiFiles.map(async (entry) => {
            if (entry.type === "dir") return;
            const path = `components/ui/${entry.name}`;
            if (collected[path]) return;
            try {
              collected[path] = await sandbox.files.read(path);
            } catch {
              // skip unreadable files
            }
          }),
        );
      } catch {
        // components/ui doesn't exist yet
      }

      return collected;
    });

    await step.run("save-result", async () => {
      if (isError) {
        const [errorMessage] = await db
          .insert(messages)
          .values({
            projectId: event.data.projectId,
            content: "Something went wrong. Please try again.",
            role: "ASSISTANT",
            type: "ERROR",
          })
          .returning();

        // Update project status to ERROR
        await db
          .update(projects)
          .set({ designSystemStatus: "ERROR", currentStep: null })
          .where(eq(projects.id, event.data.projectId));

        await emitProjectEvent(event.data.projectId, "error", { message: "Something went wrong. Please try again." });

        return errorMessage;
      }

      const [createdMessage] = await db
        .insert(messages)
        .values({
          projectId: event.data.projectId,
          content: responseText,
          role: "ASSISTANT",
          type: "RESULT",
        })
        .returning();

      const [createdFragment] = await db.insert(fragments).values({
        messageId: createdMessage.id,
        sandboxUrl: sandboxUrl,
        title: fragmentTitle,
        files: allFiles,
      }).returning();

      // Update project status to COMPLETED
      await db
        .update(projects)
        .set({ designSystemStatus: "COMPLETED", currentStep: null })
        .where(eq(projects.id, event.data.projectId));

      await emitProjectEvent(event.data.projectId, "complete", {
        messageId: createdMessage.id,
        fragmentId: createdFragment.id,
        sandboxUrl,
      });

      return createdMessage;
    });

    await step.run("kill-sandbox", async () => {
      try {
        const sandbox = await getSandbox(sandboxId);
        await sandbox.kill();
      } catch {
        // sandbox may already be dead
      }
    });

    return {
      url: sandboxUrl,
      title: "Fragment",
      files: allFiles,
      summary: result.state.data.summary,
    };
  },
);

// Threshold for auto-selecting a design system without user confirmation
export const designSystemRecommenderFunction = inngest.createFunction(
  { id: "design-system-recommender" },
  { event: "design-system/recommend" },
  async ({ event, step }) => {
    const { projectId, userMessage } = event.data;

    const recommendations = await step.run(
      "search-design-systems",
      async () => {
        const results = await searchDesignSystems(userMessage, 3);

        return results.map(
          (result): DesignSystemRecommendation => ({
            id: result.id,
            title: result.title,
            description: result.description,
            personality: result.personality,
            matchScore: result.matchScore,
          }),
        );
      },
    );

    // Find matching icon library based on top design system's personality
    const suggestedIconLibrary = await step.run(
      "search-icon-libraries",
      async () => {
        try {
          const topRecommendation = recommendations[0];
          if (!topRecommendation) return null;

          const personality = topRecommendation.personality;
          const personalityQuery = Array.isArray(personality) && personality.length > 0
            ? personality.join(" ")
            : topRecommendation.title;

          const iconResults = await searchIconLibraries(personalityQuery, 1);
          if (iconResults.length === 0) return null;

          const iconLib = iconResults[0];
          return {
            id: iconLib.id,
            name: iconLib.name,
            prefix: iconLib.prefix,
            variants: iconLib.variants,
            defaultVariant: iconLib.defaultVariant,
            matchScore: iconLib.matchScore,
          };
        } catch (e) {
          console.error("Icon library search failed, continuing without icon suggestion:", e);
          return null;
        }
      },
    );

    const topRecommendation = recommendations[0];
    // Always auto-select the highest match - no need to ask user
    const shouldAutoSelect: boolean = !!topRecommendation;

    if (shouldAutoSelect) {
      // High-confidence match - auto-select and start code generation
      await step.run("auto-select-design-system", async () => {
        let content = `Using **${topRecommendation.title}** design system (${topRecommendation.matchScore}% match) - ${topRecommendation.description}.`;

        if (suggestedIconLibrary) {
          content += ` Paired with **${suggestedIconLibrary.name}** icons.`;
        }

        content += ` Building your component now...`;

        await db.insert(messages).values({
          projectId,
          content,
          role: "ASSISTANT",
          type: "RESULT",
        });

        await db
          .update(projects)
          .set({
            designSystemId: topRecommendation.id,
            designSystemStatus: "SELECTED",
            iconLibraryId: suggestedIconLibrary?.id ?? "tabler",
            iconVariant: suggestedIconLibrary?.defaultVariant ?? "outline",
          })
          .where(eq(projects.id, projectId));
      });

      // Trigger code generation immediately
      await step.run("trigger-code-agent", async () => {
        await inngest.send({
          name: "code-agent/run",
          data: {
            value: userMessage,
            projectId,
            designSystemId: topRecommendation.id,
          },
        });
      });

      return { recommendations, suggestedIconLibrary, autoSelected: true };
    }

    // No recommendations found
    if (!topRecommendation) {
      return { recommendations, suggestedIconLibrary, autoSelected: false };
    }

    // Low-confidence match - ask user to select
    await step.run("save-recommendation-message", async () => {
      const metadata: MessageMetadata = {
        type: "recommendation",
        recommendations,
        suggestedIconLibrary,
      };

      let content = `I found some design systems that could work for your project. The top match is **${topRecommendation.title}** (${topRecommendation.matchScore}% match) - ${topRecommendation.description}.`;

      if (suggestedIconLibrary) {
        content += ` I'll pair it with **${suggestedIconLibrary.name}** icons for consistent styling.`;
      }

      content += ` Please select one to continue.`;

      await db.insert(messages).values({
        projectId,
        content,
        role: "ASSISTANT",
        type: "RESULT",
        metadata,
      });

      await db
        .update(projects)
        .set({ designSystemStatus: "PENDING" })
        .where(eq(projects.id, projectId));
    });

    return { recommendations, suggestedIconLibrary, autoSelected: false };
  },
);
