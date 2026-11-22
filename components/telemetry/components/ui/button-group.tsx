import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room ButtonGroup: fused bank of console keys separated by
// hairline rules, square outer corners.

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? "*:rounded-none [&>*:first-child]:rounded-l-sm [&>*:last-child]:rounded-r-sm [&>*+*]:border-l [&>*+*]:border-border"
          : "flex-col *:rounded-none [&>*:first-child]:rounded-t-sm [&>*:last-child]:rounded-b-sm [&>*+*]:border-t [&>*+*]:border-border",
        className
      )}
      {...props}
    />
  )
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
