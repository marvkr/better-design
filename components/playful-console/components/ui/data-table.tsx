"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

/** One column of a DataTable: its header and how to render each cell. */
export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

/** Props for DataTable: the columns, the rows and an optional row action. */
export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: React.ReactNode;
  className?: string;
  onRowClick?: (row: T) => void;
}

/**
 * Playful console DataTable: the card table, driven by a column list.
 *
 * Each column says how to render its cell. When rows open something, the
 * whole row takes the pointer and the first cell holds a real button, so a
 * keyboard user can reach and open the row too. An empty table shows a
 * friendly note in a tall muted row across every column.
 */
function DataTable<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "Nothing here yet.",
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div data-slot="data-table" className={cn("w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="h-28 text-center font-medium text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer active:bg-(--surface-3)")}
              >
                {columns.map((column, columnIndex) => (
                  <TableCell key={column.key} className={column.className}>
                    {onRowClick && columnIndex === 0 ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          // The row listens for clicks too; stop here so one
                          // press opens the row once.
                          event.stopPropagation();
                          onRowClick(row);
                        }}
                        className="flex w-full rounded-sm text-start font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {column.cell(row)}
                      </button>
                    ) : (
                      column.cell(row)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { DataTable };
