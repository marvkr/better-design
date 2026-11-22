import * as React from "react"
import { cn } from "@/lib/utils"

// Precision ButtonGroup: groups buttons, collapsing inner rounded edges so the
// set reads as one segmented control. Outer corners keep the small radius; inner
// borders merge. Focused/hovered button stacks on top.

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", attached = true, children, ...props }, ref) => {
    const isHorizontal = orientation === "horizontal"

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          isHorizontal ? "flex-row" : "flex-col",
          attached && [
            // For attached groups, clip children and merge borders
            "rounded-md",
            "*:rounded-none",
            // First child
            isHorizontal
              ? "[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md"
              : "[&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md",
            // Collapse adjacent borders
            isHorizontal
              ? "[&>*:not(:first-child)]:-ml-px"
              : "[&>*:not(:first-child)]:-mt-px",
            // Stacking context so focused button appears on top
            "*:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
          ],
          !attached && [
            isHorizontal ? "gap-2" : "gap-2 flex-col",
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
ButtonGroup.displayName = "ButtonGroup"

// Convenience item wrapper: just passes through, group handles styling
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
