"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Ledger Light Slider — recessed muted track, primary-blue range fill, and a
// thumb that reuses the primary Button's material (rim + soft blue glow).

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
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted shadow-[var(--shadow-inset)]">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-primary border border-[var(--primary-rim)] shadow-[var(--shadow-primary-control)] transition-all duration-fast ease-out focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 hover:shadow-[var(--shadow-primary-hover)]" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
