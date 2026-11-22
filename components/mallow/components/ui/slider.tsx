"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { focusRing, primaryFinish, optionTrack } from "./_shared";

/**
 * Mallow Slider: a lilac option track. The filled part and the knob carry
 * the primary Button's violet finish, and the knob's drop lifts it off the
 * fill, so dragging it reads as moving the primary button.
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
      className={cn("relative h-2 w-full grow overflow-hidden rounded-full", optionTrack)}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        className="absolute h-full rounded-full bg-(image:--violet-face)"
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-6 cursor-grab rounded-full active:cursor-grabbing",
        primaryFinish,
        "transition-[scale,box-shadow] duration-fast ease-(--ease-out) active:scale-95 motion-reduce:active:scale-100",
        focusRing,
        "disabled:pointer-events-none",
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
