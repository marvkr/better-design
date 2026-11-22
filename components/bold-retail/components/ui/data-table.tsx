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

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: React.ReactNode;
  className?: string;
  onRowClick?: (row: T) => void;
}

/**
 * Bold retail DataTable: the hairline table, driven by a column list, for
 * orders, returns and stock. Each column says how to draw its cell. When a
 * row opens something, the whole row takes the pointer and its first cell
 * holds a real button, so a keyboard user can open the row too. An empty
 * table says so in grey across every column.
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
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer active:bg-(--secondary-hover)")}
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
                        className="flex w-full rounded-sm text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
