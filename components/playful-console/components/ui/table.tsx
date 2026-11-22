import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console Table: a white card of rows.
 *
 * The table sits in a white frame with the olive hairline and the card
 * corner. The header row is a cream band of small bold uppercase labels;
 * body rows are split by the soft line and take a cream wash under the
 * pointer. A selected row takes the orange wash used by pressed chips.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div
    data-slot="table-container"
    className="relative w-full overflow-x-auto rounded-lg border border-border bg-card"
  >
    <table
      ref={ref}
      data-slot="table"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/** The header group: a cream band under the top edge. */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    data-slot="table-header"
    className={cn(
      "bg-secondary [&_tr]:border-b [&_tr]:border-border [&_tr]:hover:bg-transparent",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/** The body group; its last row drops the divider. */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot="table-body"
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/** The footer group: totals on a cream band with bold figures. */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn(
      "border-t border-border bg-secondary font-bold [&>tr:last-child]:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/** One row: a soft divider, a cream wash on hover, orange wash when selected. */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    data-slot="table-row"
    className={cn(
      "border-b border-(--line-soft) transition-colors duration-fast ease-out",
      "hover:bg-secondary/60 data-[state=selected]:bg-(--primary-wash)",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/** A column label: small, bold and uppercase in the muted ink. */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot="table-head"
    className={cn(
      "h-9 whitespace-nowrap px-3 text-start align-middle text-xs font-bold uppercase text-muted-foreground",
      "[&:has([role=checkbox])]:pe-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/** A data cell: secondary ink with even figures. */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    data-slot="table-cell"
    className={cn(
      "px-3 py-2.5 align-middle text-sm tabular-nums text-(--foreground-secondary) [&:has([role=checkbox])]:pe-0",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/** A caption under the frame. */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn("mt-3 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
