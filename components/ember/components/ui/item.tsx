"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Item: list row with leading / trailing slots; interactive rows
// brighten like the board's hover states.

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
      className,
      leading,
      trailing,
      title,
      subtitle,
      disabled,
      interactive,
      as,
      href,
      ...props
    },
    ref
  ) => {
    const Comp = as ?? (href ? "a" : "div")

    return (
      <Comp
        ref={ref}
        href={href}
        aria-disabled={disabled || undefined}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
          interactive &&
            "cursor-pointer transition-colors duration-fast hover:bg-[var(--ag-fill)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {leading && <span className="shrink-0 text-muted-foreground">{leading}</span>}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold tracking-[-0.01em] text-foreground">
            {title}
          </span>
          {subtitle && (
            <span className="truncate text-xs text-muted-foreground">{subtitle}</span>
          )}
        </span>
        {trailing && <span className="shrink-0 text-muted-foreground">{trailing}</span>}
      </Comp>
    )
  }
)
Item.displayName = "Item"

interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean
}

const ItemList = React.forwardRef<HTMLDivElement, ItemListProps>(
  ({ className, divided, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        divided && "divide-y divide-[oklch(1_0_0/0.09)]",
        className
      )}
      {...props}
    />
  )
)
ItemList.displayName = "ItemList"

export { Item, ItemList }
export type { ItemProps, ItemListProps }
