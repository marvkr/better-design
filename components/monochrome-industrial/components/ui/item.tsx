import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/*
 * Item — a list row with elevation. Use for navigation lists, file rows, results, etc.
 * Hover raises it; active state flattens it (pressed).
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
 "flex items-center gap-3 rounded-none px-3 py-2",
 "bg-card text-card-foreground border border-border",
 "",
 "transition-[background-color,box-shadow,border-color,transform] duration-150",
 interactive &&
 "cursor-pointer hover:bg-accent hover: active:translate-y-px active:",
 selected && "border-primary/40 bg-accent ",
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
 "flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-muted text-muted-foreground",
 "",
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
