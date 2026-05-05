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
      className="relative h-2 w-full grow overflow-hidden rounded-full backdrop-blur-xl bg-white/[0.08] shadow-[inset_0_0_4px_rgba(255,255,255,0.06)]"
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary/70 shadow-[0_0_8px_oklch(0.65_0.19_250/0.3)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full",
        "bg-white shadow-[0_0_8px_rgba(0,0,0,0.3),0_0_12px_oklch(0.65_0.19_250/0.2)]",
        "transition-[box-shadow] duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "hover:shadow-[0_0_8px_rgba(0,0,0,0.3),0_0_16px_oklch(0.65_0.19_250/0.35)]",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
