import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel ButtonGroup: groups buttons horizontally, removes inner rounded edges
// Outer buttons keep rounded-[10px], inner buttons get flat edges where they meet
// Divider between buttons via ring-inset on adjacent elements

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
            "rounded-[10px]",
            "*:rounded-none",
            // First child
            isHorizontal
              ? "[&>*:first-child]:rounded-l-[10px] [&>*:last-child]:rounded-r-[10px]"
              : "[&>*:first-child]:rounded-t-[10px] [&>*:last-child]:rounded-b-[10px]",
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

// Convenience item wrapper — just passes through, group handles styling
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
