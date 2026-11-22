"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/*
 * Slider — a carved groove (recessed well track) filled with the exact
 * cobalt button material; the thumb is a raised bezel knob with the same
 * cyan rim so it reads as the control that pushes the liquid.
 */

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
        "relative h-2 w-full grow overflow-hidden rounded-full border border-border",
        "bg-input [box-shadow:var(--shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full [background-image:var(--cobalt)] [box-shadow:var(--shadow-primary)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4.5 w-4.5 rounded-full border border-border",
        "[background-image:var(--bezel)]",
        "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0_/_0.18),inset_0_0_0_0.0625rem_oklch(0.75_0.12_235_/_0.25),0_0.0625rem_0.125rem_oklch(0_0_0_/_0.45),0_0.1875rem_0.5rem_oklch(0_0_0_/_0.35)]",
        "transition-[box-shadow] duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
