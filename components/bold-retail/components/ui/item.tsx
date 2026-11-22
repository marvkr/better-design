"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Item: one row of an account or order list. The leading icon
 * sits in a soft grey circle, the title reads at body size in medium weight,
 * and a muted line can sit under it. Trailing values line up their figures.
 * A row you can press fills with soft grey under the pointer and a step
 * darker while held.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An icon or avatar, shown in a soft grey circle at the start. */
  leading?: React.ReactNode;
  /** A value, badge or chevron at the end of the row. */
  trailing?: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  /** Adds the hover and press fills for a row that does something. */
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
        "relative flex min-h-16 w-full items-center gap-4 rounded-none px-4 py-3 text-start",
        interactive &&
          "cursor-pointer outline-none transition-colors duration-fast ease-out hover:bg-accent active:bg-(--secondary-hover) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {leading && (
        <span
          data-slot="item-leading"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary [&_svg]:size-5",
            disabled ? "text-(--foreground-disabled)" : "text-foreground",
          )}
        >
          {leading}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-base font-medium leading-snug",
            disabled ? "text-(--foreground-disabled)" : "text-foreground",
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={cn(
              "truncate text-sm",
              disabled
                ? "text-(--foreground-disabled)"
                : "text-muted-foreground",
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
            "flex shrink-0 items-center gap-2 text-base tabular-nums [&_svg]:size-4 [&_svg]:text-muted-foreground",
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
 * Bold retail ItemList: rows stacked in a square white box behind the soft
 * edge. With `divided`, a full-width hairline runs between rows, and the
 * last row has none.
 */
interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

function ItemList({ divided, className, ...props }: ItemListProps) {
  return (
    <div
      data-slot="item-list"
      className={cn(
        "flex flex-col overflow-hidden rounded-none border border-(--border-soft) bg-card",
        divided && "divide-y divide-border",
        className,
      )}
      {...props}
    />
  );
}

export { Item, ItemList };
export type { ItemProps, ItemListProps };
