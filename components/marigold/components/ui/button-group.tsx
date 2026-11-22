"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard ButtonGroup: fused control strip; one rim around the whole group.

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  attached?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", attached = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          orientation === "vertical" && "flex-col",
          attached
            ? cn(
                "overflow-hidden rounded-lg shadow-[var(--tb-shadow-raise)]",
                orientation === "horizontal"
                  ? "[&>*>*]:rounded-none [&>*>*]:shadow-none [&>*>*:not(:first-child)]:border-l [&>*>*:not(:first-child)]:border-border/70"
                  : "[&>*>*]:rounded-none [&>*>*]:shadow-none [&>*>*:not(:first-child)]:border-t [&>*>*:not(:first-child)]:border-border/70"
              )
            : "gap-2",
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
