"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

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
        "bg-input [box-shadow:var(--shadow-well)]"
      )}
    >
      {/* Range fill reuses the primary Button accent material. */}
      <SliderPrimitive.Range className="absolute h-full [background:var(--accent-fill)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.2)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full",
        "[background:var(--accent-fill)] [box-shadow:var(--shadow-accent)]",
        "transition-[box-shadow] duration-fast",
        "hover:[box-shadow:var(--shadow-accent-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
