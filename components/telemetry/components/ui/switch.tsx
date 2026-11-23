"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Control Room Switch: breaker toggle.
// Off: recessed dark track. On: the track adopts the primary Button's
// signal-green plate (rim + highlight + glow, scaled down). The thumb is a
// near-black slug so the energized track reads as the lit element.

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "group/switch peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-sm",
      "border border-border bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "transition-all duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-primary",
      "data-[state=checked]:[box-shadow:var(--shadow-control)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-3.5 rounded-xs",
        "bg-muted-foreground shadow-[0_0.0625rem_0.125rem_oklch(0_0_0/0.5)]",
        "data-[state=unchecked]:translate-x-0.5",
        "data-[state=checked]:translate-x-[1.125rem] data-[state=checked]:bg-primary-foreground",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
