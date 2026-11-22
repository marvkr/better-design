import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Skeleton.
 *
 * A placeholder is the inner surface at the row radius, pulsing slowly. It
 * carries the inset shadow rather than a raised one, because loading content
 * sits in the card, not on top of it.
 */

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-pulse rounded-[0.75rem] bg-[var(--inner)]",
      "[box-shadow:var(--shadow-inset)]",
      className,
    )}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }
