"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

/**
 * Heyclicky Switch — the pill, laid on its side.
 *
 * The off track is a quiet silver channel. The on track is the button's own
 * blue gradient with the same gloss and throw, and the knob is the white
 * window body riding on top of it.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "border border-transparent bg-secondary shadow-[var(--shadow-inset)]",
      "transition-[background,box-shadow] duration-base ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-45",
      "data-[state=checked]:bg-[image:var(--gradient-primary)] data-[state=checked]:shadow-[var(--shadow-control)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-card",
        "shadow-[0_0.0625rem_0.1875rem_oklch(0_0_0_/_0.24)]",
        "ring-0 transition-transform duration-base ease-out",
        "data-[state=checked]:translate-x-5",
        "data-[state=unchecked]:translate-x-0.5",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
