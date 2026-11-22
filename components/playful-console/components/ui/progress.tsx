"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/**
 * Playful console Progress: a chunky cream track with a firm olive edge,
 * filled from the start with the orange of the primary button. The fill
 * grows over 200ms as the value moves.
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
        "relative h-2.5 w-full overflow-hidden rounded-full border border-(--line-strong) bg-(--surface-3)",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full bg-primary transition-[width] duration-base ease-out"
        style={{ width: `${percent}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
