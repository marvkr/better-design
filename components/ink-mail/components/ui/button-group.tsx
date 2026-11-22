import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ink mail ButtonGroup: buttons joined into one block. Only the outer ends
 * keep the 1rem button corner; the inner edges go square and overlap by one
 * hairline, so outlined buttons share a single line between them. A focused
 * button lifts above its neighbours so its halo is never cut off.
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
          ? "*:first:rounded-s-xl *:last:rounded-e-xl [&>*+*]:-ms-[0.0625rem]"
          : "flex-col *:first:rounded-t-xl *:last:rounded-b-xl [&>*+*]:-mt-[0.0625rem]",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
