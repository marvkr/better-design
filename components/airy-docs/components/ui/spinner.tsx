import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Spinner: a thin open arc turning in the colour of the text
 * around it. Inside a button it takes the button's ink; on a page, give it
 * the green with `text-(--primary-text)`.
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
        size === "sm" && "size-3.5",
        size === "default" && "size-4",
        size === "lg" && "size-6",
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="size-full animate-spin"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.18" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  ),
);
Spinner.displayName = "Spinner";

export { Spinner };
