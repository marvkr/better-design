"use client"

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

export interface DataTableColumn<T> {
  key: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  getRowKey?: (row: T, index: number) => string | number
  emptyMessage?: React.ReactNode
  className?: string
  onRowClick?: (row: T) => void
}

function DataTable<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "No results.",
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={getRowKey ? getRowKey(row, i) : i}
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={col.key} className={col.className}>
                    {onRowClick && colIndex === 0 ? (
                      <button
                        type="button"
                        onClick={() => onRowClick(row)}
                        className="flex w-full rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      >
                        {col.cell(row)}
                      </button>
                    ) : (
                      col.cell(row)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable }
