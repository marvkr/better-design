import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/*
 * Item — a list row rendered as a calm raised tile. Use for navigation lists,
 * file rows, results, etc. Hover lifts the tile to the brighter hover surface;
 * the active state sinks it a hair (pressed). Selected reads as a slightly
 * brighter, more lifted tile, not a hued highlight.
 */

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
          "flex items-center gap-3 rounded-lg px-3 py-2",
          "bg-card text-card-foreground border border-border",
          "[box-shadow:var(--shadow-tile)]",
          "transition-[background-color,box-shadow,border-color,transform] duration-fast",
          interactive &&
            "cursor-pointer hover:bg-accent hover:[box-shadow:var(--shadow-md)] active:translate-y-px active:[box-shadow:var(--shadow-tile)]",
          selected && "bg-accent [box-shadow:var(--shadow-md)]",
          className
        )}
        {...props}
      />
    )
  }
)
Item.displayName = "Item"

const ItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground",
        "[box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    />
  )
)
ItemIcon.displayName = "ItemIcon"

const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 min-w-0", className)} {...props} />
  )
)
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm font-medium text-foreground truncate", className)} {...props} />
  )
)
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs text-muted-foreground truncate", className)} {...props} />
  )
)
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-1 shrink-0", className)} {...props} />
  )
)
ItemActions.displayName = "ItemActions"

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions }
