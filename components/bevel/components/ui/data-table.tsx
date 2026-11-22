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

/*
 * Bevel DataTable.
 *
 * A thin wrapper that maps columns and rows onto the Table above, so every
 * data grid inherits the same one-card surface and the same track rules. The
 * empty state uses the label step, because it is a note rather than content.
 */

/** One column: its header, how to render a cell, and an optional cell class. */
export interface DataTableColumn<T> {
  key: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  className?: string
}

/** Props for `DataTable`. Pass `getRowKey` whenever the list can reorder. */
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
  emptyMessage = "Nothing here yet.",
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
          {data.length === 0 ?
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          : data.map((row, i) => (
              <TableRow
                key={getRowKey ? getRowKey(row, i) : i}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? "cursor-pointer" : undefined}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable }
