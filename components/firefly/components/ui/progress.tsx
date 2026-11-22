"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/**
 * Firefly Progress: a 0.5rem rounded track in the deeper warm grey, filled
 * from the start with the flat yellow-green accent, edged by an inset olive
 * line so the fill still reads against the warm track. The fill is never lit:
 * only controls you press glow. It grows over 200ms as the value moves.
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
        "relative h-2 w-full overflow-hidden rounded-full bg-(--surface-3)",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-primary ring-1 ring-inset ring-(--accent-line) transition-[width] duration-base ease-out"
        style={{ width: `${percent}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
