"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Item: one row of a docs index, such as a guide, an endpoint or
 * a setting. The leading icon sits in a small square tile, the title in
 * medium ink, a muted line under it. A row you can press takes the pale
 * tray under the pointer.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An icon or avatar, shown in a small tile at the start. */
  leading?: React.ReactNode;
  /** A value, badge or chevron at the end of the row. */
  trailing?: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  /** Adds the hover surface and focus ring for a row that does something. */
  interactive?: boolean;
  as?: React.ElementType;
  href?: string;
}

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
        "relative flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start",
        interactive &&
          "cursor-pointer outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring",
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {leading && (
        <span
          data-slot="item-leading"
          className={cn(
            "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-background [&_svg]:size-4",
            disabled ? "text-(--foreground-disabled)" : "text-(--foreground-secondary)",
          )}
        >
          {leading}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-sm font-medium leading-5",
            disabled ? "text-(--foreground-disabled)" : "text-foreground",
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={cn(
              "truncate text-[0.8125rem] leading-5",
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
            "flex shrink-0 items-center gap-2 text-sm tabular-nums [&_svg]:size-4 [&_svg]:text-muted-foreground",
            disabled ? "text-(--foreground-disabled)" : "text-(--foreground-secondary)",
          )}
        >
          {trailing}
        </span>
      )}
    </Comp>
  );
}

/**
 * Airy docs ItemList: rows grouped in one hairline-edged box with a 1rem
 * corner. With `divided`, a hairline runs between rows and the last row has
 * none.
 */
interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

function ItemList({ divided, className, ...props }: ItemListProps) {
  return (
    <div
      data-slot="item-list"
      className={cn(
        "flex flex-col gap-0.5 overflow-hidden rounded-xl border border-border bg-card p-1.5",
        divided &&
          "gap-0 p-0 *:rounded-none *:border-b *:border-border *:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

export { Item, ItemList };
export type { ItemProps, ItemListProps };
