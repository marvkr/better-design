"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

// Gauge Dark Slider.
// Track: recessed well (same material as inputs). Range: the machined gold
// gradient with its top bevel, the primary Button's fill laid into the well.
// Thumb: gold-rimmed raised cap sharing the button's bevel + glow.

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
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border border-[var(--gauge-well-border)] bg-input shadow-[var(--shadow-well)]">
      <SliderPrimitive.Range className="absolute h-full bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.35)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full",
        "border border-[var(--gauge-rim)]",
        "bg-[linear-gradient(to_bottom,oklch(0.97_0.02_88),var(--gauge-grad-top))]",
        "shadow-[var(--shadow-primary)]",
        "transition-shadow duration-fast ease-out",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-primary),var(--shadow-focus)]",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
