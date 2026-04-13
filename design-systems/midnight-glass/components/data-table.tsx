"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Midnight Glass Data Table: sortable, frosted-glass table
// Glass surfaces for wrapper and header, white/[0.08] borders, white/[0.03] hover

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
        "w-full overflow-auto rounded-xl border border-white/[0.08]",
        "backdrop-blur-xl bg-white/[0.03]",
        "shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]",
        className
      )}
    >
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b border-white/[0.08] backdrop-blur-xl bg-white/[0.04]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground",
                  col.sortable && "cursor-pointer select-none hover:text-foreground",
                  col.className
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="text-muted-foreground/50">
                      {sortKey === col.key && sortDir === "asc" ? (
                        <Icon icon="tabler:chevron-up" className="h-3.5 w-3.5" />
                      ) : sortKey === col.key && sortDir === "desc" ? (
                        <Icon icon="tabler:chevron-down" className="h-3.5 w-3.5" />
                      ) : (
                        <Icon icon="tabler:selector" className="h-3.5 w-3.5" />
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
              className="border-b border-white/[0.06] transition-colors duration-300 last:border-0 hover:bg-white/[0.03]"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn("px-4 py-3 text-sm text-foreground", col.className)}
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
