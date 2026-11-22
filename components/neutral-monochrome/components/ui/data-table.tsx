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

export type SortDirection = "asc" | "desc" | null

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

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  cell?: (row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  keyField: keyof T
  className?: string
  emptyMessage?: string
}

/** A row's cell values: primitives the table can sort and print. */
type DataTableCell = string | number | boolean | null | undefined

function DataTable<T extends Record<string, DataTableCell>>({
  data,
  columns,
  keyField,
  className,
  emptyMessage = "No results.",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDirection>(null)

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else if (sortDir === "asc") {
      setSortDir("desc")
    } else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp = compareCells(aVal, bVal)
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div
      className={cn(
        "rounded-[0.625rem] border border-border/40 bg-card overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40 hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide",
                    col.className
                  )}
                  aria-sort={ariaSort(sortKey === String(col.key), sortDir)}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(String(col.key))}
                      className="inline-flex items-center gap-1.5 rounded-sm cursor-pointer select-none uppercase tracking-wide hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {col.header}
                      <span className="text-muted-foreground/40">
                        {sortKey === String(col.key) && sortDir === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5 text-primary" />
                        ) : sortKey === String(col.key) && sortDir === "desc" ? (
                          <ChevronDown className="h-3.5 w-3.5 text-primary" />
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
            {sorted.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              sorted.map((row, rowIndex) => (
                <TableRow
                  key={String(row[keyField])}
                  className={cn(
                    "border-b border-border/20 transition-colors hover:bg-accent/30",
                    rowIndex === sorted.length - 1 && "border-0"
                  )}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={cn("px-4 py-3 text-foreground", col.className)}
                    >
                      {col.cell
                        ? col.cell(row)
                        : String(row[String(col.key)] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export { DataTable }
