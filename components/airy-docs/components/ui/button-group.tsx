import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs ButtonGroup: buttons joined into one pill, the way a docs page
 * offers "Copy page" beside a menu chevron. Only the outer ends stay round;
 * inner edges go square and overlap by a hairline, so outline buttons share
 * one line. A focused button rises above its neighbours so its ring shows.
 * Stacked, the ends take the 0.75rem panel corner.
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
