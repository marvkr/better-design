import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Firefly ButtonGroup: buttons joined into one pill. Only the outer ends
 * keep their round caps; the inner edges go square and overlap by a
 * hairline, so outlined buttons share a single line between them. A
 * focused button lifts above its neighbours so its ring is never cut off.
 * Stacked vertically, the ends take the 1rem panel corner instead.
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
          : "flex-col *:first:rounded-t-xl *:last:rounded-b-xl [&>*+*]:-mt-px",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
