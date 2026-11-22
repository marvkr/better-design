"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// DiffTable: a proposed change to an API parameter table. The edit plays
// once (removed rows tint red, an added row expands in) and rests on the
// finished diff.
//
// Usage:
//   <DiffTable />
//   <DiffTable title="Proposed change" columns={...} rows={...} added={...} />

function useStage(steps: number[]) {
  const [stage, setStage] = React.useState(0)
  React.useEffect(() => {
    if (stage >= steps.length) return
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage])
    return () => clearTimeout(t)
  }, [stage, steps])
  return stage
}

interface DiffRow {
  cells: [string, string, string]
  removed?: boolean
}

const DEFAULT_ROWS: DiffRow[] = [
  { cells: ["page_size", "integer", "Results per page"], removed: true },
  { cells: ["offset", "integer", "Rows to skip"], removed: true },
  { cells: ["expand", "string[]", "Related objects"], removed: false },
]

const DEFAULT_ADDED: [string, string, string] = ["cursor", "string", "Next page token"]

const STAGES = [800, 1000, 1000]

const cellPad = "px-3 py-2"

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  columns?: [string, string, string]
  rows?: DiffRow[]
  added?: [string, string, string]
}

function DiffTable({
  title = "Proposed change to list endpoints",
  columns = ["Parameter", "Type", "Description"],
  rows = DEFAULT_ROWS,
  added = DEFAULT_ADDED,
  className,
  ...props
}: DiffTableProps) {
  const stage = useStage(STAGES)
  const tinted = stage >= 2
  const showAdded = stage >= 3

  return (
    <div className={cn("w-full max-w-[23.75rem]", className)} {...props}>
      <div className="relative overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-2">
          <span className="text-xs font-medium text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[26%]" />
            <col className="w-[40%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              {columns.map((h, i) => (
                <th key={i} className={cn(cellPad, "text-xs font-medium text-muted-foreground")}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const out = Boolean(row.removed) && tinted
              return (
                <tr
                  key={row.cells[0]}
                  className={cn(
                    "border-b border-border transition-colors duration-slow last:border-0",
                    out && "bg-(--destructive-tint)",
                  )}
                >
                  <td
                    className={cn(
                      cellPad,
                      "font-mono text-xs font-medium transition-colors duration-slow",
                      out ? "text-(--destructive-text) line-through" : "text-foreground",
                    )}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <span
                      className={cn(
                        "inline-flex h-5 items-center rounded-sm bg-secondary px-1.5 font-mono text-[0.6875rem] text-muted-foreground transition-opacity duration-slow",
                        out && "opacity-60",
                      )}
                    >
                      {row.cells[1]}
                    </span>
                  </td>
                  <td
                    className={cn(
                      cellPad,
                      "truncate text-xs transition-colors duration-slow",
                      out ? "text-(--destructive-text)" : "text-muted-foreground",
                    )}
                  >
                    {row.cells[2]}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td colSpan={3} className="p-0">
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-slow ease-out"
                  style={{
                    gridTemplateRows: showAdded ? "1fr" : "0fr",
                    opacity: showAdded ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden bg-(--success-tint)">
                    <div className="grid grid-cols-[34%_26%_40%] items-center border-t border-border">
                      <span className={cn(cellPad, "font-mono text-xs font-medium text-(--success-text)")}>
                        {added[0]}
                      </span>
                      <span className={cellPad}>
                        <span className="inline-flex h-5 items-center rounded-sm bg-background px-1.5 font-mono text-[0.6875rem] text-(--success-text)">
                          {added[1]}
                        </span>
                      </span>
                      <span className={cn(cellPad, "truncate text-xs text-(--success-text)")}>{added[2]}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { DiffTable }
export type { DiffRow }
