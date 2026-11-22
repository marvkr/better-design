"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

/** One column: its key, its header and how it renders a cell. */
export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

/** Props for a table driven by a column list. */
export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: React.ReactNode;
  className?: string;
  onRowClick?: (row: T) => void;
}

/**
 * Margin DataTable: the Margin table driven by a column list. A row that
 * opens something holds a real button in its first cell, so the keyboard
 * reaches it, and an empty table says so in muted text.
 */
function DataTable<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "No results.",
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div data-slot="data-table" className={cn("w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow className="pointer-fine:hover:bg-transparent">
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow className="pointer-fine:hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer active:bg-(--field)")}
              >
                {columns.map((column, columnIndex) => (
                  <TableCell key={column.key} className={column.className}>
                    {onRowClick && columnIndex === 0 ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          // The row handles clicks as well; stop so one press opens once.
                          event.stopPropagation();
                          onRowClick(row);
                        }}
                        className={cn(focusRing, "flex w-full rounded-sm text-start font-medium text-foreground")}
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
