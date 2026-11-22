"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Midnight Glass Switch — exact same glass treatment as the button
// Outer: prismatic gradient border ring
// Track: transparent + border-white/[0.15] + inset white glow (identical to .glass-btn)
// Thumb: radial gradient glass orb with white glow

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="inline-flex p-px rounded-full bg-[linear-gradient(165deg,oklch(1_0_0/0.42)_0%,oklch(1_0_0/0.16)_20%,oklch(1_0_0/0.03)_50%,oklch(1_0_0/0.08)_80%,oklch(1_0_0/0.21)_100%)]">
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-[1.875rem] w-[3.25rem] shrink-0 cursor-pointer items-center rounded-full",
        "bg-transparent",
        "border border-white/[0.15]",
        "shadow-[inset_0_0_0.5rem_oklch(1_0_0/0.15)]",
        "transition-all duration-slow",
        "hover:bg-white/[0.1]",
        "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.5rem_oklch(1_0_0/0.15),0_0_0_0.125rem_oklch(1_0_0/0.5)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "data-[state=checked]:bg-white/[0.15] data-[state=checked]:border-white/[0.25] data-[state=checked]:shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.2),0_0_1rem_oklch(1_0_0/0.08)]",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-[1.375rem] w-[1.375rem] rounded-full",
          "bg-[radial-gradient(circle_at_35%_30%,oklch(1_0_0/1),oklch(1_0_0/0.8)_60%,oklch(0.9_0.012_255/0.7))]",
          "shadow-[0_0_0.625rem_oklch(1_0_0/0.35),0_0.0625rem_0.1875rem_oklch(0_0_0/0.3)]",
          "transition-transform duration-slow",
          "data-[state=unchecked]:translate-x-[0.1875rem]",
          "data-[state=checked]:translate-x-[1.4375rem]",
        )}
      />
    </SwitchPrimitive.Root>
  </div>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
