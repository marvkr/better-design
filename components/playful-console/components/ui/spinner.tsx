import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console Spinner: a chunky ring with one third drawn solid and a
 * round cap, turning in the colour of the text around it. Inside a button
 * it takes the button's ink; on its own, give it the orange with
 * `text-primary`.
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
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="size-full animate-spin"
      >
        <circle
          cx="10"
          cy="10"
          r="7.5"
          stroke="currentColor"
          strokeWidth="2.75"
          opacity="0.2"
        />
        <path
          d="M10 2.5a7.5 7.5 0 0 1 6.5 3.75"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
