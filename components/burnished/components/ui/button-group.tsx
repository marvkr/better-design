import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished ButtonGroup: bevelled buttons joined into one pill. The inner
 * ends go square and the outer ends keep the full round, and each button
 * overlaps its neighbour by one hairline so the rims read as a single seam.
 */
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

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
          ? "flex-row [&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full [&>*:not(:first-child)]:-ml-[0.0625rem]"
          : "flex-col [&>*:first-child]:rounded-t-3xl [&>*:last-child]:rounded-b-3xl [&>*:not(:first-child)]:-mt-[0.0625rem]",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
