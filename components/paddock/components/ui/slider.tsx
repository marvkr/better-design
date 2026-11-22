"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { primaryFace, focusRing, wellInset } from "./_shared";

/**
 * Paddock Slider: a thin recessed grey track. The filled part is the
 * primary Button's teal, and the knob is a round white thumb with a faint
 * drop, so it reads as the one raised part of the control.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider"
    className={cn(
      "relative flex w-full touch-none select-none items-center py-1.5 data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn("relative h-1.5 w-full grow overflow-hidden rounded-xs", wellInset)}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        className={cn("absolute h-full rounded-xs", primaryFace)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-4.5 cursor-grab rounded-full border border-transparent bg-card shadow-(--shadow-thumb) active:cursor-grabbing",
        "transition-transform duration-fast ease-out active:scale-95 motion-reduce:active:scale-100",
        focusRing,
        "disabled:pointer-events-none",
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
