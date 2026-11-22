"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Ledger Light Switch — recessed muted track when off; checked track becomes
// the primary blue chip (same rim + soft glow as the Button).

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "border border-transparent",
      "transition-all duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-muted data-[state=unchecked]:shadow-[var(--shadow-inset)]",
      "data-[state=checked]:bg-primary data-[state=checked]:border-[var(--primary-rim)]",
      "data-[state=checked]:shadow-[var(--shadow-primary-control)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-card shadow-[var(--shadow-soft)] ring-0",
        "transition-transform duration-fast",
        "data-[state=unchecked]:translate-x-0.5",
        "data-[state=checked]:translate-x-[1.125rem]"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
