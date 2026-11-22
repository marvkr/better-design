"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/* Checked track reuses the primary Button's neon material, scaled down. */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-[1.375rem] w-[2.5rem] shrink-0 cursor-pointer items-center rounded-full border border-border",
      "bg-input [box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]",
      "transition-[background,box-shadow,border-color] duration-base",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:[background:var(--neon-gradient)] data-[state=checked]:border-transparent",
      "data-[state=checked]:[box-shadow:var(--shadow-neon)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-[1rem] w-[1rem] rounded-full bg-background",
        "[box-shadow:0_0.0625rem_0.125rem_oklch(0_0_0_/_0.5)]",
        "transition-transform duration-base",
        "data-[state=checked]:translate-x-[1.25rem]",
        "data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
