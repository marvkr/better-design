import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Spinner: a turning loader in the colour of the text around
 * it. Inside a black pill it turns white; on the page it turns black.
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn(
        "inline-flex shrink-0",
        size === "sm" && "size-4",
        size === "default" && "size-5",
        size === "lg" && "size-8",
        className,
      )}
      {...props}
    >
      <Icon
        icon="mingcute:loading-3-line"
        aria-hidden="true"
        className="size-full animate-spin"
      />
    </div>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
