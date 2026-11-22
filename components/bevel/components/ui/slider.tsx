"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/*
 * Bevel Slider — the empty track is the track token pressed into the
 * card. The filled range takes the primary Button's gradient and rim, and the
 * thumb is a 22px knob with the button's own drop shadow.
 */

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      "data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--track)]",
        "[box-shadow:var(--shadow-inset)]",
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full rounded-full",
          "bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block size-[1.375rem] rounded-full bg-card",
        "[box-shadow:var(--shadow-button)]",
        "transition-[box-shadow,transform] duration-fast ease-out",
        "hover:[box-shadow:var(--shadow-button-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none",
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
