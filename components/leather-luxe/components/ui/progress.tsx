"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Leather Luxe Progress: recessed track, cognac leather fill with sheen.

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2.5 w-full overflow-hidden rounded-full",
      "border border-border bg-well [box-shadow:var(--shadow-well)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 rounded-full",
        "[background-image:var(--gradient-leather)]",
        "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.25),inset_0_-0.0625rem_0.125rem_oklch(0_0_0/0.3)]",
        "transition-transform duration-slow ease-out"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
