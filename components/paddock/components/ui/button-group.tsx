import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock ButtonGroup: buttons set side by side with a small gap, the way a
 * schedule toolbar lays out its day, week and filter controls. Each button
 * keeps its own border, so the group reads as a row of separate controls.
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
        "inline-flex gap-1.5",
        orientation === "horizontal" ? "flex-row items-center" : "flex-col items-stretch",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
