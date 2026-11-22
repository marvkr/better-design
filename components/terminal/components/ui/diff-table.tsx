"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// DiffTable: AI-proposed edits sweeping through tabular data. The proposed
// edit plays once (rows tint as removals, an added row expands in) and rests
// on the completed diff.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <DiffTable />
//   <DiffTable title="Proposed cleanup" columns={...} rows={...} added={...} />

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
  { cells: ["Rocky Road", "Classic", "aurora-scoops"], removed: true },
  { cells: ["Bubblegum", "Retro", "kumo-creamery"], removed: true },
  { cells: ["Mint Chip", "Classic", "maple-orbit"], removed: false },
]

const DEFAULT_ADDED: [string, string, string] = ["Pistachio", "Seasonal", "maple-orbit"]

const DOT: Record<string, string> = {
  Classic: "bg-primary",
  Retro: "bg-muted-foreground",
  Seasonal: "bg-[color:var(--chart-2)]",
}

const cellPad = "px-3 py-2"

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  columns?: [string, string, string]
  rows?: DiffRow[]
  added?: [string, string, string]
}

function DiffTable({
  title = "Proposed menu cleanup",
  columns = ["Flavor", "Category", "Supplier"],
  rows = DEFAULT_ROWS,
  added = DEFAULT_ADDED,
  className,
  ...props
}: DiffTableProps) {
  const stage = useStage([800, 1000, 1000])
  const tinted = stage >= 2
  const showAdded = stage >= 3

  return (
    <div className={cn("w-full max-w-[23.75rem]", className)} {...props}>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="text-[0.7813rem] font-medium text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[30%]" />
            <col className="w-[36%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              {columns.map((h, i) => (
                <th key={i} className={cn(cellPad, "text-[0.75rem] font-medium text-muted-foreground")}>
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
                  className="border-b border-border transition-colors duration-slow last:border-0 hover:bg-accent/50"
                  style={{ background: out ? "color-mix(in oklab, var(--destructive) 8%, transparent)" : undefined }}
                >
                  <td
                    className={cn(cellPad, "text-[0.8125rem] font-medium tabular-nums transition-colors duration-slow")}
                    style={{ color: out ? "var(--destructive)" : "var(--foreground)" }}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <span
                      className="inline-flex h-[1.375rem] items-center gap-1.5 rounded-full border border-border bg-muted px-2 text-[0.7188rem] font-medium transition-opacity duration-slow"
                      style={{ opacity: out ? 0.55 : 1 }}
                    >
                      <span className={cn("size-1.5 rounded-full", DOT[row.cells[1]] ?? "bg-muted-foreground")} />
                      <span className="text-foreground/70">{row.cells[1]}</span>
                    </span>
                  </td>
                  <td
                    className={cn(cellPad, "text-[0.7813rem] whitespace-nowrap transition-colors duration-slow")}
                    style={{
                      color: out ? "var(--destructive)" : "var(--muted-foreground)",
                      textDecorationLine: out ? "line-through" : "none",
                      textDecorationColor: "color-mix(in oklab, var(--destructive) 50%, transparent)",
                    }}
                  >
                    {row.cells[2]}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td colSpan={3} className="p-0">
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-slow"
                  style={{
                    gridTemplateRows: showAdded ? "1fr" : "0fr",
                    opacity: showAdded ? 1 : 0,
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <div
                    className="overflow-hidden"
                    style={{ background: "color-mix(in oklab, var(--chart-2) 10%, transparent)" }}
                  >
                    <div className="grid grid-cols-[34%_30%_36%] items-center border-t border-border">
                      <span className={cn(cellPad, "text-[0.8125rem] font-medium text-[color:var(--chart-2)] tabular-nums")}>
                        {added[0]}
                      </span>
                      <span className={cellPad}>
                        <span className="inline-flex h-[1.375rem] items-center gap-1.5 rounded-full border border-border bg-card px-2 text-[0.7188rem] font-medium">
                          <span className="size-1.5 rounded-full bg-[color:var(--chart-2)]" />
                          <span className="text-foreground/70">{added[1]}</span>
                        </span>
                      </span>
                      <span className={cn(cellPad, "text-[0.8125rem] text-[color:var(--chart-2)]")}>{added[2]}</span>
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
