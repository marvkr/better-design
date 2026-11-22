"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/*
 * Bevel Progress.
 *
 * The empty track is a well pressed into the card, the same one the Slider and
 * the Switch sit in. The filled bar takes the primary Button's gradient and
 * rim, so anything that reads as "on" in this system shares one surface.
 */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full",
      "bg-[var(--inner)] [box-shadow:var(--shadow-inset)]",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "size-full flex-1 rounded-full",
        "bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
        "[box-shadow:var(--shadow-primary)]",
        "transition-transform duration-slow ease-out",
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
