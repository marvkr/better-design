"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked } from "./_shared";

/**
 * Playful console Switch: a 2.5rem cream track with a firm olive edge and a
 * white knob that sits on its own thin slab. On, the track becomes the
 * orange key, with the primary button's rim and slab, and the knob slides
 * across.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "peer group/switch inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-[0.09375rem] border-(--line-strong) bg-(--surface-3) p-0.5",
      "transition-[background-color,border-color,box-shadow] duration-fast ease-out",
      "hover:data-[state=unchecked]:border-(--control)",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "disabled:cursor-not-allowed disabled:bg-secondary",
      controlChecked,
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-4 rounded-full border-[0.09375rem] border-(--line-strong) bg-(--thumb) shadow-(--shadow-thumb)",
        "transition-[translate,border-color] duration-fast ease-out",
        "data-[state=checked]:translate-x-4 data-[state=checked]:border-(--primary-rim) data-[state=unchecked]:translate-x-0",
        "group-disabled/switch:bg-muted group-disabled/switch:shadow-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
