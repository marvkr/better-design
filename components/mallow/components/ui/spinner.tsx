import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Mallow Spinner: a thin ring of faint white with one bright arc turning
 * around it. Under reduced motion the arc stops turning and the ring fades
 * slowly instead.
 */
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "size-3.5 border-2",
  default: "size-4 border-2",
  lg: "size-6 border-3",
};

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("inline-flex items-center justify-center text-foreground", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block rounded-full border-current/15 border-t-current",
          "animate-spin motion-reduce:animate-pulse",
          sizes[size],
        )}
      />
    </span>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
