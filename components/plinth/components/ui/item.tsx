import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/*
 * Plinth Item: a row inside a panel, like the editor's source row. It sits
 * flat on a faint tint with a hairline ring; hover lifts the tint one step,
 * and a chosen row takes the ember ring the selected thumbnail wears.
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
          "flex items-center gap-3 rounded-2xl p-2 pr-3 text-card-foreground",
          "bg-[oklch(1_0_0/0.015)] [box-shadow:inset_0_0_0_0.0625rem_oklch(1_0_0/0.045)]",
          "transition-[background-color,box-shadow] duration-fast",
          interactive && "cursor-pointer hover:bg-muted",
          selected && "bg-muted [box-shadow:inset_0_0_0_0.0625rem_var(--ring)]",
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
        "flex size-10 shrink-0 items-center justify-center rounded-xl bg-input text-muted-foreground",
        "[box-shadow:var(--shadow-inset)] [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
)
ItemIcon.displayName = "ItemIcon"

const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />
  )
)
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("truncate text-sm font-medium text-foreground", className)} {...props} />
  )
)
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("truncate font-mono text-[0.6875rem] uppercase text-muted-foreground", className)}
      {...props}
    />
  )
)
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex shrink-0 items-center gap-1.5", className)} {...props} />
  )
)
ItemActions.displayName = "ItemActions"

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions }
