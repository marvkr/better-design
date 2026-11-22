"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Leather Luxe Slider: a recessed track with a cognac leather range fill
// and a leather thumb, both wearing the primary Button's sheen and rim.

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-2.5 w-full grow overflow-hidden rounded-full",
        "border border-border bg-well [box-shadow:var(--shadow-well)]"
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full",
          "[background-image:var(--gradient-leather)]",
          "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.25),inset_0_-0.0625rem_0.125rem_oklch(0_0_0/0.3)]"
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "relative block h-5 w-5 rounded-full",
        "[background-image:var(--gradient-leather)]",
        "border border-[oklch(0.68_0.115_58/0.55)]",
        "[box-shadow:var(--shadow-leather-sm)]",
        "transition-[filter] duration-base hover:brightness-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
