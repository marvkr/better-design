"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing, optionTrack } from "./_shared";

/**
 * Mallow Switch: off, the track is the lilac option track with a 3:1 edge.
 * On, the track takes the primary Button's violet finish. The knob is white
 * with a soft shadow in both states.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5",
      optionTrack,
      "inset-ring-1 inset-ring-foreground/50 data-[state=checked]:inset-ring-transparent",
      controlChecked,
      "transition-[box-shadow,background-color] duration-base ease-(--ease-out)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-6 rounded-full",
        "bg-card shadow-(--shadow-thumb)",
        "transition-transform duration-base ease-(--ease-out)",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
