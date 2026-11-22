import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail ButtonGroup: buttons joined into one pill, such as a quantity
 * stepper or a set of view switches. Only the outer ends keep their round
 * caps; the inner edges go square and overlap by a hairline, so outlined
 * buttons share one line between them. A focused button rises above its
 * neighbours so its ring is never cut off. Stacked, the ends take a 0.75rem
 * corner instead.
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
          ? "*:first:rounded-s-full *:last:rounded-e-full [&>*+*]:-ms-px"
          : "flex-col *:first:rounded-t-lg *:last:rounded-b-lg [&>*+*]:-mt-px",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
