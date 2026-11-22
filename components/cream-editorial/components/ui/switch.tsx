"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { controlChecked } from "./_shared";

/**
 * Cream editorial Switch: a slim 2.25rem by 1.25rem track in a warm grey
 * line colour with a white knob. On, the track fills flat terracotta, the
 * same material as the primary button, and the knob slides across.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      "peer group/switch inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-(--line-strong) p-0.5",
      "transition-colors duration-fast ease-out",
      "hover:data-[state=unchecked]:bg-(--control)",
      "outline-none focus-visible:ring-3 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:bg-muted",
      controlChecked,
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block size-4 rounded-full bg-(--thumb) shadow-(--shadow-thumb)",
        "transition-transform duration-fast ease-out motion-reduce:transition-none",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "group-disabled/switch:shadow-none",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
