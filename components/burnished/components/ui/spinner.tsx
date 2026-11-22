import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished Spinner: a thin slice of the primary's copper ring, turning.
 * The ring is the same conic gradient and sheen as the button, masked down
 * to a hairline band.
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
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "relative block rounded-full shadow-(--ring-rim)",
          "bg-[conic-gradient(from_0deg,transparent_10%,var(--ring-flow))]",
          "[mask:radial-gradient(farthest-side,transparent_calc(100%_-_0.1875rem),oklch(0_0_0)_calc(100%_-_0.125rem))]",
          "animate-spin motion-reduce:animate-[spin_2.4s_linear_infinite]",
          sizes[size],
        )}
      />
    </span>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
