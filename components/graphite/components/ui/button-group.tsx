import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * ButtonGroup — container that attaches adjacent buttons seamlessly.
 * Inner buttons lose their radii on the shared sides; outer ones keep theirs.
 *
 * Graphite: members read as one continuous raised tile. The outer corners take
 * the calm tile radius (rounded-lg); shared seams collapse to square and overlap
 * the hairline border by 1px so no double-line shows between members.
 */

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
          ? "flex-row [&>*]:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*:not(:first-child)]:-ml-px"
          : "flex-col [&>*]:rounded-none [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg [&>*:not(:first-child)]:-mt-px",
        className
      )}
      {...props}
    />
  )
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
