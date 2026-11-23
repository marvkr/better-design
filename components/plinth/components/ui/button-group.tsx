import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Button Group: controls joined into one machined bar, like the
 * editor's capture-and-export pair. The bar sits in a dark groove; inner
 * corners square off and a hairline of the groove shows between members.
 */

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", attached = true, ...props }, ref) => {
    const horizontal = orientation === "horizontal"
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex w-fit",
          horizontal ? "flex-row" : "flex-col",
          attached
            ? [
                "rounded-lg bg-[var(--groove)] [box-shadow:0_0_0_0.125rem_var(--groove)]",
                "gap-px",
                "*:rounded-none *:relative [&>*:focus-visible]:z-10",
                horizontal
                  ? "[&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg"
                  : "[&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg",
              ]
            : "gap-2",
          className
        )}
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

interface ButtonGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {}

/* Passes its child straight through, so the group styles the control. */
const ButtonGroupItem = React.forwardRef<HTMLDivElement, ButtonGroupItemProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("contents", className)} {...props} />
)
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem }
export type { ButtonGroupProps, ButtonGroupItemProps }
