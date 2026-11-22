"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { creamBevel, wellInset } from "./_shared";

/**
 * Burnished Progress: a recessed groove with a cream bevel sliding along
 * it, the same material as the primary button, so progress reads as the
 * primary filling its track.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    data-slot="progress"
    className={cn("relative h-2.5 w-full overflow-hidden rounded-full p-0.5", wellInset, className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full w-full flex-1 rounded-full transition-transform duration-slow ease-(--ease-out)",
        creamBevel,
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
