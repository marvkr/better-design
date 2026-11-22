"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

/*
 * Playdesk DataTable — the Table inside a window, with click-to-sort headers.
 */

export interface Column<T> {
  key: keyof T & string;
  header: string;
  align?: "left" | "right";
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[];
  rows: T[];
}

/** A row's cell values: primitives the table can sort and print. */
type DataTableCell = string | number | boolean | null | undefined

// Numeric collation puts "9" before "20" before "100"; a plain string
// compare puts "100" first.
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

/** Narrows a cell to a number, so two of them sort by value. */
function isNumberCell<TCell>(cell: TCell | number): cell is number {
  return typeof cell === "number";
}

function compareCells<TCell>(a: TCell, b: TCell) {
  if (isNumberCell(a) && isNumberCell(b)) return a - b;
  return collator.compare(String(a ?? ""), String(b ?? ""));
}

function DataTable<T extends Record<string, DataTableCell>>({
  className,
  columns,
  rows,
  ...props
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) => {
      const compare = compareCells(a[sort.key], b[sort.key]);
      return sort.direction === "asc" ? compare : -compare;
    });
  }, [rows, sort]);

  const toggleSort = (key: string) =>
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card [box-shadow:var(--shadow-window)]",
        className,
      )}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.align === "right" ? "text-right" : undefined}
                aria-sort={
                  sort?.key === column.key
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <button
                  type="button"
                  onClick={() => toggleSort(column.key)}
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {column.header}
                  {sort?.key === column.key ? (
                    sort.direction === "asc" ? (
                      <ChevronUp className="size-3" />
                    ) : (
                      <ChevronDown className="size-3" />
                    )
                  ) : null}
                </button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={column.align === "right" ? "text-right" : undefined}
                >
                  {column.render ? column.render(row) : String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
DataTable.displayName = "DataTable";

export { DataTable };
