import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin Table: rows on a white sheet bounded by one hairline. The header
 * sits on the grey canvas in small muted text, rows part on hairlines, and a
 * row turns the hover grey under a fine pointer.
 */
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div
      data-slot="table-container"
      className="relative w-full overflow-auto rounded-xl border border-border bg-card text-card-foreground"
    >
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

/** The header group: the grey canvas under the column names. */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    data-slot="table-header"
    className={cn("bg-muted [&_tr]:border-b [&_tr]:border-border", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/** The body group; the last row drops its hairline. */
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

/** The footer group: totals in medium weight on the grey canvas. */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn("border-t border-border bg-muted font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/** A row: one hairline below, the hover grey on a fine pointer, field grey when selected. */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors duration-fast ease-(--ease-out)",
        "pointer-fine:hover:bg-accent/60 data-[state=selected]:bg-(--field)",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

/** A column name: small, medium weight, muted. */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot="table-head"
    className={cn(
      "h-8 px-3 text-left align-middle text-xs font-medium text-muted-foreground",
      "[&:has([role=checkbox])]:pe-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/** A data cell with the list's compact padding. */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    data-slot="table-cell"
    className={cn("h-10 px-3 py-2 align-middle [&:has([role=checkbox])]:pe-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/** A caption under the sheet in muted text. */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn("py-3 text-xs text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
