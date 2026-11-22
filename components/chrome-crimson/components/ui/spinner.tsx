import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Spinner — a quiet brushed loading ring that spins in muted
 * steel. Inline SVG, stroke tracks currentColor.
 */

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "default" | "lg"
}

const sizes = {
  sm: "h-3.5 w-3.5",
  default: "h-4 w-4",
  lg: "h-6 w-6",
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin text-muted-foreground", sizes[size])}
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </span>
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
