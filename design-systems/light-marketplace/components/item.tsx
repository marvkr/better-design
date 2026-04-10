import * as React from "react"
import { cn } from "@/lib/utils"

// Energetic Item: light marketplace, rounded-[14px], NO shadows, NO extra borders
// hover:bg-secondary (#f0f0f0 light gray) — flat tonal hover
// Charcoal titles, muted gray subtitles; clean and spacious

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
          "group flex w-full items-center gap-3.5 px-4 py-3",
          "text-left",
          interactive && [
            "cursor-pointer rounded-[14px]",
            "transition-colors duration-150",
            "hover:bg-secondary",
            "focus-visible:outline-none focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
            "active:scale-[0.98]",
          ],
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {/* Leading: clean bg-secondary rounded icon box, no border, no shadow */}
        {leading && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center",
              "rounded-[10px] bg-secondary text-foreground/60",
              "[&>svg]:h-5 [&>svg]:w-5"
            )}
          >
            {leading}
          </div>
        )}

        {/* Text */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-semibold text-foreground leading-snug truncate">
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
  card?: boolean
}

const ItemList = React.forwardRef<HTMLDivElement, ItemListProps>(
  ({ divided = false, card = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        // Energetic cards: bg-secondary fill, rounded-[14px], NO border, NO shadow
        card && "rounded-[14px] bg-secondary overflow-hidden",
        divided && [
          "[&>*:not(:last-child)]:border-b",
          "[&>*:not(:last-child)]:border-foreground/5",
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
