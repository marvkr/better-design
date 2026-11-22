"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// DiffTable: AI-proposed edits sweeping through tabular data. The proposed
// edit plays once (rows tint as removals, an added row opens in) and rests
// on the completed diff.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <DiffTable />
//   <DiffTable title="Proposed cleanup" columns={...} rows={...} added={...} />

/** Advances a stage counter once per entry in `steps`, each entry a wait in ms. */
function useStage(steps: number[]) {
  const [stage, setStage] = React.useState(0);
  React.useEffect(() => {
    if (stage >= steps.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage]);
    return () => clearTimeout(t);
  }, [stage, steps]);
  return stage;
}

interface DiffRow {
  cells: [string, string, string];
  removed?: boolean;
}

const DEFAULT_ROWS: DiffRow[] = [
  { cells: ["Rocky Road", "Classic", "aurora-scoops"], removed: true },
  { cells: ["Bubblegum", "Retro", "kumo-creamery"], removed: true },
  { cells: ["Mint Chip", "Classic", "maple-orbit"], removed: false },
];

const DEFAULT_ADDED: [string, string, string] = ["Pistachio", "Seasonal", "maple-orbit"];

const STAGES = [800, 1000, 1000];

/** One dot colour per category; anything else falls back to muted ink. */
function dotFor(category: string): string {
  if (category === "Classic") return "bg-(--clay)";
  if (category === "Seasonal") return "bg-(--success)";
  return "bg-muted-foreground";
}

const cellPad = "px-4 py-2.5";

/** The oat category pill with its coloured dot. */
const categoryPill =
  "inline-flex h-6 items-center gap-1.5 rounded-full bg-secondary px-2.5 text-xs text-(--foreground-secondary)";

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  columns?: [string, string, string];
  rows?: DiffRow[];
  added?: [string, string, string];
}

/**
 * Cream editorial DiffTable: an assistant's proposed edit, read as a marked
 * up page. The table sits on an oat card with hairline rules. Rows marked
 * for removal take the pale red tint and a red strike; the added row opens
 * underneath on the pale green tint. Every change is a colour wash, never
 * a moving block.
 */
function DiffTable({
  title = "Proposed menu cleanup",
  columns = ["Flavor", "Category", "Supplier"],
  rows = DEFAULT_ROWS,
  added = DEFAULT_ADDED,
  className,
  ...props
}: DiffTableProps) {
  const stage = useStage(STAGES);
  const tinted = stage >= 2;
  const showAdded = stage >= 3;

  return (
    <div data-slot="diff-table" className={cn("w-full max-w-[23.75rem]", className)} {...props}>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-start">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[30%]" />
            <col className="w-[36%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              {columns.map((heading) => (
                <th key={heading} className={cn(cellPad, "text-start text-xs font-medium text-muted-foreground")}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const out = Boolean(row.removed) && tinted;
              return (
                <tr
                  key={row.cells[0]}
                  className={cn(
                    "border-b border-border transition-colors duration-slow ease-out last:border-0",
                    out ? "bg-(--destructive-tint)" : "hover:bg-secondary/60",
                  )}
                >
                  <td
                    className={cn(
                      cellPad,
                      "text-[0.8125rem] font-medium transition-colors duration-slow",
                      out ? "text-(--destructive-text) line-through decoration-(--destructive-text)/50" : "text-foreground",
                    )}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <span
                      className={cn(
                        categoryPill,
                        "transition-opacity duration-slow",
                        out ? "opacity-55" : "opacity-100",
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", dotFor(row.cells[1]))} />
                      {row.cells[1]}
                    </span>
                  </td>
                  <td
                    className={cn(
                      cellPad,
                      "truncate font-mono text-xs transition-colors duration-slow",
                      out ? "text-(--destructive-text) line-through decoration-(--destructive-text)/50" : "text-muted-foreground",
                    )}
                  >
                    {row.cells[2]}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={3} className="p-0">
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
                    showAdded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden bg-(--success-tint)">
                    <div className="grid grid-cols-[34%_30%_36%] items-center border-t border-border">
                      <span className={cn(cellPad, "text-[0.8125rem] font-medium text-(--success-text)")}>
                        {added[0]}
                      </span>
                      <span className={cellPad}>
                        <span className={cn(categoryPill, "bg-background")}>
                          <span className={cn("size-1.5 rounded-full", dotFor(added[1]))} />
                          {added[1]}
                        </span>
                      </span>
                      <span className={cn(cellPad, "truncate font-mono text-xs text-(--success-text)")}>
                        {added[2]}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { DiffTable };
export type { DiffRow };
