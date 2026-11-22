"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

// Hyperline Switch: off = recessed track, on = the raised cyan primary
// material (same gradient + rim + inset highlight as the Button).

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "border border-border/80 bg-input/80 shadow-[var(--hl-shadow-inset)]",
      "transition-all duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-[image:var(--hl-primary-gradient)]",
      "data-[state=checked]:shadow-[var(--hl-shadow-primary-sm)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-foreground",
        "shadow-[0_0.0625rem_0.125rem_oklch(0_0_0/0.35),inset_0_0.0625rem_0_oklch(1_0_0/0.4)]",
        "ring-0 transition-transform duration-fast ease-out",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
        "data-[state=checked]:bg-[oklch(0.98_0.005_220)]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
