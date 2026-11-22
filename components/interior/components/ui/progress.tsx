"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/*
 * Interior Progress — a 4px-radius track cut into the panel as a well, and a
 * 2px-radius accent fill. Live progress is the system responding to you right
 * now, which is exactly what the accent is for. The fill glides; it never
 * springs past the number it is reporting.
 */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-[0.375rem] w-full overflow-hidden rounded-[0.25rem] bg-secondary",
      "shadow-[var(--shadow-well)]",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="size-full flex-1 rounded-[0.125rem] bg-ring transition-transform duration-slow ease-out"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
