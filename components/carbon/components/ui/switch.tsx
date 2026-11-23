"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "group/switch peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "backdrop-blur-xl bg-white/[0.1]",
      "border border-white/10",
      "shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.08)]",
      "transition-all duration-base",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:border-[oklch(1_0_0_/_0.2)] data-[state=checked]:backdrop-saturate-150",
      "data-[state=checked]:shadow-[var(--shadow-pillow-primary)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full",
        "bg-white shadow-[0_0.0625rem_0.1875rem_oklch(0_0_0/0.3)]",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
