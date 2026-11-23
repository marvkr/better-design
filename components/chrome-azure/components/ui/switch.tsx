"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Switch — the signature control. A beveled metal rim frames a
 * glossy specular track; the inner surface swaps from dark steel (off) to azure
 * alloy (on). The thumb is a raised chrome knob with an inset top highlight, a
 * wet sheen across its crown, and a soft drop shadow. Faithful to the reference
 * toggle: rim → track → surface → knob.
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "group/switch group relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-[0.0938rem]",
      "[background:var(--metal-rim)] [box-shadow:var(--shadow-rim)]",
      "transition-[box-shadow] duration-base",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {/* glossy specular track, visible as a thin ring around the surface */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[0.0938rem] rounded-full [background:var(--metal-track)]"
    />
    {/* off surface (dark steel) */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[0.1875rem] rounded-full [background:var(--surface-off)] transition-opacity duration-slow group-data-[state=checked]:opacity-0"
    />
    {/* on surface (azure alloy) */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[0.1875rem] rounded-full [background:var(--surface-on)] opacity-0 transition-opacity duration-slow group-data-[state=checked]:opacity-100"
    />
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none relative z-10 block h-5 w-5 overflow-hidden rounded-full",
        "[background:var(--knob-off)] [box-shadow:var(--shadow-knob)]",
        "translate-x-0.5 data-[state=checked]:translate-x-[1.375rem]",
        "data-[state=checked]:[background:var(--knob-on)]",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full [background:var(--gloss-top)]"
      />
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
