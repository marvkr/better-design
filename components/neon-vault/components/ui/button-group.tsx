import * as React from "react"

import { cn } from "@/lib/utils"

// Neon Vault ButtonGroup: attached pill segments. Outer corners stay fully
// rounded like the wallet's paired Deposit / Withdraw controls; inner edges
// flatten and share a hairline.

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
            "rounded-full",
            "*:rounded-none",
            isHorizontal
              ? "[&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full"
              : "[&>*:first-child]:rounded-t-full [&>*:last-child]:rounded-b-full",
            isHorizontal
              ? "[&>*:not(:first-child)]:-ml-px"
              : "[&>*:not(:first-child)]:-mt-px",
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
