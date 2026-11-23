"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

/*
 * Playdesk Switch — the track is a recessed slot when off and the primary
 * Button's blue gradient when on. The thumb is a white pill with its own float,
 * so it reads as a cap sitting in the groove.
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "group/switch peer inline-flex h-6 w-11 shrink-0 items-center rounded-full",
      "transition-[box-shadow,background-color] duration-base ease-out",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-secondary data-[state=unchecked]:[box-shadow:var(--shadow-track-inset)]",
      "data-[state=checked]:[background-image:var(--fill-primary)]",
      "data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-5 rounded-full bg-card",
        "[box-shadow:0_0.0625rem_0.1875rem_oklch(0_0_0_/_0.25)]",
        "data-[state=checked]:translate-x-[1.375rem] data-[state=unchecked]:translate-x-0.5",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
