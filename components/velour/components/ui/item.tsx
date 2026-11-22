import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * Item: settings row / list row. Quiet by default; hover lifts to the
 * accent tone. The leading glyph sits on a small raised velour chip.
 */

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
            "transition-colors duration-fast",
            "hover:bg-accent",
            "focus-visible:outline-none focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring/30",
            "active:bg-accent/80",
          ],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {leading && (
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center",
              "rounded-lg [background-image:var(--velour-raised)] [box-shadow:var(--shadow-s)]",
              "text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              "transition-colors duration-fast group-hover:text-foreground"
            )}
          >
            {leading}
          </div>
        )}

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
