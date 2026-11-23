"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Frosted Glass Switch — track is empty glass; checked lights up with the same
// glass material as the primary Button (--fg-shadow rim + glow). Thumb is a
// glossy glass orb with a 45deg specular highlight.

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "group/switch peer inline-flex h-[1.875rem] w-[3.25rem] shrink-0 cursor-pointer items-center rounded-full",
      "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)]",
      "border border-[color:var(--fg-border)]",
      "shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.35)]",
      "transition-all duration-slow",
      "hover:bg-[var(--fg-fill-hover)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:bg-[var(--fg-fill-hover)] data-[state=checked]:shadow-[var(--fg-shadow)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-[1.375rem] w-[1.375rem] rounded-full",
        "bg-[radial-gradient(circle_at_35%_30%,oklch(1_0_0),oklch(1_0_0/0.85)_55%,oklch(0.9_0.02_285/0.7))]",
        "shadow-[0_0_0.625rem_oklch(1_0_0/0.3),0_0.0625rem_0.1875rem_oklch(0_0_0/0.35)]",
        "data-[state=unchecked]:translate-x-[0.1875rem]",
        "data-[state=checked]:translate-x-[1.4375rem]",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none",
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
