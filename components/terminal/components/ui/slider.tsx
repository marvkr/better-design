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
        "relative h-1.5 w-full grow overflow-hidden rounded-sm border border-border",
        "bg-input [box-shadow:var(--shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary [box-shadow:var(--shadow-primary)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-[0.0625rem] border border-transparent bg-primary",
        "[box-shadow:var(--shadow-primary)]",
        "transition-[filter,box-shadow] duration-fast",
        "hover:brightness-110 hover:[box-shadow:var(--shadow-primary),0_0_0.75rem_oklch(0.80_0.15_205_/_0.4)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
