import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock Spinner: a thin cool grey ring with one darker segment turning
 * around it, flat like the rest of the system.
 */
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "size-3.5 border-2",
  default: "size-4 border-2",
  lg: "size-6 border-2",
};

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "block animate-spin rounded-full border-(--track) border-t-foreground motion-reduce:animate-none",
          sizes[size],
        )}
      />
    </span>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
