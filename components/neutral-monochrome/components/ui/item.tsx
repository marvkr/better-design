import * as React from "react"
import { cn } from "@/lib/utils"

// Earthy Item: dark neutral, rounded-lg, minimal hover state
// No colored icon containers — bg-secondary square icon, muted text
// Sharp 8px radius throughout

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  title: string
  subtitle?: string
  disabled?: boolean
  interactive?: boolean
  as?: React.ElementType
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
          "group flex w-full items-center gap-3 px-3 py-2.5",
          "text-left",
          interactive && [
            "cursor-pointer rounded-lg",
            "transition-colors duration-150",
            "hover:bg-secondary",
            "focus-visible:outline-none focus-visible:bg-secondary focus-visible:ring-1 focus-visible:ring-ring",
            "active:scale-[0.98]",
          ],
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {/* Leading: monochromatic icon square */}
        {leading && (
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              "bg-secondary text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text */}
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

        {/* Trailing */}
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

interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean
  bordered?: boolean
}

const ItemList = React.forwardRef<HTMLDivElement, ItemListProps>(
  ({ divided = false, bordered = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        bordered && "rounded-lg border border-border overflow-hidden bg-card",
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
)
ItemList.displayName = "ItemList"

export { Item, ItemList }
export type { ItemProps, ItemListProps }
