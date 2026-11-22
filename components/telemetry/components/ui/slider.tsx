"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Control Room Slider: setpoint fader.
// Track is a recessed dark channel; the filled Range carries the primary
// Button's signal-green plate (rim + glow, scaled down) and the thumb is a
// square green cap in the same material.

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
        "relative h-1.5 w-full grow overflow-hidden rounded-xs",
        "border border-border bg-input",
        "[box-shadow:var(--shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full bg-primary",
          "[box-shadow:inset_0_0.0625rem_0_oklch(0.97_0.08_148/0.35),0_0_0.5rem_oklch(0.78_0.21_148/0.35)]"
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-3 rounded-xs bg-primary",
        "[box-shadow:var(--shadow-control)]",
        "transition-shadow duration-fast",
        "hover:[box-shadow:var(--shadow-control-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-40"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
