import {
  type ReviewFinding,
  type ReviewCategory,
  type ReviewSeverity,
} from "./types.js";
import { REVIEW_RULES } from "./rules.js";

const SYSTEM_PROMPT = `You are an expert code reviewer specializing in accessibility (WCAG 2.1) and visual design quality for React/JSX/TSX components.

You will be given:
1. Review rules with severity levels and WCAG references
2. Source files to review

For each issue you find, return a JSON object with these fields:
- file: the file path exactly as given
- line: the 1-based line number where the issue starts
- endLine: (optional) end line if the issue spans multiple lines
- severity: "critical" | "serious" | "moderate"
- ruleId: a kebab-case identifier (e.g. "icon-button-missing-aria-label")
- category: "accessibility" | "layout" | "typography" | "color" | "components"
- wcag: (optional) the WCAG success criterion (e.g. "1.1.1 Non-text Content (Level A)")
- snippet: the offending code (1-3 lines max, verbatim from the file)
- message: one-sentence description of the problem
- fix: a concrete fix suggestion (show the corrected code when possible)

Rules:
- Only report issues you can actually see in the code. Never guess or invent problems.
- Use the correct line numbers by counting lines in the provided source.
- Return an empty array if the code is clean.
- Respond with ONLY a JSON array of findings. No markdown fences, no explanation, no preamble.`;

function buildUserPrompt(
  files: { path: string; content: string }[],
): string {
  const fileBlocks = files
    .map((f) => `--- ${f.path} ---\n${f.content}`)
    .join("\n\n");

  return `## Review Rules\n\n${REVIEW_RULES}\n\n## Files to Review\n\n${fileBlocks}`;
}

const VALID_SEVERITIES = new Set(["critical", "serious", "moderate"]);
const VALID_CATEGORIES = new Set([
  "accessibility",
  "layout",
  "typography",
  "color",
  "components",
]);

function validateFinding(item: Record<string, unknown>): ReviewFinding | null {
  if (
    typeof item.file !== "string" ||
    typeof item.line !== "number" ||
    typeof item.severity !== "string" ||
    typeof item.ruleId !== "string" ||
    typeof item.category !== "string" ||
    typeof item.snippet !== "string" ||
    typeof item.message !== "string" ||
    typeof item.fix !== "string"
  )
    return null;

  if (!VALID_SEVERITIES.has(item.severity)) return null;
  if (!VALID_CATEGORIES.has(item.category)) return null;

  return {
    file: item.file,
    line: item.line,
    endLine: typeof item.endLine === "number" ? item.endLine : undefined,
    severity: item.severity as ReviewSeverity,
    ruleId: item.ruleId,
    category: item.category as ReviewCategory,
    wcag: typeof item.wcag === "string" ? item.wcag : undefined,
    snippet: item.snippet,
    message: item.message,
    fix: item.fix,
  };
}

export async function analyzeFiles(
  files: { path: string; content: string }[],
  apiKey: string,
): Promise<ReviewFinding[]> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      temperature: 0.1,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(files) },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };

  const raw = data.choices[0]?.message?.content;
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    const arr: unknown[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.findings)
        ? parsed.findings
        : [];
    return arr
      .map((item) => validateFinding(item as Record<string, unknown>))
      .filter((f): f is ReviewFinding => f !== null);
  } catch {
    console.error("Failed to parse review response:", raw.slice(0, 200));
    return [];
  }
}
