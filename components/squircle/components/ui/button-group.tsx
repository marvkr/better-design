import * as React from "react"
import { cn } from "@/lib/utils"

// Apple ButtonGroup: groups buttons horizontally, removes inner rounded edges
// Outer buttons keep rounded-[0.625rem], inner buttons get flat edges where they meet
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
            "rounded-[calc(0.625rem*var(--corner-factor,1))]",
            "*:rounded-none",
            // A button is rounded-full on its own, so the squircle rule skips it.
            // Inside the group it takes the group's factor and shape, which
            // the group only has where corner-shape is supported.
            "*:[--corner-factor:inherit] *:[corner-shape:inherit]",
            // First child
            isHorizontal
              ? "[&>*:first-child]:rounded-l-[calc(0.625rem*var(--corner-factor,1))] [&>*:last-child]:rounded-r-[calc(0.625rem*var(--corner-factor,1))]"
              : "[&>*:first-child]:rounded-t-[calc(0.625rem*var(--corner-factor,1))] [&>*:last-child]:rounded-b-[calc(0.625rem*var(--corner-factor,1))]",
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
