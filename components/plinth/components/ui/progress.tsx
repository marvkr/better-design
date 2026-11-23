"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/* Plinth Progress: a recessed groove that fills with the ember material,
   like a render bar in the export panel. */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-input [box-shadow:var(--shadow-inset)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 rounded-full [background:var(--ember-gradient)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.35)] transition-transform duration-slow ease-out motion-reduce:transition-none"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
