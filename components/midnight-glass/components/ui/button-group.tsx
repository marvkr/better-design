import * as React from "react"

import { cn } from "@/lib/utils"

// Midnight Glass Button Group — inline group with glass dividers

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? [
              "flex-row",
              "*:rounded-none *:border-r-0",
              "[&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full [&>*:last-child]:border-r",
            ]
          : [
              "flex-col",
              "*:rounded-none *:border-b-0",
              "[&>*:first-child]:rounded-t-full [&>*:last-child]:rounded-b-full [&>*:last-child]:border-b",
            ],
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup }
