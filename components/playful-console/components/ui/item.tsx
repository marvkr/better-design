"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console Item: one row of a settings-style list. The leading icon
 * sits on a small cream tile with an olive edge, the title reads bold, and
 * a muted line can sit under it. Trailing values run in mono figures. A row
 * you can press takes the cream wash under the pointer and a deeper step
 * while held.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An icon or avatar, shown on a small tile at the start. */
  leading?: React.ReactNode;
  /** A value, badge or chevron at the end of the row. */
  trailing?: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  /** Adds the hover and press surfaces for a row that does something. */
  interactive?: boolean;
  as?: React.ElementType;
  href?: string;
}

/** One list row with an optional leading tile, subtitle and trailing value. */
function Item({
  leading,
  trailing,
  title,
  subtitle,
  disabled,
  interactive,
  as,
  href,
  className,
  ...props
}: ItemProps) {
  const Comp: React.ElementType = as ?? (href ? "a" : "div");

  return (
    <Comp
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled || undefined}
      data-slot="item"
      className={cn(
        "relative flex min-h-14 w-full items-center gap-3 rounded-lg px-4 py-3 text-start",
        interactive &&
          "cursor-pointer transition-colors duration-fast ease-out hover:bg-secondary active:bg-(--surface-3) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {leading && (
        <span
          data-slot="item-leading"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-(--line-strong) bg-secondary [&_svg]:size-5",
            disabled ? "text-(--foreground-disabled)" : "text-foreground",
          )}
        >
          {leading}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-[0.9375rem] font-bold leading-snug",
            disabled ? "text-(--foreground-disabled)" : "text-foreground",
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={cn(
              "truncate text-sm",
              disabled ? "text-(--foreground-disabled)" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </span>
        )}
      </span>
      {trailing && (
        <span
          data-slot="item-trailing"
          className={cn(
            "flex shrink-0 items-center gap-2 font-mono text-sm font-medium tabular-nums [&_svg]:size-4 [&_svg]:text-muted-foreground",
            disabled ? "text-(--foreground-disabled)" : "text-foreground",
          )}
        >
          {trailing}
        </span>
      )}
    </Comp>
  );
}

/**
 * Playful console ItemList: rows grouped on one white card behind the olive
 * hairline. With `divided`, the soft line runs between rows, inset from both
 * edges, and the last row has none.
 */
interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

/** A white card that stacks Item rows. */
function ItemList({ divided, className, ...props }: ItemListProps) {
  return (
    <div
      data-slot="item-list"
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-card *:rounded-none",
        divided &&
          "*:after:pointer-events-none *:after:absolute *:after:inset-x-4 *:after:bottom-0 *:after:h-px *:after:bg-(--line-soft) *:last:after:hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Item, ItemList };
export type { ItemProps, ItemListProps };
