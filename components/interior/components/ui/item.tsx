import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior Item — one row in a list: leading hardware, a stacked label, a
 * trailing slot. ItemList is a panel lifted out of the bezel, its rows
 * separated by hairline compartment edges; the lift shadow carries the
 * elevation, never a border.
 */

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  title: string;
  description?: string;
  trailing?: React.ReactNode;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, leading, title, description, trailing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors duration-fast",
        "hover:bg-secondary/60",
        className,
      )}
      {...props}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.8125rem] font-medium leading-[1.4] text-foreground">
          {title}
        </p>
        {description ? (
          <p className="truncate text-[0.7813rem] text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  ),
);
Item.displayName = "Item";

export interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {}

const ItemList = React.forwardRef<HTMLDivElement, ItemListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-[0.875rem] bg-card shadow-[var(--shadow-lift)]",
        "divide-y divide-border",
        className,
      )}
      {...props}
    />
  ),
);
ItemList.displayName = "ItemList";

export { Item, ItemList };
