"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/*
 * The Range fill and the thumb wear the primary Button's champagne material
 * (--champagne + --shadow-primary). The track is a recessed velvet well.
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
      <SliderPrimitive.Range className="absolute h-full [background-image:var(--champagne)] [box-shadow:var(--shadow-primary)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full [background-image:var(--champagne)]",
        "[box-shadow:var(--shadow-primary)]",
        "transition-[box-shadow,filter] duration-fast",
        "hover:brightness-[1.03]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
