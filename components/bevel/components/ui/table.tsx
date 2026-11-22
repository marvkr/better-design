import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Table.
 *
 * The table is one card: a 20px borderless surface with the card shadow, and
 * the rows inside it are separated by a single pixel of the track token. The
 * rule is an inset shadow on each cell, because a collapsed table drops a
 * shadow set on the row itself. No row carries a border, so a long list reads
 * as one grouped card the way an iOS settings screen does. The header and the
 * footer sit on the inner surface, a shade below the card they live in.
 */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-[1.25rem] bg-card text-card-foreground [box-shadow:var(--shadow-card)]">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
        className,
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-[var(--inner)]",
      "[&_tr>*]:[box-shadow:inset_0_-0.0625rem_0_0_var(--track)]",
      className,
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr>*]:[box-shadow:inset_0_-0.0625rem_0_0_var(--track)]",
      "[&_tr:last-child>*]:[box-shadow:none]",
      className,
    )}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-[var(--inner)] font-semibold text-[var(--strong)]",
      "[&_tr>*]:[box-shadow:inset_0_0.0625rem_0_0_var(--track)]",
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors duration-fast ease-out",
      "hover:bg-[var(--inner)] data-[state=selected]:bg-accent",
      className,
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-3.5 text-left align-middle",
      "text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] text-muted-foreground",
      "[&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-3.5 py-2.5 align-middle text-foreground",
      "[&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-3 text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
