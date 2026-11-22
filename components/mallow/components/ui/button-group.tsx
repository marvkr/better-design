import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Mallow ButtonGroup: buttons joined into one. The inner ends go square, the
 * outer ends stay round, and a hairline gap keeps each button's own edge.
 */
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
        "isolate inline-flex gap-0.25 *:rounded-none *:focus-visible:z-10",
        orientation === "horizontal"
          ? "flex-row *:first:rounded-s-lg *:last:rounded-e-lg"
          : "flex-col *:first:rounded-t-lg *:last:rounded-b-lg",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
