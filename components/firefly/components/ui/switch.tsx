"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { glowControlChecked } from "./_shared";

/**
 * Firefly Switch: a 2.5rem by 1.5rem warm track with a white knob on a
 * soft three-layer shadow. On, the track lights up in the primary button's
 * material and the knob slides a full knob-width.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "peer group/switch inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-(--surface-3) p-0.5",
      "transition-[background-color,box-shadow] duration-fast ease-out",
      "hover:data-[state=unchecked]:bg-(--line-strong)",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "disabled:cursor-not-allowed disabled:bg-secondary",
      glowControlChecked,
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-4 rounded-full bg-(--thumb) shadow-(--shadow-thumb)",
        "transition-transform duration-fast ease-out",
        "data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0",
        "group-disabled/switch:bg-muted group-disabled/switch:shadow-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
