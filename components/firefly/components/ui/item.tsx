"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Firefly Item: one row of a settings-style list. The leading icon sits in
 * a round warm disc, the title reads at the larger body size, and a muted
 * line can sit under it. Trailing values line their figures up. A row you
 * can press warms under the pointer and darkens a step while held.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An icon or avatar, shown in a round warm disc at the start. */
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
        "relative flex min-h-14 w-full items-center gap-3 rounded-xl p-4 text-start",
        interactive &&
          "cursor-pointer transition-colors duration-fast ease-out hover:bg-(--surface-2) active:bg-(--surface-3) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {leading && (
        <span
          data-slot="item-leading"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--surface-2) [&_svg]:size-5",
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
 * Firefly ItemList: rows grouped on one warm card with a 1rem corner. With
 * `divided`, an inset hairline runs between rows, stopping short of both
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
        "flex flex-col overflow-hidden rounded-xl bg-card *:rounded-none",
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
