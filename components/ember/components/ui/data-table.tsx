"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

// Amber Glass DataTable: sortable glass table; the active sort arrow glows amber.

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
      const result = compareCells(a[sortKey], b[sortKey])
      return sortDir === "asc" ? result : -result
    })
  }, [data, sortKey, sortDir])

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl",
        "backdrop-blur-[var(--ag-blur)] bg-card",
        "border border-[color:var(--ag-border)]",
        "shadow-[var(--shadow-glass)]",
        className
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={col.className}
                aria-sort={ariaSort(sortKey === col.key, sortDir)}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:rounded-md"
                  >
                    {col.header}
                    <Icon
                      icon={
                        sortKey === col.key
                          ? sortDir === "asc"
                            ? "tabler:chevron-up"
                            : "tabler:chevron-down"
                          : "tabler:selector"
                      }
                      className={cn(
                        "h-3.5 w-3.5",
                        sortKey === col.key ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </button>
                ) : (
                  col.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={String(col.key)} className={col.className}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {sorted.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results.
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
