"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

/*
 * Plinth Data Table: a panel of rows. Column heads are Geist Mono readouts;
 * a sortable head is a real button, and the sorted column shows its order
 * in ember.
 */

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

// Numeric collation puts "9" before "20" before "100".
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })

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

function DataTable<T extends Record<string, DataTableCell>>({ data, columns, className }: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDirection>(null)

  const handleSort = (key: keyof T) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
      return
    }
    if (sortDir === "asc") setSortDir("desc")
    else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const cmp = compareCells(a[sortKey], b[sortKey])
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div className={cn("w-full overflow-auto rounded-2xl border border-border bg-card", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            {columns.map((col) => {
              const active = sortKey === col.key && sortDir !== null
              return (
                <TableHead
                  key={String(col.key)}
                  aria-sort={ariaSort(sortKey === col.key, sortDir)}
                  className={cn(
                    "h-10 px-4 text-left align-middle font-mono text-[0.6875rem] font-normal uppercase text-muted-foreground",
                    col.className
                  )}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        "-mx-1.5 inline-flex cursor-pointer select-none items-center gap-1 rounded-md px-1.5 py-1 uppercase",
                        "transition-colors duration-fast hover:bg-muted hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active && "text-foreground"
                      )}
                    >
                      {col.header}
                      <span className={active ? "text-primary" : "text-muted-foreground/50"}>
                        {active && sortDir === "desc" ? (
                          <ChevronDownIcon className="size-3.5" />
                        ) : (
                          <ChevronUpIcon className="size-3.5" />
                        )}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, i) => (
            <TableRow key={i} className="border-b border-border transition-colors duration-fast last:border-0 hover:bg-muted/60">
              {columns.map((col) => (
                <TableCell key={String(col.key)} className={cn("px-4 py-2.5 text-sm text-foreground", col.className)}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {sortedData.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="px-4 py-8 text-center text-sm text-muted-foreground">
                No rows yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// feather:chevron-up
function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m18 15l-6-6l-6 6" />
    </svg>
  )
}

// feather:chevron-down
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
    </svg>
  )
}

export { DataTable }
export type { DataTableProps }
