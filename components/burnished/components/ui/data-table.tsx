"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing } from "./_shared";
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
 * Burnished DataTable: the Burnished table set on an umber slab, driven by
 * a column list.
 *
 * Each column says how to render its cell. When a row opens something, the
 * row takes the pointer and its first cell holds a real button, so a
 * keyboard user can open it too. An empty table says so in muted text.
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
    <div
      data-slot="data-table"
      className={cn(cardSlab, "w-full overflow-hidden rounded-2xl p-1.5", className)}
    >
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
                className={cn(onRowClick && "cursor-pointer active:bg-accent")}
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
                        className={cn(
                          focusRing,
                          "flex w-full rounded-md text-start font-semibold text-foreground",
                        )}
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
