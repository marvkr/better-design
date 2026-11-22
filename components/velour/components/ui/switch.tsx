"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/*
 * The checked track wears the primary Button's champagne material
 * (--champagne + --shadow-primary). Unchecked is a recessed velvet well;
 * the thumb is a small raised velour disc that turns dark on champagne.
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-border",
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background-color,box-shadow,border-color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:[background-image:var(--champagne)] data-[state=checked]:border-transparent data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full",
        "[background-image:var(--velour-hover)] [box-shadow:var(--shadow-s)]",
        "ring-0 transition-transform duration-fast",
        "data-[state=checked]:translate-x-4 data-[state=checked]:[background-image:none] data-[state=checked]:bg-primary-foreground",
        "data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
