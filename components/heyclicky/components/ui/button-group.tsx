import * as React from "react";
import { cn } from "@/lib/utils";

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
          ? "*:rounded-none [&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full [&>*+*]:border-l [&>*+*]:border-[oklch(1_0_0_/_0.35)]"
          : "flex-col *:rounded-none [&>*:first-child]:rounded-t-full [&>*:last-child]:rounded-b-full [&>*+*]:border-t [&>*+*]:border-[oklch(1_0_0_/_0.35)]",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
