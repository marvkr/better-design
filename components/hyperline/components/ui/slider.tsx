"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

// Hyperline Slider: recessed track; the Range fill and thumb both wear the
// raised cyan primary material so the slider matches the Button.

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full",
        "border border-border/60 bg-input/80 shadow-[var(--hl-shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full bg-[image:var(--hl-primary-gradient)]",
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.35)]"
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full",
        "bg-[image:var(--hl-primary-gradient)] shadow-[var(--hl-shadow-primary-sm)]",
        "transition-shadow duration-fast ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
