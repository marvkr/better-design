import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial ButtonGroup: buttons set side by side as one block. Only
 * the outer ends keep the 0.5rem corner; the inner edges go square and
 * overlap by a hairline, so outlined buttons share one rule between them.
 * A focused button rises above its neighbours so its ring is never cut off.
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
        "inline-flex w-fit items-stretch *:rounded-none *:focus-visible:z-10",
        orientation === "horizontal"
          ? "*:first:rounded-s-md *:last:rounded-e-md [&>*+*]:-ms-px"
          : "flex-col *:first:rounded-t-md *:last:rounded-b-md [&>*+*]:-mt-px",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
