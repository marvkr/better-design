export type ReviewSeverity = "critical" | "serious" | "moderate";

export type ReviewCategory =
  | "accessibility"
  | "layout"
  | "typography"
  | "color"
  | "components";

export interface ReviewFinding {
  file: string;
  line: number;
  endLine?: number;
  severity: ReviewSeverity;
  ruleId: string;
  category: ReviewCategory;
  wcag?: string;
  snippet: string;
  message: string;
  fix: string;
}

export interface ReviewResponse {
  findings: ReviewFinding[];
  score: number;
  summary: string;
  filesReviewed: number;
}

const SEVERITY_POINTS: Record<ReviewSeverity, number> = {
  critical: 20,
  serious: 10,
  moderate: 5,
};

export function calculateScore(findings: ReviewFinding[]): number {
  const deductions = findings.reduce(
    (sum, f) => sum + SEVERITY_POINTS[f.severity],
    0,
  );
  return Math.max(0, 100 - deductions);
}

export function formatFindingsText(findings: ReviewFinding[]): string {
  if (findings.length === 0) return "No issues found.";

  const grouped = new Map<string, ReviewFinding[]>();
  for (const f of findings) {
    const list = grouped.get(f.file) ?? [];
    list.push(f);
    grouped.set(f.file, list);
  }

  const lines: string[] = [];
  for (const [file, fileFindings] of grouped) {
    lines.push(`\n${file}`);
    for (const f of fileFindings) {
      const wcag = f.wcag ? ` [${f.wcag}]` : "";
      lines.push(
        `  line ${f.line}: [${f.severity}] ${f.message}${wcag}`,
      );
      lines.push(`    → ${f.fix}`);
    }
  }
  return lines.join("\n");
}

export function buildSummary(
  findings: ReviewFinding[],
  filesReviewed: number,
): string {
  if (findings.length === 0) return "No issues found. Code looks good!";

  const counts = { critical: 0, serious: 0, moderate: 0 };
  for (const f of findings) counts[f.severity]++;

  const parts: string[] = [];
  if (counts.critical > 0) parts.push(`${counts.critical} critical`);
  if (counts.serious > 0) parts.push(`${counts.serious} serious`);
  if (counts.moderate > 0) parts.push(`${counts.moderate} moderate`);

  const score = calculateScore(findings);
  return `Found ${parts.join(", ")} issue${findings.length !== 1 ? "s" : ""} across ${filesReviewed} file${filesReviewed !== 1 ? "s" : ""}. Score: ${score}/100.`;
}
