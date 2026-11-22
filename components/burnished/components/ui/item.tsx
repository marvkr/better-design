import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, surfacePlate } from "./_shared";

/**
 * Burnished Item: a row cut as a flat umber plate. An interactive row lifts
 * to the graphite face under a fine pointer and presses toward the page;
 * a selected row wears the raised bevel with its brighter rim.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  interactive?: boolean;
  selected?: boolean;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, asChild, interactive = true, selected, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="item"
        data-selected={selected ? "" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5",
          surfacePlate,
          "transition-[background-image,box-shadow] duration-base ease-(--ease-out)",
          interactive && [
            "cursor-pointer",
            pressScale,
            focusRing,
            "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-(image:--fill-raised) [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-(--bevel-raised-hover)",
          ],
          selected && "bg-(image:--fill-raised) shadow-(--bevel-raised-focus)",
          className,
        )}
        {...props}
      />
    );
  },
);
Item.displayName = "Item";

const ItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-icon"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground [&_svg]:size-4",
        "bg-(image:--fill-well) shadow-(--bevel-well)",
        className,
      )}
      {...props}
    />
  ),
);
ItemIcon.displayName = "ItemIcon";

const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="item-content" className={cn("min-w-0 flex-1", className)} {...props} />
  ),
);
ItemContent.displayName = "ItemContent";

const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-title"
      className={cn("truncate text-sm font-semibold text-foreground", className)}
      {...props}
    />
  ),
);
ItemTitle.displayName = "ItemTitle";

const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-description"
      className={cn("truncate text-xs text-muted-foreground", className)}
      {...props}
    />
  ),
);
ItemDescription.displayName = "ItemDescription";

const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-actions"
      className={cn("flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  ),
);
ItemActions.displayName = "ItemActions";

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions };
