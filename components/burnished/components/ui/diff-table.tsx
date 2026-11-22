"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardSlab, wellInset } from "./_shared"

// DiffTable: a proposed change to an API parameter table. The edit plays
// once (removed rows tint red and strike through, an added row slides
// open in green) and rests on the finished diff.
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
  { cells: ["page_size", "integer", "Results per page"], removed: true },
  { cells: ["offset", "integer", "Rows to skip"], removed: true },
  { cells: ["expand", "string[]", "Related objects"], removed: false },
]

const DEFAULT_ADDED: [string, string, string] = ["cursor", "string", "Next page token"]

const STAGES = [800, 1000, 1000]

const cellPad = "px-3 py-2.5"

/** The type chip: a small recessed well, like a stamp in the metal. */
const typeChip =
  "inline-flex h-5.5 items-center rounded-sm px-1.5 font-mono text-[0.6875rem] tracking-normal transition-opacity duration-slow"

interface DiffTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  columns?: [string, string, string]
  rows?: DiffRow[]
  added?: [string, string, string]
}

/**
 * Burnished DiffTable: a parameter table on an umber slab. Removed rows
 * take a faint destructive wash and strike through; the new row opens in a
 * faint success wash. Type names sit in tiny recessed wells.
 */
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
      <div className={cn(cardSlab, "relative overflow-hidden rounded-2xl")}>
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-xs font-semibold text-foreground">{title}</span>
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
                    out && "bg-destructive/10",
                  )}
                >
                  <td
                    className={cn(
                      cellPad,
                      "font-mono text-xs font-medium tracking-normal transition-colors duration-slow",
                      out ? "text-destructive line-through decoration-destructive/60" : "text-foreground",
                    )}
                  >
                    {row.cells[0]}
                  </td>
                  <td className={cellPad}>
                    <span
                      className={cn(
                        wellInset,
                        typeChip,
                        "text-muted-foreground",
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
                      out ? "text-destructive" : "text-muted-foreground",
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
                  className="grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out)"
                  style={{
                    gridTemplateRows: showAdded ? "1fr" : "0fr",
                    opacity: showAdded ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden bg-success/10">
                    <div className="grid grid-cols-[34%_26%_40%] items-center border-t border-border">
                      <span className={cn(cellPad, "font-mono text-xs font-medium tracking-normal text-success")}>
                        {added[0]}
                      </span>
                      <span className={cellPad}>
                        <span className={cn(wellInset, typeChip, "text-success")}>
                          {added[1]}
                        </span>
                      </span>
                      <span className={cn(cellPad, "truncate text-xs text-success")}>{added[2]}</span>
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
