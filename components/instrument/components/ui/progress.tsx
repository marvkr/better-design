"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// Gauge Dark Progress: a level meter. The track is a recessed well; the fill
// is the machined gold material with its top bevel, laid into the well.

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2.5 w-full overflow-hidden rounded-full border border-[var(--gauge-well-border)] bg-input shadow-[var(--shadow-well)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 rounded-full bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.35)] transition-transform duration-slow ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
