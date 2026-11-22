"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Control Room Progress: gauge bar.
// Recessed dark channel with a glowing signal-green fill, like the
// percentage readouts on the system health matrix.

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-xs",
      "border border-border bg-input",
      "[box-shadow:var(--shadow-inset)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-primary",
        "[box-shadow:inset_0_0.0625rem_0_oklch(0.97_0.08_148/0.35),0_0_0.5rem_oklch(0.78_0.21_148/0.4)]",
        "transition-all"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
