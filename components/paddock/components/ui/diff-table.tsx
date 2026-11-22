"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardSlab } from "./_shared"

// DiffTable: a proposed change to a settings table. The edit plays once
// (removed rows tint red and strike through, an added row folds open in
// green) and rests on the finished diff.
//
// Usage:
//   <DiffTable />
//   <DiffTable title="Proposed change" columns={...} rows={...} added={...} />

/** Advances a stage counter once per delay in `steps`, then stops. */
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
  { cells: ["due_soon_days", "number", "Days before a due flag"], removed: true },
  { cells: ["notify_owner", "boolean", "Email the owner only"], removed: true },
  { cells: ["board_view", "string", "Default project view"], removed: false },
]

const DEFAULT_ADDED: [string, string, string] = ["reminders", "object", "Who to notify and when"]

const STAGES = [800, 1000, 1000]

const cellPad = "px-3 py-2.5"

/** The type chip: a flat quiet grey tag in mono. */
const typeChip =
  "inline-block h-5 max-w-full truncate rounded-sm bg-secondary px-2 align-middle font-mono text-xs leading-5 transition-opacity duration-slow"

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  columns?: [string, string, string]
  rows?: DiffRow[]
  added?: [string, string, string]
}

/**
 * Paddock DiffTable: a settings table on a white card. Removed rows take a
 * faint red wash and strike through, the new row folds open in a faint green
 * wash, and type names sit in grey tag chips.
 */
function DiffTable({
  title = "Proposed change to project settings",
  columns = ["Setting", "Type", "Description"],
  rows = DEFAULT_ROWS,
  added = DEFAULT_ADDED,
  className,
  ...props
}: DiffTableProps) {
  const stage = useStage(STAGES)
  const tinted = stage >= 2
  const showAdded = stage >= 3

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className={cn(cardSlab, "relative overflow-hidden rounded-xl")}>
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span aria-hidden="true" className="size-2 rounded-full bg-(--status-late)" />
          <span className="text-[0.8125rem] font-medium text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-1/3" />
            <col className="w-1/4" />
            <col />
          </colgroup>
          <thead className="bg-muted">
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
                    out && "bg-destructive/8",
                  )}
                >
                  <td
                    className={cn(
                      cellPad,
                      "truncate font-mono text-xs font-medium transition-colors duration-slow",
                      out ? "text-destructive-text line-through decoration-destructive/60" : "text-foreground",
                    )}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <span className={cn(typeChip, "text-secondary-foreground", out && "opacity-60")}>
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
                  <div className="overflow-hidden bg-success/10">
                    <div className="flex items-center border-t border-border">
                      <span className={cn(cellPad, "w-1/3 truncate font-mono text-xs font-medium text-success-text")}>
                        {added[0]}
                      </span>
                      <span className={cn(cellPad, "w-1/4 min-w-0")}>
                        <span className={cn(typeChip, "bg-success/12 text-success-text")}>{added[1]}</span>
                      </span>
                      <span className={cn(cellPad, "min-w-0 flex-1 truncate text-xs text-success-text")}>{added[2]}</span>
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
