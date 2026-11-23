"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

/*
 * Interior Switch — a slot with a key in it, not a pill. The track is a
 * recessed well at 6px radius; the thumb is a 4px-radius cap with a bottom
 * lip. On, the track takes the primary Button's flat ink fill and thumb
 * shadow, so the two controls read as one material. Focus is the outside
 * line, inverted accent on the ink track.
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "group/switch peer inline-flex h-[1.375rem] w-[2.375rem] shrink-0 cursor-pointer items-center rounded-[0.375rem] p-[0.1875rem]",
      "bg-secondary shadow-[var(--shadow-well)]",
      "transition-[background-color,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:shadow-[var(--shadow-well),0_0_0_0.0938rem_var(--ring)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:shadow-[var(--shadow-thumb)]",
      "data-[state=checked]:focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-4 rounded-[0.25rem] bg-card",
        "shadow-[var(--shadow-cap)]",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
