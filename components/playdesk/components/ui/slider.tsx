"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

/*
 * Playdesk Slider — a recessed groove, a blue gradient range that matches the
 * primary Button, and a white cap thumb with the same float as the Switch.
 */

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  // One thumb per value, so a range slider gets both handles instead of one.
  const values = props.value ?? props.defaultValue ?? [0];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary [box-shadow:var(--shadow-track-inset)]">
        <SliderPrimitive.Range className="absolute h-full [background-image:var(--fill-primary)]" />
      </SliderPrimitive.Track>
      {children ??
        values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(
              "block size-5 rounded-full bg-card",
              "[box-shadow:0_0.0625rem_0.1875rem_oklch(0_0_0_/_0.25),var(--shadow-rim)]",
              "transition-[box-shadow] duration-fast ease-out",
              "hover:[box-shadow:0_0.125rem_0.375rem_oklch(0_0_0_/_0.28),var(--shadow-rim)]",
              "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
            )}
          />
        ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
