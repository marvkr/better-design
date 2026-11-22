import * as React from "react";
import { cn } from "@/lib/utils";

/* Segments fuse into one raised velour bar; hairline dividers between. */

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? "*:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*+*]:border-l [&>*+*]:border-border"
          : "flex-col *:rounded-none [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*+*]:border-t [&>*+*]:border-border",
        className
      )}
      {...props}
    />
  )
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
