"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing } from "./_shared";

/**
 * Bold retail Switch: a 2.75rem by 1.5rem grey track with a round knob.
 * On, the track turns flat black like the primary pill and the knob slides
 * across. The knob always contrasts with the track in both themes.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "group/switch peer group/switch inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-(--line-strong) p-0.5",
      "transition-colors duration-fast ease-out",
      "hover:data-[state=unchecked]:bg-(--control)",
      focusRing,
      "disabled:cursor-not-allowed disabled:bg-secondary",
      controlChecked,
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-5 rounded-full bg-(--thumb) shadow-(--shadow-thumb)",
        "motion-reduce:transition-none",
        "data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0",
        "group-disabled/switch:bg-muted group-disabled/switch:shadow-none",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
