#!/usr/bin/env node

// src/index.ts
import { readFileSync } from "fs";
import { execSync } from "child_process";
import { resolve, extname, basename } from "path";

// src/rules.ts
var REVIEW_RULES = `
## Accessibility (WCAG 2.1)

### Critical Issues (-20 points each)

**Images without alt text**
- Every \`<img>\` must have an \`alt\` attribute
- Decorative images: \`alt=""\`
- Informative images: descriptive alt text
- WCAG: 1.1.1 Non-text Content (Level A)

**Icon-only buttons missing aria-labels**
- Buttons containing only an icon/SVG and no visible text must have \`aria-label\`
- Also applies to icon-only links
- WCAG: 4.1.2 Name, Role, Value (Level A)

**Form inputs without labels**
- Every \`<input>\`, \`<select>\`, \`<textarea>\` needs a visible \`<label>\` or \`aria-label\`
- Placeholder text is NOT a substitute for labels
- WCAG: 1.3.1 Info and Relationships (Level A)

**Missing dialog/modal accessibility**
- Modals must have \`role="dialog"\` and \`aria-modal="true"\`
- Must include \`aria-labelledby\` or \`aria-label\`
- Must trap focus inside when open
- Must close on Escape key
- WCAG: 4.1.2 Name, Role, Value (Level A)

### Serious Issues (-10 points each)

**Focus outline removed without replacement**
- Never use \`outline: none\` or \`outline: 0\` without adding a visible \`focus-visible\` style
- WCAG: 2.4.7 Focus Visible (Level AA)

**Missing keyboard event handlers**
- Interactive elements with \`onClick\` must also handle \`onKeyDown\` (Enter/Space)
- Or use semantic HTML (\`<button>\`, \`<a>\`) which handles this natively
- WCAG: 2.1.1 Keyboard (Level A)

**Touch targets under 44px**
- All interactive elements should be at least 44\xD744px
- Use padding to increase tap target without changing visual size
- WCAG: 2.5.5 Target Size (Level AAA, recommended)

**Color-only information**
- Don't convey information through color alone (e.g., red = error)
- Add icons, text, or patterns alongside color
- WCAG: 1.4.1 Use of Color (Level A)

### Moderate Issues (-5 points each)

**Skipped heading levels**
- Headings must follow sequential order (h1 \u2192 h2 \u2192 h3)
- Don't skip from h1 to h3 or use headings for styling
- WCAG: 1.3.1 Info and Relationships (Level A)

**Positive tabIndex values**
- Never use \`tabIndex\` > 0; it disrupts natural tab order
- Use \`tabIndex={0}\` to make non-interactive elements focusable
- Use \`tabIndex={-1}\` for programmatic focus only

**Incomplete ARIA attributes**
- If using ARIA roles, include all required attributes
- \`role="checkbox"\` needs \`aria-checked\`
- \`role="tab"\` needs \`aria-selected\` and \`aria-controls\`

## Visual Design

### Layout & Spacing (-10 points each)

**Inconsistent spacing values**
- Use consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- Don't mix arbitrary values like \`p-[13px]\` with system values
- Stick to Tailwind's spacing scale or CSS custom properties

**Overflow issues**
- Containers with fixed widths must handle text overflow
- Use \`overflow-hidden\`, \`text-ellipsis\`, or \`overflow-auto\`
- Test with long content and small viewports

**Z-index conflicts**
- Use a defined z-index scale (10, 20, 30, 40, 50)
- Don't use arbitrary large values like \`z-[9999]\`
- Document z-index layers in your design system

### Typography (-5 points each)

**Mixed font families**
- Use at most 2 font families (one for headings, one for body)
- Don't import fonts that aren't used
- Ensure fallback fonts are specified

**Line height issues**
- Body text: line-height 1.5\u20131.75
- Headings: line-height 1.1\u20131.3
- Don't use unitless line-height below 1.2

**Missing font fallbacks**
- Always include system font fallbacks in font-family
- Example: \`font-family: 'Inter', system-ui, -apple-system, sans-serif\`

### Color & Contrast (-10 for critical, -5 for moderate)

**Contrast ratio below 4.5:1**
- Normal text needs 4.5:1 contrast ratio against background
- Large text (18px+ bold, or 24px+) needs 3:1
- Gray text on white: use gray-700+ for body, gray-500+ for secondary
- WCAG: 1.4.3 Contrast Minimum (Level AA)

**Missing hover/focus/active states**
- All interactive elements need visible state changes
- Buttons: hover, focus-visible, active, disabled
- Links: hover, focus-visible, visited
- Inputs: focus, error, disabled

### Components (-5 points each)

**Missing button states**
- Buttons need: default, hover, focus, active, disabled, loading
- Disabled buttons should use \`aria-disabled\` or \`disabled\` attribute
- Loading buttons should show a spinner and disable interaction

**Incomplete form states**
- Inputs need: default, focus, filled, error, disabled
- Error messages should be linked with \`aria-describedby\`
- Required fields should use \`aria-required="true"\`
`;

// src/analyzer.ts
var SYSTEM_PROMPT = `You are an expert code reviewer specializing in accessibility (WCAG 2.1) and visual design quality for React/JSX/TSX components.

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
function buildUserPrompt(files) {
  const fileBlocks = files.map((f) => `--- ${f.path} ---
${f.content}`).join("\n\n");
  return `## Review Rules

${REVIEW_RULES}

## Files to Review

${fileBlocks}`;
}
var VALID_SEVERITIES = /* @__PURE__ */ new Set(["critical", "serious", "moderate"]);
var VALID_CATEGORIES = /* @__PURE__ */ new Set([
  "accessibility",
  "layout",
  "typography",
  "color",
  "components"
]);
function validateFinding(item) {
  if (typeof item.file !== "string" || typeof item.line !== "number" || typeof item.severity !== "string" || typeof item.ruleId !== "string" || typeof item.category !== "string" || typeof item.snippet !== "string" || typeof item.message !== "string" || typeof item.fix !== "string")
    return null;
  if (!VALID_SEVERITIES.has(item.severity)) return null;
  if (!VALID_CATEGORIES.has(item.category)) return null;
  return {
    file: item.file,
    line: item.line,
    endLine: typeof item.endLine === "number" ? item.endLine : void 0,
    severity: item.severity,
    ruleId: item.ruleId,
    category: item.category,
    wcag: typeof item.wcag === "string" ? item.wcag : void 0,
    snippet: item.snippet,
    message: item.message,
    fix: item.fix
  };
}
async function analyzeFiles(files, apiKey) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      temperature: 0.1,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(files) }
      ],
      response_format: { type: "json_object" }
    })
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${body}`);
  }
  const data = await res.json();
  const raw = data.choices[0]?.message?.content;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : Array.isArray(parsed.findings) ? parsed.findings : [];
    return arr.map((item) => validateFinding(item)).filter((f) => f !== null);
  } catch {
    console.error("Failed to parse review response:", raw.slice(0, 200));
    return [];
  }
}

// src/types.ts
var SEVERITY_POINTS = {
  critical: 20,
  serious: 10,
  moderate: 5
};
function calculateScore(findings) {
  const deductions = findings.reduce(
    (sum, f) => sum + SEVERITY_POINTS[f.severity],
    0
  );
  return Math.max(0, 100 - deductions);
}
function formatFindingsText(findings) {
  if (findings.length === 0) return "No issues found.";
  const grouped = /* @__PURE__ */ new Map();
  for (const f of findings) {
    const list = grouped.get(f.file) ?? [];
    list.push(f);
    grouped.set(f.file, list);
  }
  const lines = [];
  for (const [file, fileFindings] of grouped) {
    lines.push(`
${file}`);
    for (const f of fileFindings) {
      const wcag = f.wcag ? ` [${f.wcag}]` : "";
      lines.push(
        `  line ${f.line}: [${f.severity}] ${f.message}${wcag}`
      );
      lines.push(`    \u2192 ${f.fix}`);
    }
  }
  return lines.join("\n");
}
function buildSummary(findings, filesReviewed) {
  if (findings.length === 0) return "No issues found. Code looks good!";
  const counts = { critical: 0, serious: 0, moderate: 0 };
  for (const f of findings) counts[f.severity]++;
  const parts = [];
  if (counts.critical > 0) parts.push(`${counts.critical} critical`);
  if (counts.serious > 0) parts.push(`${counts.serious} serious`);
  if (counts.moderate > 0) parts.push(`${counts.moderate} moderate`);
  const score = calculateScore(findings);
  return `Found ${parts.join(", ")} issue${findings.length !== 1 ? "s" : ""} across ${filesReviewed} file${filesReviewed !== 1 ? "s" : ""}. Score: ${score}/100.`;
}

// src/index.ts
var UI_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx", ".vue", ".svelte", ".html"]);
function isUIFile(path) {
  return UI_EXTENSIONS.has(extname(path));
}
function getGitChangedFiles() {
  try {
    const unstaged = execSync("git diff --name-only HEAD", {
      encoding: "utf-8"
    }).trim();
    const staged = execSync("git diff --name-only --cached", {
      encoding: "utf-8"
    }).trim();
    const untracked = execSync(
      "git ls-files --others --exclude-standard",
      { encoding: "utf-8" }
    ).trim();
    const all = /* @__PURE__ */ new Set();
    for (const line of [
      ...unstaged.split("\n"),
      ...staged.split("\n"),
      ...untracked.split("\n")
    ]) {
      const trimmed = line.trim();
      if (trimmed) all.add(resolve(trimmed));
    }
    return [...all].filter(isUIFile);
  } catch {
    console.error("Failed to get git diff. Are you in a git repository?");
    return [];
  }
}
function readFiles(paths) {
  const files = [];
  for (const p of paths) {
    try {
      const content = readFileSync(p, "utf-8");
      files.push({ path: basename(p), content });
    } catch {
      console.error(`Warning: Could not read ${p}, skipping`);
    }
  }
  return files;
}
function filterBySeverity(findings, severity) {
  if (severity === "critical") {
    return findings.filter((f) => f.severity === "critical");
  }
  if (severity === "critical+serious") {
    return findings.filter(
      (f) => f.severity === "critical" || f.severity === "serious"
    );
  }
  return findings;
}
function printUsage() {
  console.log(`
better-design review \u2014 accessibility & design reviewer for AI-generated code

Usage:
  better-design-review [options] [files...]    Review files for issues
  better-design-review --diff                  Review git-changed files

Options:
  --diff              Review files changed in git (staged + unstaged + untracked)
  --json              Output findings as JSON
  --severity <level>  Filter: all | critical | critical+serious (default: all)
  --help              Show this help

Environment:
  OPENAI_API_KEY      Required. Your OpenAI API key.

Examples:
  better-design-review src/components/Button.tsx
  better-design-review --diff --severity critical+serious
  better-design-review --diff --json
`);
}
function parseArgs(argv) {
  const opts = {
    files: [],
    diff: false,
    json: false,
    severity: "all",
    apiKey: process.env.OPENAI_API_KEY ?? ""
  };
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case "--help":
      case "-h":
        printUsage();
        process.exit(0);
      case "--diff":
        opts.diff = true;
        break;
      case "--json":
        opts.json = true;
        break;
      case "--severity":
        i++;
        opts.severity = argv[i] ?? "all";
        break;
      default:
        if (!arg.startsWith("-")) {
          opts.files.push(resolve(arg));
        }
        break;
    }
    i++;
  }
  return opts;
}
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }
  const opts = parseArgs(args);
  if (!opts.apiKey) {
    console.error("Error: OPENAI_API_KEY environment variable is required.");
    process.exit(1);
  }
  let filePaths;
  if (opts.diff) {
    filePaths = getGitChangedFiles();
    if (filePaths.length === 0) {
      console.log("No changed UI files found.");
      process.exit(0);
    }
  } else if (opts.files.length > 0) {
    filePaths = opts.files.filter(isUIFile);
    if (filePaths.length === 0) {
      console.error(
        "No UI files in the provided paths. Supported: " + [...UI_EXTENSIONS].join(", ")
      );
      process.exit(1);
    }
  } else {
    console.error("Provide file paths or use --diff to review git changes.");
    process.exit(1);
  }
  if (filePaths.length > 20) {
    console.error("Maximum 20 files per review. Got " + filePaths.length);
    process.exit(1);
  }
  console.error(`Reviewing ${filePaths.length} file(s)...`);
  const files = readFiles(filePaths);
  if (files.length === 0) {
    console.error("No files could be read.");
    process.exit(1);
  }
  let findings = await analyzeFiles(files, opts.apiKey);
  findings = filterBySeverity(findings, opts.severity);
  const score = calculateScore(findings);
  const summary = buildSummary(findings, files.length);
  if (opts.json) {
    console.log(
      JSON.stringify(
        { findings, score, summary, filesReviewed: files.length },
        null,
        2
      )
    );
  } else {
    console.log(`
${summary}
`);
    if (findings.length > 0) {
      console.log(formatFindingsText(findings));
    }
  }
  const hasCritical = findings.some((f) => f.severity === "critical");
  process.exit(hasCritical ? 2 : 0);
}
main().catch((err) => {
  console.error("Fatal error:", err.message ?? err);
  process.exit(1);
});
