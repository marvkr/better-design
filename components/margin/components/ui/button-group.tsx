import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin ButtonGroup: toolbar pills joined into one strip. Inner corners go
 * square, outer corners keep the 0.625rem round, and each button overlaps
 * its neighbour by one hairline so the rings meet as a single seam.
 */
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

/** A row or column of buttons that reads as one control. */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex isolate *:rounded-none *:focus-visible:z-10",
        orientation === "horizontal"
          ? "flex-row [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*:not(:first-child)]:-ml-[0.0625rem]"
          : "flex-col [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg [&>*:not(:first-child)]:-mt-[0.0625rem]",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
