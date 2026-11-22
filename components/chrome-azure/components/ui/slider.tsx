"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Slider — a recessed steel channel; the filled range is the
 * azure alloy and the thumb is a raised chrome knob with a wet sheen, matching
 * the switch.
 */

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full border border-white/10",
        "bg-input [box-shadow:var(--shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full [background:var(--surface-on)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "relative block h-4 w-4 overflow-hidden rounded-full [background:var(--knob-off)]",
        "[box-shadow:var(--shadow-knob)]",
        "transition-[transform] duration-fast hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    >
      <span aria-hidden className="absolute inset-0 rounded-full [background:var(--gloss-top)]" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
