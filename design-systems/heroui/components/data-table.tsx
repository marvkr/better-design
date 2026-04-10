"use client"

import * as React from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Dynamic Data Table: card bg, striped rows, rounded corners

type SortDir = "asc" | "desc" | null

interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  className?: string
}

function DataTable<T extends Record<string, unknown>>({ columns, data, className }: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)

  const handleSort = (key: keyof T) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); return }
    if (sortDir === "asc") { setSortDir("desc"); return }
    setSortKey(null); setSortDir(null)
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey], bv = b[sortKey]
    if (av === bv) return 0
    const cmp = av! < bv! ? -1 : 1
    return sortDir === "asc" ? cmp : -cmp
  })

  return (
    <div className={cn("overflow-hidden rounded-2xl bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground",
                    col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors"
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      <span className="text-muted-foreground/40">
                        {sortKey === col.key && sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> :
                         sortKey === col.key && sortDir === "desc" ? <ChevronDown className="h-3.5 w-3.5" /> :
                         <ChevronsUpDown className="h-3.5 w-3.5" />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, ri) => (
              <tr key={ri} className={cn("border-b border-border last:border-0 transition-colors hover:bg-secondary/30", ri % 2 === 1 && "bg-secondary/10")}>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-foreground">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { DataTable }
