"use client"

import * as React from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

// Data Table: sortable, clean table

export interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
}

type SortDirection = "asc" | "desc" | null

// Numeric collation puts "9" before "20" before "100"; a plain string
// compare puts "100" first.
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })

/** Narrows a cell to a number, so two of them sort by value. */
function isNumberCell<TCell>(cell: TCell | number): cell is number {
  return typeof cell === "number"
}

function compareCells<TCell>(a: TCell, b: TCell) {
  if (isNumberCell(a) && isNumberCell(b)) return a - b
  return collator.compare(String(a ?? ""), String(b ?? ""))
}

function ariaSort(active: boolean, direction: SortDirection) {
  if (!active || !direction) return undefined
  return direction === "asc" ? "ascending" : "descending"
}

/** A row's cell values: primitives the table can sort and print. */
type DataTableCell = string | number | boolean | null | undefined

function DataTable<T extends Record<string, DataTableCell>>({
  data,
  columns,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDirection>(null)

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"))
      if (sortDir === "desc") setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp = compareCells(aVal, bVal)
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div className={cn("w-full overflow-auto rounded-lg border border-border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border bg-secondary/50 hover:bg-secondary/50">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={cn(
                  "h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground",
                  col.className
                )}
                aria-sort={ariaSort(sortKey === col.key, sortDir)}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-1 rounded-sm cursor-pointer select-none hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {col.header}
                    <span className="text-muted-foreground/50">
                      {sortKey === col.key && sortDir === "asc" ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : sortKey === col.key && sortDir === "desc" ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, i) => (
            <TableRow
              key={i}
              className="border-b border-border/50 bg-background transition-colors last:border-0 hover:bg-secondary/30"
            >
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={cn("px-4 py-3 text-sm text-foreground", col.className)}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {sortedData.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable }
export type { DataTableProps }
