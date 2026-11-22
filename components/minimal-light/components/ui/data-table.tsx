import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

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

/** A row's cell values: primitives the table can sort and print. */
type DataTableCell = string | number | boolean | null | undefined

function DataTable<T extends Record<string, DataTableCell>>({
  columns,
  data,
  emptyMessage = "No results found.",
  loading = false,
  className,
  ...props
}: DataTableProps<T>) {
  const getCellValue = (row: T, col: Column<T>): React.ReactNode => {
    if (col.cell) return col.cell(row)
    // SAFETY: a column key is either a row property or a synthetic name whose
    // cell renderer never reads the row by key; a miss prints the dash below.
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
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/60 hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn(
                    "px-5 py-3.5 text-left text-xs font-medium text-muted-foreground tracking-widest uppercase",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                    Loading…
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow
                  key={i}
                  className={cn(
                    "border-b border-border/40 last:border-0",
                    "transition-colors duration-fast hover:bg-accent/50"
                  )}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={cn(
                        "px-5 py-3.5 text-foreground tracking-wide",
                        col.className
                      )}
                    >
                      {getCellValue(row, col)}
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
