import * as React from "react"
import { cn } from "@/lib/utils"

// neon Item: settings row / menu item / list item on the dark ground.
// Left: icon/avatar slot + text (title + subtitle)
// Right: optional action (button, badge, toggle)
// Interactive rows lift to bg-accent on hover; leading tile is a dark surface.

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
            "cursor-pointer rounded-[0.625rem]",
            "transition-colors duration-fast",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:bg-accent focus-visible:ring-1 focus-visible:ring-ring",
            "active:bg-secondary",
          ],
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {/* Leading slot: icon or avatar */}
        {leading && (
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center",
              "rounded-[0.625rem] bg-secondary text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-foreground leading-snug truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-muted-foreground leading-snug truncate">
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
