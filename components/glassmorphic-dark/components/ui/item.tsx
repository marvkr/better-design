import * as React from "react"
import { cn } from "@/lib/utils"

// Glassmorphic Dark Item: settings row / menu item / list item
// Glass surface with hover glow, pill-shaped leading icon container

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
            "transition-all duration-200",
            "hover:bg-white/[0.06] hover:shadow-[inset_0_0_8px_rgba(255,255,255,0.04)]",
            "focus-visible:outline-none focus-visible:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.19_250)]/30",
            "active:bg-white/[0.10]",
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
              "rounded-xl backdrop-blur-md bg-white/[0.08] border border-white/[0.06]",
              "text-white/60",
              "[&>svg]:h-4 [&>svg]:w-4",
              "group-hover:bg-white/[0.12] group-hover:text-white/80 transition-all duration-200"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-white/90 leading-snug truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-white/40 leading-snug truncate">
              {subtitle}
            </span>
          )}
          {children}
        </div>

        {/* Trailing slot: action, badge, arrow, toggle */}
        {trailing && (
          <div className="flex shrink-0 items-center gap-2 text-white/40 [&>svg]:h-4 [&>svg]:w-4">
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
            "[&>*:not(:last-child)]:border-white/[0.06]",
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
