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
  <div className="inline-flex p-px rounded-full bg-[linear-gradient(165deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.16)_20%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.08)_80%,rgba(255,255,255,0.21)_100%)]">
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-[30px] w-[52px] shrink-0 cursor-pointer items-center rounded-full",
        "bg-transparent",
        "border border-white/[0.15]",
        "shadow-[inset_0_0_8px_rgba(255,255,255,0.15)]",
        "transition-all duration-300",
        "hover:bg-white/[0.1]",
        "focus-visible:outline-none focus-visible:shadow-[inset_0_0_8px_rgba(255,255,255,0.15),0_0_0_2px_rgba(255,255,255,0.5)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "data-[state=checked]:bg-white/[0.1]",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-[22px] w-[22px] rounded-full",
          "bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,1),rgba(255,255,255,0.8)_60%,rgba(220,225,240,0.7))]",
          "shadow-[0_0_10px_rgba(255,255,255,0.35),0_1px_3px_rgba(0,0,0,0.3)]",
          "transition-transform duration-300",
          "data-[state=unchecked]:translate-x-[3px]",
          "data-[state=checked]:translate-x-[23px]",
        )}
      />
    </SwitchPrimitive.Root>
  </div>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
