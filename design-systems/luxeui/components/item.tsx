import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Item: premium dark monochromatic settings/list row
// hover:bg-accent subtle, no colored icon containers — monochromatic only
// tracking-wide text, active:scale-[0.99] subtle press

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
          "group flex w-full items-center gap-3 px-4 py-3.5",
          "text-left",
          interactive && [
            "cursor-pointer rounded-xl",
            "transition-all duration-200",
            "hover:bg-accent",
            "focus-visible:outline-none focus-visible:bg-accent focus-visible:ring-1 focus-visible:ring-ring",
            "active:scale-[0.99]",
          ],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {/* Leading: monochromatic icon container with depth */}
        {leading && (
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              "border border-border bg-secondary",
              "shadow-[inset_0_2px_4px_0_rgba(35,35,35,0.8)]",
              "text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium tracking-wide text-foreground leading-snug truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-muted-foreground tracking-wide leading-snug truncate">
              {subtitle}
            </span>
          )}
          {children}
        </div>

        {/* Trailing */}
        {trailing && (
          <div className="flex shrink-0 items-center gap-2 text-muted-foreground/60 [&>svg]:h-4 [&>svg]:w-4">
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
        bordered && "rounded-xl border border-border bg-card overflow-hidden",
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
