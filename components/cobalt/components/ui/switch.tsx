"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/*
 * Switch — off: a recessed well track with a raised bezel thumb riding in it.
 * On: the track adopts the exact cobalt button material (gradient, cyan rim,
 * blue bloom) so the checked state and the primary button read as one metal.
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "group/switch peer inline-flex h-5.5 w-9.5 shrink-0 cursor-pointer items-center rounded-full border border-border p-0.5",
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background-color,box-shadow,border-color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-transparent",
      "data-[state=checked]:[background-image:var(--cobalt)]",
      "data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full",
        "bg-foreground/90 [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0_/_0.35),0_0.0625rem_0.125rem_oklch(0_0_0_/_0.5)]",
        "data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary-foreground",
        "data-[state=unchecked]:translate-x-0",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
