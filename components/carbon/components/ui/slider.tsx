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
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-2 w-full grow overflow-hidden rounded-full backdrop-blur-xl bg-white/[0.08] shadow-[inset_0_0_0.25rem_oklch(1_0_0/0.06)]"
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary shadow-[var(--shadow-pillow-primary)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full",
        "bg-white shadow-[0_0_0.5rem_oklch(0_0_0/0.3),0_0_0.75rem_oklch(0.65_0.19_250/0.2)]",
        "transition-[box-shadow] duration-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "hover:shadow-[0_0_0.5rem_oklch(0_0_0/0.3),0_0_1rem_oklch(0.65_0.19_250/0.35)]",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
