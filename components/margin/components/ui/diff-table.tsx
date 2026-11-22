"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Advances a stage counter once per delay in `steps`, then stops. */
function useStage(steps: number[]) {
  const [stage, setStage] = React.useState(0);
  React.useEffect(() => {
    if (stage >= steps.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage]);
    return () => clearTimeout(t);
  }, [stage, steps]);
  return stage;
}

/** One row of the parameter table; `removed` marks a row the change drops. */
interface DiffRow {
  cells: [string, string, string];
  removed?: boolean;
}

const DEFAULT_ROWS: DiffRow[] = [
  { cells: ["sort_by", "string", "Field to order notes by"], removed: true },
  { cells: ["page", "integer", "Page number to return"], removed: true },
  { cells: ["tags", "string[]", "Only notes with these tags"], removed: false },
];

const DEFAULT_ADDED: [string, string, string] = ["after", "string", "Cursor from the last page"];

const STAGES = [800, 1000, 1000];

const cellPad = "px-3 py-2";
const typeChip = "inline-flex h-5 items-center rounded-sm bg-(--field) px-1.5 font-mono text-xs";

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  columns?: [string, string, string];
  rows?: DiffRow[];
  added?: [string, string, string];
}

/**
 * Margin DiffTable: a proposed change to a parameter table on a white sheet.
 * Removed rows tint red and strike through, then the new row opens in a
 * green tint; type names sit in small paper field chips.
 */
function DiffTable({
  title = "Proposed change to the notes endpoint",
  columns = ["Parameter", "Type", "Description"],
  rows = DEFAULT_ROWS,
  added = DEFAULT_ADDED,
  className,
  ...props
}: DiffTableProps) {
  const stage = useStage(STAGES);
  const tinted = stage >= 2;
  const showAdded = stage >= 3;

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
        <div className="flex h-10 items-center border-b border-border px-3">
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-1/3" />
            <col className="w-1/4" />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b border-border bg-muted">
              {columns.map((h, i) => (
                <th key={i} className={cn(cellPad, "text-xs font-medium text-muted-foreground")}>
                  {h}
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
                    "border-b border-border transition-colors duration-slow last:border-0",
                    out && "bg-destructive/8",
                  )}
                >
                  <td
                    className={cn(
                      cellPad,
                      "font-mono text-xs transition-colors duration-slow",
                      out ? "text-destructive-text line-through decoration-destructive/50" : "text-foreground",
                    )}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <span className={cn(typeChip, "text-muted-foreground", out && "opacity-60")}>
                      {row.cells[1]}
                    </span>
                  </td>
                  <td
                    className={cn(
                      cellPad,
                      "truncate text-xs transition-colors duration-slow",
                      out ? "text-destructive-text" : "text-muted-foreground",
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
                    "grid transition-all duration-slow ease-(--ease-out)",
                    showAdded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden bg-success/8">
                    <div className="grid grid-cols-[1fr_0.75fr_1.25fr] items-center border-t border-border">
                      <span className={cn(cellPad, "font-mono text-xs text-success-text")}>{added[0]}</span>
                      <span className={cellPad}>
                        <span className={cn(typeChip, "bg-success/12 text-success-text")}>{added[1]}</span>
                      </span>
                      <span className={cn(cellPad, "truncate text-xs text-success-text")}>{added[2]}</span>
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
