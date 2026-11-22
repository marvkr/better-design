"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Clay Product Slider, recessed clay track; the Range fill + thumb reuse the
// primary Button's exact clay material (blue oklch gradient + --shadow-clay-primary-sm).

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
    <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-input [box-shadow:var(--shadow-clay-inset)]">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))] [box-shadow:var(--shadow-clay-primary-sm)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-transparent bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))] [box-shadow:var(--shadow-clay-primary-sm)] ring-offset-background transition-[filter] hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
