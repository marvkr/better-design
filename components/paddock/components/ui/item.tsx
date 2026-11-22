import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, pressScale } from "./_shared";

/** Props for a list row that can be interactive or selected. */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  interactive?: boolean;
  selected?: boolean;
}

/**
 * Paddock Item: a list row. A white slab with one 1px cool
 * border; an interactive row firms its border on hover, and a
 * selected row wears a teal ring.
 */
const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, asChild, interactive = true, selected, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="item"
        data-selected={selected ? "" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5",
          cardSlab,
          "transition-shadow duration-fast ease-out",
          interactive && ["cursor-pointer", pressScale, focusRing, "hover:shadow-(--card-lift)"],
          selected && "ring-2 ring-primary",
          className,
        )}
        {...props}
      />
    );
  },
);
Item.displayName = "Item";

/** The grey tile that holds a row's icon. */
const ItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-icon"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  ),
);
ItemIcon.displayName = "ItemIcon";

/** The text column that takes the row's free width. */
const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="item-content" className={cn("min-w-0 flex-1", className)} {...props} />
  ),
);
ItemContent.displayName = "ItemContent";

/** The row's title, cut to one line. */
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

/** The row's muted second line, cut to one line. */
const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-description"
      className={cn("truncate text-[0.8125rem] text-muted-foreground", className)}
      {...props}
    />
  ),
);
ItemDescription.displayName = "ItemDescription";

/** The controls at the row's right edge. */
const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="item-actions" className={cn("flex shrink-0 items-center gap-1", className)} {...props} />
  ),
);
ItemActions.displayName = "ItemActions";

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions };
