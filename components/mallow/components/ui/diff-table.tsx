"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { cardSlab, softPanel, optionTrack } from "./_shared"

// DiffTable: a proposed change to a parameter table. The edit plays once
// (removed rows tint and strike through, the added row folds open in the
// violet tint inside a violet ring) and rests on the finished diff.
//
// Usage:
//   <DiffTable />
//   <DiffTable title="Proposed change" columns={...} rows={...} added={...} />

/** Advances a stage counter once per delay in `steps`, or jumps to the end under reduced motion. */
function useStage(steps: number[], skip: boolean) {
  const [stage, setStage] = React.useState(0)
  React.useEffect(() => {
    if (skip) {
      setStage(steps.length)
      return
    }
    if (stage >= steps.length) return
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage])
    return () => clearTimeout(t)
  }, [stage, steps, skip])
  return stage
}

/** One parameter row: name, type and description, and whether the change removes it. */
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

const cellPad = "px-3 py-2.5"

/** The type name: a small lilac tag in mono. */
const typeChip = "inline-flex h-6 items-center rounded-sm bg-(--tag) px-1.5 font-mono text-xs transition-opacity duration-slow"

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  columns?: [string, string, string]
  rows?: DiffRow[]
  added?: [string, string, string]
}

/**
 * Mallow DiffTable: a parameter table on a lilac option track inside the
 * card. Removed rows take a faint red wash and strike through; the new row
 * opens in the violet tint inside a violet ring with green text.
 */
function DiffTable({
  title = "Proposed change to list requests",
  columns = ["Parameter", "Type", "Description"],
  rows = DEFAULT_ROWS,
  added = DEFAULT_ADDED,
  className,
  ...props
}: DiffTableProps) {
  const reduceMotion = useReducedMotion() ?? false
  const stage = useStage(STAGES, reduceMotion)
  const tinted = stage >= 2
  const showAdded = stage >= 3

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <div className={cn(cardSlab, "flex flex-col gap-3 rounded-3xl p-2 pt-4")}>
        <span className="px-3 text-sm font-medium text-foreground">{title}</span>

        <div className={cn(optionTrack, "overflow-hidden rounded-2xl p-1")}>
          <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                {columns.map((h, i) => (
                  <th key={i} className={cn(cellPad, "text-xs font-normal text-muted-foreground")}>
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
                      "transition-colors duration-slow motion-reduce:transition-none",
                      "[&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl",
                      out && "bg-destructive/10",
                    )}
                  >
                    <td
                      className={cn(
                        cellPad,
                        "font-mono text-xs transition-colors duration-slow",
                        out ? "text-destructive-text line-through decoration-current/60" : "text-foreground",
                      )}
                    >
                      {row.cells[0]}
                      {out && <span className="sr-only"> (removed)</span>}
                    </td>
                    <td className={cellPad}>
                      <span className={cn(typeChip, "text-muted-foreground", out && "opacity-60")}>{row.cells[1]}</span>
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
                    aria-hidden={!showAdded}
                    className="grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out) motion-reduce:transition-none"
                    style={{ gridTemplateRows: showAdded ? "1fr" : "0fr", opacity: showAdded ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <div className={cn(softPanel, "mt-1 grid grid-cols-3 items-center rounded-xl")}>
                        <span className={cn(cellPad, "font-mono text-xs text-success-text")}>
                          {added[0]}
                          <span className="sr-only"> (added)</span>
                        </span>
                        <span className={cellPad}>
                          <span className={cn(typeChip, "text-success-text")}>{added[1]}</span>
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
    </div>
  )
}

export { DiffTable }
export type { DiffRow }
