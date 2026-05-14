// GitHub Action entrypoint for Better Design Review
// Reviews PR diffs for accessibility + visual design issues using GPT-5.4-mini

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// ── Review rules (embedded) ─────────────────────────────────────────────────

const REVIEW_RULES = `
## Accessibility (WCAG 2.1)

### Critical Issues
- Images without alt text — WCAG 1.1.1 Non-text Content (Level A)
- Icon-only buttons missing aria-labels — WCAG 4.1.2 Name, Role, Value (Level A)
- Form inputs without labels — WCAG 1.3.1 Info and Relationships (Level A)
- Missing dialog/modal accessibility (role, aria-modal, focus trap, escape) — WCAG 4.1.2

### Serious Issues
- Focus outline removed without replacement — WCAG 2.4.7 Focus Visible (Level AA)
- Missing keyboard event handlers on interactive elements — WCAG 2.1.1 Keyboard (Level A)
- Touch targets under 44px — WCAG 2.5.5 Target Size (Level AAA)
- Color-only information — WCAG 1.4.1 Use of Color (Level A)

### Moderate Issues
- Skipped heading levels — WCAG 1.3.1
- Positive tabIndex values
- Incomplete ARIA attributes

## Visual Design

### Serious Issues
- Contrast ratio below 4.5:1 — WCAG 1.4.3 Contrast Minimum (Level AA)
- Inconsistent spacing values (mixing arbitrary px with design tokens)
- Missing hover/focus/active states on interactive elements

### Moderate Issues
- Mixed font families beyond 2
- Line height issues (body < 1.5, headings < 1.1)
- Z-index conflicts (arbitrary large values)
- Missing button states (hover, focus, active, disabled, loading)
- Incomplete form states (focus, error, disabled)
`;

const SYSTEM_PROMPT = `You are an expert code reviewer for accessibility (WCAG 2.1) and visual design quality.

For each issue found, return a JSON object with:
- file: the file path exactly as given
- line: 1-based line number
- endLine: (optional) end line
- severity: "critical" | "serious" | "moderate"
- ruleId: kebab-case identifier
- category: "accessibility" | "layout" | "typography" | "color" | "components"
- wcag: (optional) WCAG criterion
- snippet: offending code (1-3 lines verbatim)
- message: one-sentence problem description
- fix: concrete fix suggestion

Only report real issues. Return ONLY a JSON array. No markdown, no explanation.`;

// ── Helpers ──────────────────────────────────────────────────────────────────

const UI_EXTENSIONS = new Set([".tsx", ".jsx", ".vue", ".svelte", ".html"]);

function isUIFile(filePath) {
  return UI_EXTENSIONS.has(path.extname(filePath));
}

function getInput(name, required = false) {
  const envKey = `INPUT_${name.toUpperCase().replace(/-/g, "_")}`;
  const val = process.env[envKey] ?? "";
  if (required && !val) {
    console.error(`::error::Missing required input: ${name}`);
    process.exit(1);
  }
  return val;
}

// ── Get changed files from PR ────────────────────────────────────────────────

async function getChangedFiles() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) return [];

  const event = JSON.parse(fs.readFileSync(eventPath, "utf-8"));
  const base = event.pull_request?.base?.sha;
  if (!base) {
    console.log("Not a pull request event, skipping.");
    return [];
  }

  if (!/^[0-9a-f]{40}$/i.test(base)) {
    console.error(`::error::Invalid base SHA format: ${base}`);
    return [];
  }

  try {
    execFileSync("git", ["fetch", "origin", base, "--depth=1"], { stdio: "pipe" });
  } catch {
    // may already be fetched
  }

  const diff = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], {
    encoding: "utf-8",
  });

  return diff
    .trim()
    .split("\n")
    .filter((f) => f && isUIFile(f));
}

function readFiles(paths) {
  return paths
    .map((p) => {
      try {
        return { path: p, content: fs.readFileSync(p, "utf-8") };
      } catch {
        console.log(`::warning::Could not read ${p}, skipping`);
        return null;
      }
    })
    .filter(Boolean);
}

// ── Call OpenAI ──────────────────────────────────────────────────────────────

async function analyzeWithOpenAI(apiKey, files, severityFilter) {
  const fileBlocks = files
    .map((f) => `--- ${f.path} ---\n${f.content}`)
    .join("\n\n");

  const userPrompt = `## Review Rules\n\n${REVIEW_RULES}\n\n## Files to Review\n\n${fileBlocks}`;

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
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${body}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    let arr = Array.isArray(parsed) ? parsed : parsed.findings ?? [];

    if (severityFilter === "critical") {
      arr = arr.filter((f) => f.severity === "critical");
    } else if (severityFilter === "critical+serious") {
      arr = arr.filter(
        (f) => f.severity === "critical" || f.severity === "serious",
      );
    }

    return arr;
  } catch {
    console.error("::warning::Failed to parse OpenAI response");
    return [];
  }
}

// ── Score ────────────────────────────────────────────────────────────────────

function calculateScore(findings) {
  const points = { critical: 20, serious: 10, moderate: 5 };
  const total = findings.reduce((s, f) => s + (points[f.severity] || 0), 0);
  return Math.max(0, 100 - total);
}

// ── Build PR review body + inline comments ───────────────────────────────────

function buildReviewBody(findings, score, filesReviewed) {
  if (findings.length === 0) {
    return `### ✅ Better Design Review\n\nNo accessibility or design issues found across ${filesReviewed} file(s). Score: **${score}/100**`;
  }

  const counts = { critical: 0, serious: 0, moderate: 0 };
  for (const f of findings) counts[f.severity] = (counts[f.severity] || 0) + 1;

  const parts = [];
  if (counts.critical) parts.push(`🔴 ${counts.critical} critical`);
  if (counts.serious) parts.push(`🟡 ${counts.serious} serious`);
  if (counts.moderate) parts.push(`🔵 ${counts.moderate} moderate`);

  const lines = [
    `### Better Design Review\n`,
    `**Score:** ${score}/100 — ${parts.join(", ")}\n`,
    `Reviewed ${filesReviewed} UI file(s).\n`,
  ];

  const grouped = {};
  for (const f of findings) {
    if (!grouped[f.file]) grouped[f.file] = [];
    grouped[f.file].push(f);
  }

  for (const [file, fileFindings] of Object.entries(grouped)) {
    lines.push(`\n#### \`${file}\`\n`);
    for (const f of fileFindings) {
      const icon =
        f.severity === "critical"
          ? "🔴"
          : f.severity === "serious"
            ? "🟡"
            : "🔵";
      const wcag = f.wcag ? ` — ${f.wcag}` : "";
      lines.push(
        `${icon} **Line ${f.line}** [${f.severity}] ${f.message}${wcag}`,
      );
      lines.push(`\`\`\`\n${f.snippet}\n\`\`\``);
      lines.push(`→ ${f.fix}\n`);
    }
  }

  return lines.join("\n");
}

function buildInlineComments(findings) {
  return findings
    .map((f) => {
      const icon =
        f.severity === "critical"
          ? "🔴"
          : f.severity === "serious"
            ? "🟡"
            : "🔵";
      const wcag = f.wcag ? `\n\n**${f.wcag}**` : "";
      return {
        path: f.file,
        line: f.line,
        body: `${icon} **[${f.severity}]** ${f.message}\n\n\`\`\`suggestion\n${f.fix}\n\`\`\`${wcag}`,
      };
    })
    .slice(0, 50);
}

// ── Post review to GitHub PR ─────────────────────────────────────────────────

async function postReview(findings, score, filesReviewed) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  const eventPath = process.env.GITHUB_EVENT_PATH;

  if (!token || !repo || !eventPath) {
    console.log(buildReviewBody(findings, score, filesReviewed));
    return;
  }

  const event = JSON.parse(fs.readFileSync(eventPath, "utf-8"));
  const prNumber = event.pull_request?.number;
  if (!prNumber) {
    console.log(buildReviewBody(findings, score, filesReviewed));
    return;
  }

  const commitSha = execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf-8",
  }).trim();

  const hasCritical = findings.some((f) => f.severity === "critical");
  const reviewEvent =
    findings.length === 0
      ? "APPROVE"
      : hasCritical
        ? "REQUEST_CHANGES"
        : "COMMENT";

  const body = {
    commit_id: commitSha,
    body: buildReviewBody(findings, score, filesReviewed),
    event: reviewEvent,
    comments: buildInlineComments(findings),
  };

  const res = await fetch(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}/reviews`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const errBody = await res.text();
    console.error(
      `::warning::Failed to post PR review (${res.status}): ${errBody}`,
    );
    console.log(buildReviewBody(findings, score, filesReviewed));
  } else {
    console.log(
      `Posted review on PR #${prNumber}: ${findings.length} finding(s), score ${score}/100`,
    );
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = getInput("openai-api-key", true);
  const severity = getInput("severity") || "all";
  const failOn = getInput("fail-on") || "critical";

  const MAX_FILES = 20;
  const changedFiles = await getChangedFiles();
  if (changedFiles.length === 0) {
    console.log("No UI files changed in this PR.");
    return;
  }

  const filesToReview = changedFiles.slice(0, MAX_FILES);
  if (changedFiles.length > MAX_FILES) {
    console.log(
      `::warning::Found ${changedFiles.length} changed UI files; reviewing first ${MAX_FILES}.`,
    );
  }
  console.log(`Reviewing ${filesToReview.length} UI file(s)...`);

  const files = readFiles(filesToReview);
  if (files.length === 0) {
    console.log("No files could be read.");
    return;
  }

  const findings = await analyzeWithOpenAI(apiKey, files, severity);
  const score = calculateScore(findings);

  await postReview(findings, score, files.length);

  const hasCritical = findings.some((f) => f.severity === "critical");
  const hasSerious = findings.some((f) => f.severity === "serious");

  if (failOn === "critical" && hasCritical) {
    console.error(
      `::error::Review found critical issues. Score: ${score}/100`,
    );
    process.exit(1);
  }
  if (failOn === "serious" && (hasCritical || hasSerious)) {
    console.error(
      `::error::Review found serious+ issues. Score: ${score}/100`,
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`::error::${err.message}`);
  process.exit(1);
});
