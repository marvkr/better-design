"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Item: one row of a reading-room list. The leading icon
 * sits in a small oat square, the title reads in warm ink, and a caption
 * line can sit under it. Trailing values line their figures up. A row you
 * can press takes an oat wash under the pointer.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An icon or avatar, shown in an oat square at the start. */
  leading?: React.ReactNode;
  /** A value, badge or caret at the end of the row. */
  trailing?: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  /** Adds the hover and press surfaces for a row that does something. */
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
        "relative flex min-h-14 w-full items-center gap-3 rounded-lg px-4 py-3 text-start",
        interactive &&
          "cursor-pointer outline-none transition-colors duration-fast ease-out hover:bg-secondary active:bg-muted focus-visible:ring-3 focus-visible:ring-ring",
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {leading && (
        <span
          data-slot="item-leading"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted [&_svg]:size-4.5",
            disabled ? "text-(--foreground-disabled)" : "text-(--foreground-secondary)",
          )}
        >
          {leading}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-sm font-medium leading-snug",
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
 * Cream editorial ItemList: rows gathered on one oat card behind a warm
 * hairline. With `divided`, a hairline runs between rows, inset from both
 * edges, and the last row has none.
 */
interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

function ItemList({ divided, className, ...props }: ItemListProps) {
  return (
    <div
      data-slot="item-list"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card *:rounded-none",
        divided &&
          "*:after:pointer-events-none *:after:absolute *:after:inset-x-4 *:after:bottom-0 *:after:h-px *:after:bg-border *:last:after:hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Item, ItemList };
export type { ItemProps, ItemListProps };
