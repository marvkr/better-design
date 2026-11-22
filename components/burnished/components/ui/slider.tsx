"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { copperRim, creamBevel, focusRing, wellInset } from "./_shared";

/**
 * Burnished Slider: a groove cut into the page. The filled part is the
 * primary's cream bevel, and the knob is a cream bevel inside a copper rim,
 * so dragging it feels like moving the primary Button along a track.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider"
    className={cn(
      "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn("relative h-2.5 w-full grow overflow-hidden rounded-full", wellInset)}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        className={cn("absolute h-full rounded-full", creamBevel)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-6 cursor-grab rounded-full shadow-(--bevel-primary) active:cursor-grabbing",
        copperRim,
        "transition-transform duration-fast ease-(--ease-out) active:scale-[0.94] motion-reduce:active:scale-100",
        focusRing,
        "disabled:pointer-events-none",
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
