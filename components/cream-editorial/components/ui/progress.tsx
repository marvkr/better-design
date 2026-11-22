"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Progress: a slim oat track with a flat terracotta fill
 * that grows from the start. The fill eases over 150ms as the value moves
 * and holds still for readers who ask for reduced motion.
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
        "relative h-1.5 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-primary transition-[width] duration-fast ease-out motion-reduce:transition-none"
        style={{ width: `${percent}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
