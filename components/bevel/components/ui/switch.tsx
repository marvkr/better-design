"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/*
 * Bevel Switch — the off track is a well pressed into the card. The on
 * track takes the primary Button's gradient, rim and inset highlight, so the
 * switch and the button share one surface. The thumb is a 22px knob at the
 * iOS proportion.
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "group/switch peer inline-flex h-[1.6875rem] w-[2.875rem] shrink-0 cursor-pointer items-center rounded-full bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "transition-[box-shadow,background-image] duration-base ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block size-[1.375rem] rounded-full bg-card",
        "[box-shadow:var(--shadow-sm)]",
        "data-[state=checked]:translate-x-[1.3125rem] data-[state=unchecked]:translate-x-[0.1563rem]",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
