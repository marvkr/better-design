import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * ButtonGroup — container that fuses adjacent chrome chips into one milled bar.
 * Inner buttons drop their radii on the shared seam; the outer ends keep theirs
 * so the group reads as a single beveled rail. Overlap a hairline so the rims
 * butt together cleanly.
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
          ? "flex-row *:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*:not(:first-child)]:-ml-px"
          : "flex-col *:rounded-none [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg [&>*:not(:first-child)]:-mt-px",
        className
      )}
      {...props}
    />
  )
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
