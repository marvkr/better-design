"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

/*
 * Interior Slider — a 4px-radius track cut into the panel as a well, a
 * 2px-radius ink fill, and a cap for a thumb: the same flat ink fill and
 * thumb shadow as the primary Button. A meter should not spring past the
 * number it is reporting, so nothing here overshoots.
 */

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[0.375rem] w-full grow overflow-hidden rounded-[0.25rem] bg-secondary shadow-[var(--shadow-well)]">
      <SliderPrimitive.Range className="absolute h-full rounded-[0.125rem] bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-[1.125rem] w-[0.625rem] rounded-[0.25rem] bg-primary",
        "shadow-[var(--shadow-thumb)]",
        "transition-[box-shadow] duration-fast",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
        "disabled:pointer-events-none disabled:opacity-50",
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
