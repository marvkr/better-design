"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/*
 * Bevel Item.
 *
 * The tappable list row: 12px radius, px-3.5 py-2.5, on the card surface with
 * the light shadow step. Hover lifts it to the full card shadow and pressing
 * it drops it into the well, which is the same press this system gives a
 * button. A selected row takes the blue pop tint rather than the primary
 * gradient, because the row reports a choice and does not make one.
 */

/** Props for `Item`; `asChild` renders the row as a link or a button. */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  interactive?: boolean
  selected?: boolean
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, asChild, interactive = true, selected, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-[0.75rem] px-3.5 py-2.5",
          "bg-card text-card-foreground",
          "[box-shadow:var(--shadow-sm)]",
          "transition-[background-color,box-shadow,transform] duration-fast ease-out",
          interactive &&
            "cursor-pointer hover:[box-shadow:var(--shadow-card)] active:translate-y-px active:[box-shadow:var(--shadow-inset)]",
          selected &&
            "bg-[var(--pop-blue)] text-[var(--pop-blue-foreground)] hover:bg-[var(--pop-blue)] [box-shadow:var(--shadow-ring)]",
          className,
        )}
        {...props}
      />
    )
  },
)
Item.displayName = "Item"

const ItemIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex size-9 shrink-0 items-center justify-center rounded-[0.625rem]",
      "bg-[var(--inner)] text-muted-foreground",
      "[box-shadow:var(--shadow-inset)]",
      "[&_svg]:size-[1.125rem]",
      className,
    )}
    {...props}
  />
))
ItemIcon.displayName = "ItemIcon"

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("min-w-0 flex-1", className)} {...props} />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "truncate text-[0.9063rem] leading-[1.125rem] font-medium tracking-[-0.0063rem]",
      className,
    )}
    {...props}
  />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "truncate text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center gap-1.5", className)}
    {...props}
  />
))
ItemActions.displayName = "ItemActions"

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions }
