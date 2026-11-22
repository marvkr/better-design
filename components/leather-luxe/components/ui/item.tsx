import * as React from "react"

import { cn } from "@/lib/utils"

// Leather Luxe Item: a settings row straight from the wallet screen; the
// leading slot is a raised charcoal coin, the row lifts gently on hover.

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  title: string
  subtitle?: string
  disabled?: boolean
  interactive?: boolean
  as?: React.ElementType
  href?: string
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      leading,
      trailing,
      title,
      subtitle,
      disabled,
      interactive = true,
      as: Comp = "div",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          "group flex w-full items-center gap-3 px-4 py-3",
          "text-left",
          interactive && [
            "cursor-pointer rounded-lg",
            "transition-[background,box-shadow] duration-base",
            "hover:bg-accent hover:[box-shadow:var(--shadow-raised-sm)]",
            "focus-visible:outline-none focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring/60",
            "active:bg-accent/70",
          ],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {/* Leading slot: icon or avatar coin */}
        {leading && (
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
              "[background-image:var(--gradient-raised)] border border-highlight",
              "[box-shadow:var(--shadow-raised-sm)]",
              "text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              "transition-[filter,color] duration-base group-hover:brightness-125 group-hover:text-foreground"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text content */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-medium leading-snug text-foreground">
            {title}
          </span>
          {subtitle && (
            <span className="truncate text-xs leading-snug text-muted-foreground">
              {subtitle}
            </span>
          )}
          {children}
        </div>

        {/* Trailing slot: action, badge, arrow, toggle */}
        {trailing && (
          <div className="flex shrink-0 items-center gap-2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
            {trailing}
          </div>
        )}
      </Comp>
    )
  }
)
Item.displayName = "Item"

// Item list container for grouped items
interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean
}

const ItemList = React.forwardRef<HTMLDivElement, ItemListProps>(
  ({ divided = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          divided && [
            "[&>*:not(:last-child)]:border-b",
            "[&>*:not(:last-child)]:border-border",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ItemList.displayName = "ItemList"

export { Item, ItemList }
export type { ItemProps, ItemListProps }
