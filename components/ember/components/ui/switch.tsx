"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Amber Glass Switch: recessed well track; checked, the track lights up with
// the same amber material as the primary Button (gradient + rim + glow).

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "transition-all duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-[var(--ag-well)] data-[state=unchecked]:border data-[state=unchecked]:border-[color:var(--ag-border-strong)] data-[state=unchecked]:shadow-[var(--shadow-well)]",
      "data-[state=checked]:bg-[image:var(--ag-primary-grad)] data-[state=checked]:border-0 data-[state=checked]:shadow-[var(--shadow-primary)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full",
        "bg-[oklch(0.97_0.005_85)]",
        "shadow-[0_0.0625rem_0.125rem_oklch(0_0_0/0.4),inset_0_0.0625rem_0_oklch(1_0_0/0.5)]",
        "ring-0 transition-transform duration-fast ease-out",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
