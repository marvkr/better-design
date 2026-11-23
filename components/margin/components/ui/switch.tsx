"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing, slotWell } from "./_shared";

/**
 * Margin Switch: the small settings switch from a sidebar footer. Off, the
 * track is a grey slot behind a firmer hairline; on, it takes the primary
 * Button's oxblood face and edge. The white knob slides across with a short
 * ease and a soft shadow under it.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "group/switch peer inline-flex h-4.5 w-7.5 shrink-0 cursor-pointer items-center rounded-full p-0.5",
      slotWell,
      controlChecked,
      "transition duration-base ease-(--ease-out)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-3.5 rounded-full bg-primary-foreground shadow-(--shadow-thumb)",
        "data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
