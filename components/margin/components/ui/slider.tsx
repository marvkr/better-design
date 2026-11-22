"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { oxFace, oxHairline, focusRing, slotWell } from "./_shared";

/**
 * Margin Slider: a thin grey slot behind a hairline. The filled part wears
 * the primary Button's oxblood face, and the knob is the same small white knob
 * as the Switch, with a soft shadow and an oxblood edge.
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
      className={cn("relative h-1.5 w-full grow overflow-hidden rounded-full", slotWell)}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        className={cn("absolute h-full rounded-full", oxFace)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-4 cursor-grab rounded-full bg-primary-foreground active:cursor-grabbing",
        oxHairline,
        "transition-transform duration-fast ease-(--ease-out) active:scale-110 motion-reduce:active:scale-100",
        focusRing,
        "disabled:pointer-events-none",
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
