import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Spinner.
 *
 * One Solar glyph turning at three sizes, tinted with the accent so a pending
 * action matches the button that started it. The wrapper reports `status` to a
 * screen reader, because the animation alone says nothing.
 */

/** Props for `Spinner`; `size` steps 14px, 16px and 22px. */
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "default" | "lg"
}

const sizes = {
  sm: "size-[0.875rem]",
  default: "size-4",
  lg: "size-[1.375rem]",
} as const

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <Icon
        icon="solar:refresh-linear"
        className={cn("animate-spin text-primary", sizes[size])}
      />
    </span>
  ),
)
Spinner.displayName = "Spinner"

export { Spinner }
