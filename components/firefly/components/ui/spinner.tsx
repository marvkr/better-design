import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Firefly Spinner: a faint ring with one quarter drawn solid, turning in
 * the colour of the text around it. Inside a button it takes the button's
 * ink; on its own, give it the olive accent with `text-(--accent-line)`.
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
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="size-full animate-spin"
      >
        <circle
          cx="8"
          cy="8"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity="0.25"
        />
        <path
          d="M8 1.5A6.5 6.5 0 0 1 14.5 8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
