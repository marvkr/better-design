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
      className="relative h-2 w-full grow overflow-hidden rounded-full backdrop-blur-xl bg-foreground/[0.08] shadow-[inset_0_0_0.25rem_color-mix(in_oklch,var(--halo)_6%,transparent)]"
    >
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-t from-primary to-primary/85 shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.22)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full",
        "bg-primary-foreground border border-foreground/20",
        "shadow-[0_0.125rem_0.25rem_-0.0625rem_color-mix(in_oklch,var(--shade)_35%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.5)]",
        "transition-[box-shadow] duration-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "hover:shadow-[0_0.1875rem_0.375rem_-0.0625rem_color-mix(in_oklch,var(--shade)_40%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.5)]",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
