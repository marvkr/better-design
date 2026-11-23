"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Ink mail Switch: a 2.25rem by 1.25rem track. Off, it is a quiet well inside
 * an inset strong hairline with a grey knob. On, the track takes the off-white
 * primary fill and the knob turns black, the same flat material as the
 * primary button.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "group/switch peer group/switch inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5",
      "transition-[background-color,box-shadow] duration-fast ease-out",
      "data-[state=unchecked]:bg-input data-[state=unchecked]:inset-ring data-[state=unchecked]:inset-ring-(--line-strong)",
      "hover:data-[state=unchecked]:inset-ring-(--control)",
      "data-[state=checked]:bg-primary",
      focusRing,
      "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-muted disabled:data-[state=checked]:inset-ring disabled:data-[state=checked]:inset-ring-(--line-strong)",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-4 rounded-full shadow-(--shadow-thumb)",
        "data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-muted-foreground",
        "data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary-foreground",
        "group-disabled/switch:bg-(--foreground-disabled) group-disabled/switch:shadow-none",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
