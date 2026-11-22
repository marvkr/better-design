"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/*
 * Atelier Slider — a recessed near-white track; the filled range and thumb
 * wear the primary button's material (deep green fill, top-light rim, soft
 * green drop via --shadow-primary), so slider and CTA read as one substance.
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
        "relative h-1.5 w-full grow overflow-hidden rounded-full border border-border",
        "bg-input [box-shadow:var(--shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary [box-shadow:var(--shadow-primary)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full bg-primary",
        "[box-shadow:var(--shadow-primary)]",
        "transition-[box-shadow,background-color] duration-fast",
        "hover:bg-primary-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
