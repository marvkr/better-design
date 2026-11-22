import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Margin Item: a row from the notes list. Rows sit flat on the page and part
 * on a hairline inset from both edges. An interactive row turns hover grey,
 * and a selected row becomes a paper card with an oxblood line drawn inside its
 * edge; the hairlines either side of it fade out.
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
        aria-current={selected ? "true" : undefined}
        className={cn(
          "relative flex items-start gap-3 rounded-xl p-3",
          "transition-colors duration-fast ease-(--ease-out)",
          // The hairline between two rows, hidden next to the selected one.
          "[[data-slot=item]+&]:before:absolute [[data-slot=item]+&]:before:inset-x-3 [[data-slot=item]+&]:before:top-0 [[data-slot=item]+&]:before:h-px [[data-slot=item]+&]:before:bg-border",
          "[[data-selected]+&]:before:opacity-0 data-selected:before:opacity-0",
          interactive && ["cursor-pointer", focusRing, "pointer-fine:hover:bg-accent/60"],
          selected && "bg-card ring-2 ring-inset ring-primary shadow-sm pointer-fine:hover:bg-card",
          className,
        )}
        {...props}
      />
    );
  },
);
Item.displayName = "Item";

/** A small tinted square that holds the row's icon. */
const ItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-icon"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--mark) text-(--mark-foreground) [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  ),
);
ItemIcon.displayName = "ItemIcon";

/** The text column: title, excerpt and meta stacked with a small gap. */
const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="item-content" className={cn("flex min-w-0 flex-1 flex-col gap-1.5", className)} {...props} />
  ),
);
ItemContent.displayName = "ItemContent";

/** The row title on one line, medium weight, cut with an ellipsis. */
const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-title"
      className={cn("flex min-w-0 items-center gap-2 truncate text-sm font-medium text-foreground", className)}
      {...props}
    />
  ),
);
ItemTitle.displayName = "ItemTitle";

/** The excerpt in muted text, held to two lines. */
const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-description"
      className={cn("line-clamp-2 text-sm leading-snug text-muted-foreground", className)}
      {...props}
    />
  ),
);
ItemDescription.displayName = "ItemDescription";

/** The faint meta line under the excerpt, such as an edit time with its icon. */
const ItemMeta = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-meta"
      className={cn(
        "mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground/80 [&_svg]:size-3.5 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  ),
);
ItemMeta.displayName = "ItemMeta";

/** The trailing slot for icons or buttons at the row's end. */
const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-actions"
      className={cn("flex shrink-0 items-center gap-1 text-muted-foreground [&_svg]:size-4", className)}
      {...props}
    />
  ),
);
ItemActions.displayName = "ItemActions";

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemMeta, ItemActions };
