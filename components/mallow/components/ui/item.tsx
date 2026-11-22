import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, selectedOption, optionTrack } from "./_shared";

/**
 * Mallow Item: a row that lies flat on its surface; a hovered row tints and
 * a selected row takes the light violet tint inside a violet ring.
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
          "flex items-center gap-3 rounded-xl px-3.5 py-3 text-foreground",
          "transition-[background-color,box-shadow] duration-base ease-(--ease-out)",
          interactive && ["cursor-pointer", pressScale, focusRing, !selected && "hover:bg-accent"],
          selected && selectedOption,
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
        optionTrack,
        "flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground [&_svg]:size-4.5",
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
      className={cn("truncate text-sm font-medium text-foreground tabular-nums", className)}
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
      className={cn("truncate text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  ),
);
ItemDescription.displayName = "ItemDescription";

const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="item-actions" className={cn("flex shrink-0 items-center gap-1", className)} {...props} />
  ),
);
ItemActions.displayName = "ItemActions";

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions };
