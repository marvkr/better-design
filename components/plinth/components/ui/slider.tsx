"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/*
 * Plinth Slider: a recessed groove with an ember range, and a thumb drawn
 * as the editor's upright white marker seated in an ember rim.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex h-5 w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-input [box-shadow:var(--shadow-inset)]">
      <SliderPrimitive.Range className="absolute h-full [background:var(--ember-gradient)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.35)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label={props["aria-label"] ?? "Value"}
      className={cn(
        "block h-5 w-2 cursor-grab rounded-full bg-foreground",
        "[box-shadow:0_0_0_0.0625rem_var(--ember-rim),0_0_0_0.1875rem_var(--groove)]",
        "transition-[box-shadow,scale] duration-fast active:cursor-grabbing motion-safe:active:scale-y-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
