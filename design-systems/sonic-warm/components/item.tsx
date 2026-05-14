"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

// Tactile Minimal Item — signature list row.
// 40x40 rounded-[10px] icon container, clean hover, subtle scale on press.
// Plays a tick sound on pointer down for tactile feedback.

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
      onPointerDown,
      ...props
    },
    ref
  ) => {
    const { playTick } = useSound()

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (interactive && !disabled) {
        playTick()
      }
      onPointerDown?.(e)
    }

    return (
      <Comp
        ref={ref}
        onPointerDown={handlePointerDown}
        className={cn(
          "group flex w-full items-center gap-3 px-3 py-2.5",
          "text-left",
          interactive && [
            "cursor-pointer rounded-[10px]",
            "transition-all duration-150",
            "hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "active:scale-[0.98]",
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
              "flex h-10 w-10 shrink-0 items-center justify-center",
              "rounded-[10px] border border-border bg-muted text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              "transition-transform duration-150",
              "group-hover:scale-110"
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
