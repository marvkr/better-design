"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/* Range fill + thumb accent reuse the primary Button's neon material. */
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
        "bg-input [box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full [background:var(--neon-gradient)] [box-shadow:0_0_0.625rem_-0.0625rem_oklch(0.86_0.22_145_/_0.5)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border-2 border-primary [background:var(--neon-gradient)]",
        "[box-shadow:var(--shadow-neon)]",
        "transition-[box-shadow] duration-fast",
        "hover:[box-shadow:var(--shadow-neon-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
