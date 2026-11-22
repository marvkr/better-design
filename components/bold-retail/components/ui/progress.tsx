"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/**
 * Bold retail Progress: a thin grey line that fills with flat black from
 * the start, like the free-delivery bar in a bag. The fill grows over
 * 200ms as the value moves, and holds still when motion is reduced.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max = 100, ...props }, ref) => {
  const percent = Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      max={max}
      data-slot="progress"
      className={cn(
        "relative h-1 w-full overflow-hidden rounded-full bg-border",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-primary transition-[width] duration-base ease-out motion-reduce:transition-none"
        style={{ width: `${percent}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
