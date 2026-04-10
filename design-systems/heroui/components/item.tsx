import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Item: dark theme, rounded-xl row, colored leading icon area
// hover:bg-secondary transition, active:scale-[0.99] press feedback

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  title: string
  subtitle?: string
  disabled?: boolean
  interactive?: boolean
  as?: React.ElementType
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive"
}

const colorLeadMap = {
  default: "bg-secondary text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  secondary: "bg-accent/30 text-accent-foreground",
  success: "bg-[hsl(var(--success)/0.2)] text-[hsl(var(--success))]",
  warning: "bg-[hsl(var(--warning)/0.2)] text-[hsl(var(--warning))]",
  destructive: "bg-destructive/20 text-destructive",
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
      color = "default",
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
            "transition-all duration-150",
            "hover:bg-secondary",
            "focus-visible:outline-none focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
            "active:scale-[0.99]",
          ],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {/* Leading: icon/avatar in colored circle */}
        {leading && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              colorLeadMap[color],
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
}

const ItemList = React.forwardRef<HTMLDivElement, ItemListProps>(
  ({ divided = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col rounded-xl overflow-hidden",
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
