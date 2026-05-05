import * as React from "react"

import { cn } from "@/lib/utils"

// Tactile Minimal Button Group — inline group of buttons

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
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
              "[&>*:first-child]:rounded-l-[6px] [&>*:last-child]:rounded-r-[6px] [&>*:last-child]:border-r",
            ]
          : [
              "flex-col",
              "*:rounded-none *:border-b-0",
              "[&>*:first-child]:rounded-t-[6px] [&>*:last-child]:rounded-b-[6px] [&>*:last-child]:border-b",
            ],
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup }
