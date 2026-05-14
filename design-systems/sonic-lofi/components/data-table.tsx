"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Tactile Minimal Data Table — sortable, clean table with muted header.
// Flat surface, soft border, subtle accent hover. No glass, no gradients.

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

function DataTable<T extends Record<string, unknown>>({
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
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div
      className={cn(
        "w-full overflow-auto rounded-[10px] border border-border bg-card",
        className
      )}
    >
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b border-border bg-muted">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  col.sortable &&
                    "cursor-pointer select-none transition-colors duration-150 hover:text-foreground",
                  col.className
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && (
                    <span className="text-muted-foreground/60">
                      {sortKey === col.key && sortDir === "asc" ? (
                        <Icon
                          icon="tabler:arrow-up"
                          className="h-3.5 w-3.5"
                        />
                      ) : sortKey === col.key && sortDir === "desc" ? (
                        <Icon
                          icon="tabler:arrow-down"
                          className="h-3.5 w-3.5"
                        />
                      ) : (
                        <Icon
                          icon="tabler:arrows-sort"
                          className="h-3.5 w-3.5"
                        />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border transition-colors duration-150 last:border-0 hover:bg-accent"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn(
                    "px-4 py-3 text-sm text-foreground",
                    col.className
                  )}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export { DataTable }
export type { DataTableProps }
