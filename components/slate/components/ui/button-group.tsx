import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Ops Sharp ButtonGroup — a segmented control rail.
 *
 * Attached groups clip the children to a single sharp 6px capsule (rounded-md),
 * flatten the inner corners, and collapse adjacent hairline borders so the
 * segments meet on one crisp divider. Focused / hovered segments lift onto a
 * higher stacking layer so their ring + border render above the neighbour.
 */

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  attached?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, orientation = "horizontal", attached = true, children, ...props },
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
            // Single sharp capsule around the whole rail.
            "rounded-md",
            "*:rounded-none",
            // Round only the outer ends of the rail.
            isHorizontal
              ? "[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md"
              : "[&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md",
            // Collapse adjacent hairline borders into one divider.
            isHorizontal
              ? "[&>*:not(:first-child)]:-ml-px"
              : "[&>*:not(:first-child)]:-mt-px",
            // Lift the focused / hovered segment above its neighbour.
            "*:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
          ],
          !attached && [isHorizontal ? "gap-2" : "gap-2 flex-col"],
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

// Convenience item wrapper — passes through; the group handles the styling.
interface ButtonGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {}

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
