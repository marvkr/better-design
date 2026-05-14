#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, extname } from "node:path";
import { analyzeFiles } from "./analyzer.js";
import {
  calculateScore,
  formatFindingsText,
  buildSummary,
  type ReviewFinding,
} from "./types.js";

interface ReviewOptions {
  files: string[];
  diff: boolean;
  json: boolean;
  severity: "all" | "critical" | "critical+serious";
  apiKey: string;
}

const UI_EXTENSIONS = new Set([".tsx", ".jsx", ".vue", ".svelte", ".html"]);

function isUIFile(path: string): boolean {
  return UI_EXTENSIONS.has(extname(path));
}

function getGitChangedFiles(): string[] {
  try {
    const unstaged = execSync("git diff --name-only HEAD", {
      encoding: "utf-8",
    }).trim();
    const staged = execSync("git diff --name-only --cached", {
      encoding: "utf-8",
    }).trim();
    const untracked = execSync(
      "git ls-files --others --exclude-standard",
      { encoding: "utf-8" },
    ).trim();

    const all = new Set<string>();
    for (const line of [
      ...unstaged.split("\n"),
      ...staged.split("\n"),
      ...untracked.split("\n"),
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

function readFiles(paths: string[]): { path: string; content: string }[] {
  const files: { path: string; content: string }[] = [];
  for (const p of paths) {
    try {
      const content = readFileSync(p, "utf-8");
      files.push({ path: p, content });
    } catch {
      console.error(`Warning: Could not read ${p}, skipping`);
    }
  }
  return files;
}

function filterBySeverity(
  findings: ReviewFinding[],
  severity: string,
): ReviewFinding[] {
  if (severity === "critical") {
    return findings.filter((f) => f.severity === "critical");
  }
  if (severity === "critical+serious") {
    return findings.filter(
      (f) => f.severity === "critical" || f.severity === "serious",
    );
  }
  return findings;
}

function printUsage() {
  console.log(`
better-design review — accessibility & design reviewer for AI-generated code

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

function parseArgs(argv: string[]): ReviewOptions {
  const opts: ReviewOptions = {
    files: [],
    diff: false,
    json: false,
    severity: "all",
    apiKey: process.env.OPENAI_API_KEY ?? "",
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
        opts.severity = (argv[i] ?? "all") as ReviewOptions["severity"];
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

  let filePaths: string[];
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
        "No UI files in the provided paths. Supported: " +
          [...UI_EXTENSIONS].join(", "),
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
        2,
      ),
    );
  } else {
    console.log(`\n${summary}\n`);
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
