import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel ButtonGroup.
 *
 * Joins a run of Buttons from ./button into one segmented control, and takes
 * its radius from that button so the two agree. The outer corners keep
 * the 12px button radius and the inner ones go square, so the group reads as
 * a single control rather than a row of separate buttons. Each button keeps
 * its own ring, so the pair overlaps by one pixel and the seam stays a single
 * hairline. A focused or hovered button is raised above its neighbours so its
 * ring is never clipped.
 */

/** Props for `ButtonGroup`; `orientation` picks which corners stay round. */
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex *:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
        orientation === "horizontal" ?
          "flex-row *:rounded-none [&>*:first-child]:rounded-l-[0.75rem] [&>*:last-child]:rounded-r-[0.75rem] [&>*:not(:first-child)]:-ml-px"
        : "flex-col *:rounded-none [&>*:first-child]:rounded-t-[0.75rem] [&>*:last-child]:rounded-b-[0.75rem] [&>*:not(:first-child)]:-mt-px",
        className,
      )}
      {...props}
    />
  ),
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
