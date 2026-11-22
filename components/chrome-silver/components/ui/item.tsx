import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/*
 * Item — a list row stamped from the steel plate. Quietly raised at rest; hover
 * lifts it; active flattens it (pressed). Selected rows take the azure alloy
 * fill so they read as the same metal as the primary control.
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
          "bg-card text-card-foreground border border-white/10",
          "[box-shadow:var(--shadow-sm)]",
          "transition-[background,box-shadow,border-color,transform] duration-fast",
          interactive &&
            "cursor-pointer hover:bg-accent hover:[box-shadow:var(--shadow-md)] active:translate-y-px active:[box-shadow:var(--shadow-sm)]",
          selected &&
            "border-transparent [background:var(--surface-on)] text-primary-foreground [box-shadow:var(--shadow-primary)]",
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
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground",
        "[box-shadow:var(--shadow-sm)]",
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
    <div ref={ref} className={cn("text-sm font-medium truncate", className)} {...props} />
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
