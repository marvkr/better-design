import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { DataProvider } from "./data-provider";

const REGISTRY_BASE_URL =
  process.env.BETTER_DESIGN_REGISTRY_URL ??
  "https://www.better-design.com/registry";

function truncateToTokens(text: string, maxTokens: number): string {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + `\n\n...(truncated to ~${maxTokens} tokens)`;
}

export function registerAllTools(
  server: McpServer,
  provider: DataProvider,
  onToolUsage?: (tool: string, params: Record<string, unknown>) => void,
): void {
  const track = (tool: string, params: Record<string, unknown>) => {
    if (onToolUsage) onToolUsage(tool, params);
  };

  // ─── Tool 1: resolve-design-system ──────────────────────────────────────

  server.registerTool(
    "resolve-design-system",
    {
      title: "Resolve Design System",
      description: `Search for design systems matching a query using semantic search.

You MUST call this before 'get-design-system-docs' to obtain a valid design system ID.

Search by:
- Industry (fintech, education, travel, developer tools)
- Personality traits (professional, playful, minimal, warm)
- Natural language descriptions of the UI you want

Examples:
- "fintech startup" → Stripe design system
- "playful education app" → Duolingo design system
- "minimal developer tools" → Linear design system`,
      inputSchema: z.object({
        query: z.string().describe("Natural language query describing the type of UI you're building."),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ query }) => {
      track("resolve-design-system", { query });
      try {
        const results = await provider.searchDesignSystems(query, 5);

        if (results.length === 0) {
          return { content: [{ type: "text" as const, text: "No design systems found matching your query." }] };
        }

        const formatted = results
          .map((r) =>
            [
              `**ID:** ${r.id}`,
              `**Title:** ${r.title}`,
              `**Description:** ${r.description}`,
              `**Personality:** ${r.personality.join(", ")}`,
              `**Industry:** ${r.industry.join(", ")}`,
              `**Components:** ${r.componentCount}`,
              `**Registry:** ${REGISTRY_BASE_URL}/${r.id}`,
            ].join("\n"),
          )
          .join("\n\n----------\n\n");

        return {
          content: [{
            type: "text" as const,
            text: `# Available Design Systems\n\nEach result includes an **ID** to use with get-design-system-docs.\n\n---\n\n${formatted}`,
          }],
        };
      } catch (error) {
        return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }] };
      }
    },
  );

  // ─── Tool 2: get-design-system-docs ─────────────────────────────────────

  server.registerTool(
    "get-design-system-docs",
    {
      title: "Get Design System Documentation",
      description: `Scaffolds a design system into the user's project.

You must call 'resolve-design-system' first to obtain the design system ID.

**Default behavior (recommended): install the full design system.**
Call with only a designSystemId and this tool returns ONE shadcn command that
installs every component (globals + all UI primitives) into components/ui/ in
one shot. Run that command before you start writing feature code — the agent
should always have the full component library available.

Pass 'component' only when the user explicitly asks to inspect or customise a
specific component's source code. In that mode the tool returns just the
requested components plus their source code, not an install command.`,
      inputSchema: z.object({
        designSystemId: z.string().describe("The design system ID from resolve-design-system"),
        component: z.union([z.string(), z.array(z.string())]).optional()
          .describe('Optional. Only pass this when the user asks to inspect specific component source code. Examples: "button", ["button", "card"]. Omit to scaffold the entire design system.'),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ designSystemId, component }) => {
      track("get-design-system-docs", { designSystemId, component });
      try {
        const system = await provider.getDesignSystemById(designSystemId);
        if (!system) {
          return { content: [{ type: "text" as const, text: `Design system '${designSystemId}' not found.` }] };
        }

        const { metadata, components: allComponents } = system;

        const header: string[] = [
          `# ${metadata.title}\n`,
          `**Description:** ${metadata.description}`,
          `**Personality:** ${metadata.personality.join(", ")}`,
          `**Industry:** ${metadata.industry.join(", ")}`,
        ];
        if (metadata.primaryColor) header.push(`**Primary Color:** ${metadata.primaryColor}`);
        if (metadata.borderRadius) header.push(`**Border Radius:** ${metadata.borderRadius}`);
        if (metadata.font) header.push(`**Font:** ${metadata.font}`);

        // Install-all mode — default when no component filter is passed.
        if (!component) {
          const installNames = [
            "globals",
            ...allComponents.map((c) => c.name).sort(),
          ];
          const installUrls = installNames
            .map((name) => `${REGISTRY_BASE_URL}/${metadata.id}/${name}.json`)
            .join(" \\\n  ");

          const parts = [
            ...header,
            "\n## Scaffold the full design system\n",
            `Run this command in the user's project root. It installs **all ${installNames.length} pieces** (globals.css + ${allComponents.length} components) into \`components/ui/\` with a single shadcn invocation:`,
            "```bash",
            `npx shadcn@latest add \\\n  ${installUrls}`,
            "```",
            "\nAfter the install completes, read files from `components/ui/` directly when writing feature code — do not ask this tool for component source unless the user wants to inspect or customise a specific file.",
            "\n## Included components\n",
            installNames.map((n) => `- \`${n}\``).join("\n"),
          ];

          return { content: [{ type: "text" as const, text: parts.join("\n") }] };
        }

        // Scoped mode — return source code for specific components.
        const componentNames = Array.isArray(component) ? component : [component];
        const components = allComponents.filter((c) => componentNames.includes(c.name));

        const scopedUrls = componentNames
          .map((name) => `${REGISTRY_BASE_URL}/${metadata.id}/${name}.json`)
          .join(" \\\n  ");

        const parts = [
          ...header,
          "\n## Install just these components\n",
          "```bash",
          `npx shadcn@latest add \\\n  ${scopedUrls}`,
          "```",
          "\n---\n",
        ];

        for (const comp of components) {
          const name = comp.name.charAt(0).toUpperCase() + comp.name.slice(1);
          parts.push(`## ${name}`);
          if (comp.description) parts.push(`**Description:** ${comp.description}`);
          parts.push("");
          parts.push("```tsx");
          parts.push(comp.code);
          parts.push("```");
          parts.push("");
        }

        return { content: [{ type: "text" as const, text: parts.join("\n") }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }] };
      }
    },
  );

  // ─── Tool 3: get-ui-principle ───────────────────────────────────────────

  server.registerTool(
    "get-ui-principle",
    {
      title: "Get UI Design Principle",
      description: `Load UI design principles and guidelines into context on-demand.

You MUST call this before writing any UI code. Load principles relevant to the component type you're building.

Available topics:
- "starting" - Starting from scratch, feature-first design
- "hierarchy" - Visual hierarchy, emphasis, action hierarchy
- "spacing" - Layout, spacing systems, white space
- "typography" - Text design, line height, alignment
- "color" - Color usage, HSL, accessibility, shades
- "depth" - Shadows, elevation, layering
- "images" - Working with images, user content
- "polish" - Finishing touches, empty states, borders
- "checklist" - Implementation checklist for AI agents
- "mistakes" - Common mistakes to avoid
- "tokens" - Design tokens reference (spacing, fonts, shadows)

You can either:
1. Request a specific topic: get-ui-principle({ topic: "spacing" })
2. Semantic search: get-ui-principle({ query: "animation easing" })
3. Get index of all principles: get-ui-principle({})

Use maxTokens to keep responses focused (recommended: 5000–10000).`,
      inputSchema: z.object({
        topic: z.enum([
          "starting", "hierarchy", "spacing", "typography", "color",
          "depth", "images", "polish", "checklist", "mistakes",
          "tokens", "leveling", "breaking",
        ]).optional().describe("The specific UI principle topic to load."),
        query: z.string().optional()
          .describe("Natural language search query to find relevant principles."),
        maxTokens: z.number().min(500).max(50000).optional()
          .describe("Maximum tokens to return. Truncates content to fit. Recommended: 5000–10000."),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ topic, query, maxTokens }) => {
      track("get-ui-principle", { topic, query, maxTokens });
      try {
        if (topic) {
          const principle = await provider.getPrincipleByTopic(topic);
          if (!principle) {
            return { content: [{ type: "text" as const, text: `Principle '${topic}' not found.` }] };
          }
          let text = `# ${principle.title}\n\n${principle.content}`;
          if (maxTokens) text = truncateToTokens(text, maxTokens);
          return { content: [{ type: "text" as const, text }] };
        }

        if (query) {
          const results = await provider.searchPrinciples(query, 5);

          if (results.length === 0) {
            return { content: [{ type: "text" as const, text: "No matching guidelines found. Try a different query." }] };
          }

          let formatted = results
            .map((r) =>
              `## ${r.title} (${r.matchScore}% match)\n\n${r.content.substring(0, 1500)}${r.content.length > 1500 ? "\n\n...(truncated)" : ""}`,
            )
            .join("\n\n---\n\n");

          let text = `# Design Guidelines matching "${query}"\n\n${formatted}`;
          if (maxTokens) text = truncateToTokens(text, maxTokens);
          return { content: [{ type: "text" as const, text }] };
        }

        // No topic or query — return index
        const principles = await provider.listPrinciples();

        if (principles.length === 0) {
          return { content: [{ type: "text" as const, text: "No principles found." }] };
        }

        const indexText = principles
          .map((p) => `- **${p.id.replace("principle-", "")}**: ${p.title}`)
          .join("\n");

        return {
          content: [{
            type: "text" as const,
            text: `# Available UI Principles\n\nUse \`get-ui-principle({ topic: "..." })\` to load a specific principle:\n\n${indexText}\n\nOr use \`get-ui-principle({ query: "..." })\` to search by keywords.`,
          }],
        };
      } catch (error) {
        return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }] };
      }
    },
  );

  // ─── Tool 4: resolve-icon-library ───────────────────────────────────────

  server.registerTool(
    "resolve-icon-library",
    {
      title: "Resolve Icon Library",
      description: `Search for icon libraries matching a design style or personality using semantic search.

Use this to find an icon library that matches your design system's personality:
- Style traits (minimal, bold, rounded, sharp, outlined, filled)
- Mood (friendly, professional, playful, serious, warm, elegant)
- Use case (consumer, enterprise, developer, dashboard, mobile)

Examples:
- "minimal clean professional" → Iconoir, Feather Icons
- "friendly rounded warm" → Phosphor, MingCute
- "bold technical enterprise" → Tabler, Carbon`,
      inputSchema: z.object({
        query: z.string().describe("Style description or personality traits to match."),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ query }) => {
      track("resolve-icon-library", { query });
      try {
        const results = await provider.searchIconLibraries(query, 5);

        if (results.length === 0) {
          return { content: [{ type: "text" as const, text: "No icon libraries found matching your query." }] };
        }

        const formatted = results
          .map((r) => {
            const lines = [
              `**ID:** ${r.id}`,
              `**Name:** ${r.name}`,
              `**Prefix:** ${r.prefix}`,
              `**Style:** ${r.tags.join(", ")}`,
            ];
            if (r.variants?.length) {
              lines.push(`**Variants:** ${r.variants.join(", ")}`);
              lines.push(`**Default Variant:** ${r.defaultVariant || r.variants[0]}`);
            }
            lines.push(`**Match Score:** ${r.matchScore}%`);
            return lines.join("\n");
          })
          .join("\n\n----------\n\n");

        return {
          content: [{
            type: "text" as const,
            text: `# Matching Icon Libraries\n\nUse the prefix with Iconify: \`<Icon icon="prefix:icon-name" />\`\n\n---\n\n${formatted}`,
          }],
        };
      } catch (error) {
        return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }] };
      }
    },
  );

  // ─── Tool 5: search-icons ──────────────────────────────────────────────

  server.registerTool(
    "search-icons",
    {
      title: "Search Icons",
      description: `Search for specific icons within an icon library.

Use this after resolve-icon-library to find specific icons by name/concept.

Examples:
- search-icons({ query: "home", libraryId: "phosphor" })
- search-icons({ query: "settings gear", libraryId: "tabler" })

Returns icons formatted for use with Iconify React.`,
      inputSchema: z.object({
        query: z.string().describe("What icon you need (e.g., 'home', 'settings', 'user')"),
        libraryId: z.string().describe("The icon library ID from resolve-icon-library"),
        variant: z.string().optional().describe("Optional variant style (e.g., 'bold', 'outline', 'duotone')."),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ query, libraryId, variant }) => {
      track("search-icons", { query, libraryId, variant });
      try {
        const library = await provider.getIconLibraryById(libraryId);
        if (!library) {
          return { content: [{ type: "text" as const, text: `Icon library '${libraryId}' not found.` }] };
        }

        const icons = await provider.searchIconsInLibrary(query, library, variant, 15);

        if (icons.length === 0) {
          return { content: [{ type: "text" as const, text: `No icons found in ${library.name}.` }] };
        }

        const lines = [
          `# Icons from ${library.name}`,
          "",
          "Use with Iconify React:",
          "```tsx",
          'import { Icon } from "@iconify/react";',
          "```",
          "",
          "Found icons:",
          "",
          ...icons.map((icon) => `- \`<Icon icon="${icon}" />\``),
        ];

        return { content: [{ type: "text" as const, text: lines.join("\n") }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }] };
      }
    },
  );

  // ─── Tool 6: get-review-rules ──────────────────────────────────────────

  server.registerTool(
    "get-review-rules",
    {
      title: "Get Code Review Rules",
      description: `Retrieves accessibility (WCAG 2.1) and visual design review rules for analyzing code.

You MUST call this after writing UI code to self-review your output.

**Accessibility (WCAG 2.1):**
- Critical: Images without alt text, icon buttons without aria-labels, form inputs without labels
- Serious: Focus outline removed, missing keyboard handlers, color-only information

**Visual Design:**
- Layout & Spacing: Inconsistent spacing, overflow issues, z-index conflicts
- Typography: Mixed fonts, line-height issues, missing fallbacks
- Color & Contrast: Contrast below 4.5:1, missing hover/focus states

Use maxTokens to keep responses focused (recommended: 5000–10000).`,
      inputSchema: z.object({
        category: z.enum(["accessibility", "visual-design", "all"]).optional()
          .describe("Filter rules by category (defaults to 'all')"),
        maxTokens: z.number().min(500).max(50000).optional()
          .describe("Maximum tokens to return. Truncates content to fit. Recommended: 5000–10000."),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ category = "all", maxTokens }) => {
      track("get-review-rules", { category, maxTokens });
      try {
        const rules = await provider.getReviewRules(category);

        if (rules.length === 0) {
          return { content: [{ type: "text" as const, text: "No review rules found." }] };
        }

        const rulesOutput = rules
          .map((rule) => `# ${rule.title}\n\n${rule.content}`)
          .join("\n\n---\n\n");

        let text = `# Code Review Rules\n\n${rulesOutput}\n\n---\n\n## Scoring System\n\n- **Critical issues:** -20 points each (max -100)\n- **Serious issues:** -10 points each\n- **Moderate issues:** -5 points each\n\nStart at 100. Minimum score is 0.\n\n90-100: Excellent | 75-89: Good | 60-74: Needs improvement | 0-59: Poor`;

        if (maxTokens) text = truncateToTokens(text, maxTokens);

        return { content: [{ type: "text" as const, text }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }] };
      }
    },
  );
}
