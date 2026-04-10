import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe DataTable: card bg table with rounded-xl wrapper, subtle row hover
// Column definitions drive rendering — flexible, no external table library

export interface Column<T> {
  key: keyof T | string
  header: string
  cell?: (row: T) => React.ReactNode
  className?: string
  headerClassName?: string
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  loading?: boolean
}

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No results found.",
  loading = false,
  className,
  ...props
}: DataTableProps<T>) {
  const getCellValue = (row: T, col: Column<T>): React.ReactNode => {
    if (col.cell) return col.cell(row)
    const val = row[col.key as keyof T]
    if (val === null || val === undefined) return "—"
    return String(val)
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-card",
        className
      )}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    "px-5 py-3.5 text-left text-xs font-medium text-muted-foreground tracking-widest uppercase",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                    Loading…
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-b border-border/40 last:border-0",
                    "transition-colors duration-150 hover:bg-accent/50"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        "px-5 py-3.5 text-foreground tracking-wide",
                        col.className
                      )}
                    >
                      {getCellValue(row, col)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { DataTable }
