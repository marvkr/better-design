"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Frosted Glass Slider — empty glass track; the Range fill lights up with the
// same glass material as the primary Button. Thumb is a glossy specular orb.

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
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)] shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.3)]">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--fg-fill-hover)] shadow-[var(--fg-shadow)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(1_0_0),oklch(1_0_0/0.85)_55%,oklch(0.9_0.02_285/0.7))] shadow-[0_0_0.625rem_oklch(1_0_0/0.3),0_0.0625rem_0.1875rem_oklch(0_0_0/0.35)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 hover:scale-110" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
