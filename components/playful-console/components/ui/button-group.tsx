import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console ButtonGroup: keys joined into one bar. Only the outer ends
 * keep the 0.5rem key corner; the inner edges go square and overlap by the
 * rim, so neighbouring keys share one border. A hovered or focused key lifts
 * above its neighbours so its slab and ring are never cut off. Stacked
 * vertically, the top and bottom keep the corner instead.
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
        "inline-flex w-fit items-stretch *:rounded-none *:hover:z-10 *:focus-visible:z-10",
        orientation === "horizontal"
          ? "*:first:rounded-s-[0.5rem] *:last:rounded-e-[0.5rem] [&>*+*]:-ms-[0.09375rem]"
          : "flex-col *:first:rounded-t-[0.5rem] *:last:rounded-b-[0.5rem] [&>*+*]:-mt-[0.09375rem]",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
