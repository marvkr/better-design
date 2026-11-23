"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Leather Luxe Switch: a recessed dark track with a raised charcoal knob.
// Checked, the track fills with the cognac leather of the primary Button,
// exactly like the wallet's copper newsletter toggle.

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "group/switch peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "border border-border",
      "transition-[background,box-shadow,border-color] duration-base",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-well data-[state=unchecked]:[box-shadow:var(--shadow-well)]",
      "data-[state=checked]:[background-image:var(--gradient-leather)]",
      "data-[state=checked]:border-[oklch(0.68_0.115_58/0.55)]",
      "data-[state=checked]:[box-shadow:var(--shadow-leather-sm)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full",
        "[background-image:var(--gradient-raised)] border border-highlight",
        "[box-shadow:var(--shadow-raised-sm)]",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
