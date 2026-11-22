import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Item — one row in a desk list: leading hardware, a stacked label,
 * and a trailing slot. ItemList wraps rows in a window with hairline rules.
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
        "hover:bg-foreground/[0.03]",
        className,
      )}
      {...props}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        {description ? (
          <p className="truncate text-xs text-muted-foreground">{description}</p>
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
        "overflow-hidden rounded-xl bg-card [box-shadow:var(--shadow-window)]",
        "divide-y divide-border",
        className,
      )}
      {...props}
    />
  ),
);
ItemList.displayName = "ItemList";

export { Item, ItemList };
