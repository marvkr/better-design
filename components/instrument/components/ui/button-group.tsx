import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark ButtonGroup: fuses buttons into one machined control strip.
// Outer corners keep the lg radius; inner edges go flat and share borders.

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  attached?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      attached = true,
      children,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          isHorizontal ? "flex-row" : "flex-col",
          attached && [
            // For attached groups, clip children and merge borders
            "rounded-lg",
            "*:rounded-none",
            // First / last child keep the outer radius
            isHorizontal
              ? "[&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg"
              : "[&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg",
            // Collapse adjacent borders
            isHorizontal
              ? "[&>*:not(:first-child)]:-ml-px"
              : "[&>*:not(:first-child)]:-mt-px",
            // Stacking context so the focused button appears on top
            "*:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
          ],
          !attached && [isHorizontal ? "gap-2" : "flex-col gap-2"],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

// Convenience item wrapper, the group handles all styling.
type ButtonGroupItemProps = React.HTMLAttributes<HTMLDivElement>;

const ButtonGroupItem = React.forwardRef<HTMLDivElement, ButtonGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("contents", className)} {...props}>
        {children}
      </div>
    );
  }
);
ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
export type { ButtonGroupProps, ButtonGroupItemProps };
