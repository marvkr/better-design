"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing, wellInset } from "./_shared";

/**
 * Paddock Switch: the off track is the segmented control's recessed grey
 * well with a raised white knob. On, the track fills with the primary
 * Button's teal and the white knob rides to the right.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "group/switch peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-sm p-0.5",
      wellInset,
      "data-[state=unchecked]:shadow-(--control-ring)",
      controlChecked,
      "transition-[box-shadow,background-color] duration-base ease-out",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-4 rounded-xs bg-card shadow-(--segment-lift)",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
