"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// DiffTable: proposed edits sweeping through a table, here a cleanup of
// webhook endpoints. The edit plays once (removed rows tint red, an added
// row opens in green) and rests on the finished diff.
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
  { cells: ["/hooks/legacy", "email.sent", "us-east-1"], removed: true },
  { cells: ["/hooks/test", "email.opened", "eu-west-1"], removed: true },
  { cells: ["/hooks/events", "email.bounced", "us-east-1"], removed: false },
]

const DEFAULT_ADDED: [string, string, string] = ["/hooks/delivery", "email.delivered", "eu-west-1"]

const STAGES = [800, 1000, 1000]

const cellPad = "px-4 py-2.5"

/** The neutral event chip in the middle column; it dims when its row is removed. */
function EventChip({ label, dimmed }: { label: string; dimmed?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 max-w-full items-center rounded-full border border-(--line-strong) bg-secondary px-2 font-mono text-xs text-(--foreground-secondary) transition-opacity duration-slow",
        dimmed && "opacity-50",
      )}
    >
      <span className="truncate">{label}</span>
    </span>
  )
}

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  columns?: [string, string, string]
  rows?: DiffRow[]
  added?: [string, string, string]
}

/**
 * Ink mail DiffTable: the card step of luminance behind a hairline, with
 * plain muted column heads and hairline rows. Removal and addition are the
 * only colour: a removed row takes the red tint with struck-through red
 * text, and the added row opens on the green tint.
 */
function DiffTable({
  title = "Proposed webhook cleanup",
  columns = ["Endpoint", "Event", "Region"],
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
      <div className="relative overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-start">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[36%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              {columns.map((h, i) => (
                <th key={i} className={cn(cellPad, "text-start text-xs font-medium text-muted-foreground")}>
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
                    out ? "bg-(--destructive-tint)" : "hover:bg-secondary",
                  )}
                >
                  <td
                    className={cn(
                      cellPad,
                      "truncate font-mono text-xs transition-colors duration-slow",
                      out ? "text-(--destructive-text) line-through decoration-(--destructive-text)" : "text-foreground",
                    )}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <EventChip label={row.cells[1]} dimmed={out} />
                  </td>
                  <td
                    className={cn(
                      cellPad,
                      "whitespace-nowrap font-mono text-xs transition-colors duration-slow",
                      out ? "text-(--destructive-text) line-through decoration-(--destructive-text)" : "text-muted-foreground",
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
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
                    showAdded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden bg-(--success-tint)">
                    <div className="grid grid-cols-[34%_36%_30%] items-center border-t border-border">
                      <span className={cn(cellPad, "truncate font-mono text-xs text-(--success-text)")}>
                        {added[0]}
                      </span>
                      <span className={cellPad}>
                        <EventChip label={added[1]} />
                      </span>
                      <span className={cn(cellPad, "font-mono text-xs text-(--success-text)")}>{added[2]}</span>
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
