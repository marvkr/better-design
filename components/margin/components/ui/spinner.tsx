import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin Spinner: a thin ring in the current text colour with one darker arc
 * turning around it. It holds still when motion is reduced.
 */
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-6",
};

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("inline-flex items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        fill="none"
        className={cn(
          "block motion-safe:animate-spin",
          sizes[size],
        )}
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
        <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
