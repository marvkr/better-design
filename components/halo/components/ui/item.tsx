import * as React from "react"
import { cn } from "@/lib/utils"

// Halo Item: settings row / menu item / list item
// Translucent surface with hover glow, pill-shaped leading icon container

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
            "cursor-pointer rounded-xl",
            "transition-all duration-base",
            "hover:bg-foreground/[0.06] hover:shadow-[inset_0_0_0.5rem_color-mix(in_oklch,var(--halo)_4%,transparent)]",
            "focus-visible:outline-none focus-visible:bg-foreground/[0.08] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/30",
            "active:bg-foreground/[0.10]",
          ],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {/* Leading slot: icon or avatar */}
        {leading && (
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center",
              "rounded-xl backdrop-blur-md bg-foreground/[0.08] border border-foreground/[0.06]",
              "text-foreground/60",
              "[&>svg]:h-4 [&>svg]:w-4",
              "group-hover:bg-foreground/[0.12] group-hover:text-foreground/80 transition-all duration-base"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-foreground/90 leading-snug truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-foreground/40 leading-snug truncate">
              {subtitle}
            </span>
          )}
          {children}
        </div>

        {/* Trailing slot: action, badge, arrow, toggle */}
        {trailing && (
          <div className="flex shrink-0 items-center gap-2 text-foreground/40 [&>svg]:h-4 [&>svg]:w-4">
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
            "[&>*:not(:last-child)]:border-foreground/[0.06]",
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
