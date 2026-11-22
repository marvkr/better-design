"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Neon Vault Slider: a recessed dark track with the hero magenta material
// (gradient + sheen + rim + glow, same as the primary Button) on the filled
// range; the thumb is a raised puck with a magenta rim.

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
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border border-border bg-input [box-shadow:var(--shadow-inset)]">
      <SliderPrimitive.Range className="absolute h-full bg-primary [background-image:var(--gradient-primary)] [box-shadow:var(--shadow-button)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full bg-foreground",
        "[box-shadow:0_0_0_0.0625rem_oklch(0.55_0.21_350/0.6),0_0.0625rem_0.1875rem_oklch(0_0_0/0.45),0_0.125rem_0.5rem_oklch(0.65_0.24_350/0.3)]",
        "transition-transform duration-fast hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
