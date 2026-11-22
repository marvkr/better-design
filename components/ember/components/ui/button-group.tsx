"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass ButtonGroup: attached glass segments share one rim.

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", attached = true, children, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        attached
          ? orientation === "vertical"
            ? "[&>*>button]:rounded-none [&>*>button]:border-t-0 [&>*:first-child>button]:rounded-t-lg [&>*:first-child>button]:border-t [&>*:last-child>button]:rounded-b-lg [&>button]:rounded-none [&>button]:border-t-0 [&>button:first-child]:rounded-t-lg [&>button:first-child]:border-t [&>button:last-child]:rounded-b-lg"
            : "[&>*>button]:rounded-none [&>*>button]:border-l-0 [&>*:first-child>button]:rounded-l-lg [&>*:first-child>button]:border-l [&>*:last-child>button]:rounded-r-lg [&>button]:rounded-none [&>button]:border-l-0 [&>button:first-child]:rounded-l-lg [&>button:first-child]:border-l [&>button:last-child]:rounded-r-lg"
          : "gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
ButtonGroup.displayName = "ButtonGroup"

interface ButtonGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGroupItem = React.forwardRef<HTMLDivElement, ButtonGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("contents", className)} {...props}>
        {children}
      </div>
    )
  }
)
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem }
export type { ButtonGroupProps, ButtonGroupItemProps }
