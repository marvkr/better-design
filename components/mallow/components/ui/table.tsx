import * as React from "react";

import { cn } from "@/lib/utils";
import { optionTrack } from "./_shared";

/**
 * Mallow Table: rows on a lilac option track. The header is muted text with
 * no fill, rows part on faint hairlines, and a selected row takes the light
 * violet tint inside a violet ring.
 */
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div
      data-slot="table-container"
      className={cn("relative w-full overflow-auto rounded-2xl p-1", optionTrack)}
    >
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom border-separate border-spacing-0 text-sm tabular-nums", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

/** The header group: muted labels over the first row. */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} data-slot="table-header" className={cn(className)} {...props} />
));
TableHeader.displayName = "TableHeader";

/** The body group: the last row drops its hairline. */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot="table-body"
    className={cn("[&_tr:last-child>td]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/** The footer group: a totals row in medium weight above a hairline. */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn("font-medium [&_td]:border-t [&_td]:border-border", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * A row. Hover tints it one step up; `data-state="selected"` gives it the
 * violet tint and ring, with rounded ends on its first and last cells.
 */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "transition-colors duration-fast ease-(--ease-out)",
        "[&>td]:border-b [&>td]:border-border",
        "[&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl",
        "hover:bg-accent/40",
        "data-[state=selected]:bg-(--option-face) data-[state=selected]:shadow-(--option-edge) data-[state=selected]:[&>td]:border-transparent",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

/** A header cell: small muted text, no fill. */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot="table-head"
    className={cn(
      "h-10 px-4 text-left align-middle text-sm font-normal text-muted-foreground",
      "[&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/** A body cell with room for a full figure. */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    data-slot="table-cell"
    className={cn("px-4 py-3 align-middle text-foreground [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/** A caption under the table in muted text. */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn("py-3 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
