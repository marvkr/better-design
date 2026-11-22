import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Spinner: a thin pale ring with one arc in full ink,
 * turning slowly in the colour of the text around it. Inside a button it
 * takes the button's type colour; on its own, give it terracotta with
 * `text-(--primary-text)`.
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
        "inline-flex shrink-0 text-current",
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
        className="size-full animate-spin motion-reduce:animate-[spin_2.4s_linear_infinite]"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.18"
        />
        <path
          d="M10 2a8 8 0 0 1 8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
