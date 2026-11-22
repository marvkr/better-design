"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing, wellInset } from "./_shared";

/**
 * Burnished Switch: the off track is a recessed well with a graphite bevel
 * knob. On, the track turns to the primary's cream bevel and the knob
 * brightens inside a copper rim, so it still stands out on the cream.
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
      wellInset,
      controlChecked,
      "transition-[box-shadow,background-image] duration-base ease-(--ease-out)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-6 rounded-full border-2 border-transparent",
        "bg-(image:--fill-raised) shadow-(--bevel-raised)",
        "data-[state=checked]:[background:var(--fill-primary-hover)_padding-box,var(--ring-sheen)_border-box,conic-gradient(var(--ring-flow))_border-box]",
        "transition-transform duration-base ease-(--ease-out)",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
