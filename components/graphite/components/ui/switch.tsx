"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-[1.375rem] w-[2.375rem] shrink-0 cursor-pointer items-center rounded-full",
      // Unchecked: recessed well pressed into the surface
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_oklch(1_0_0_/_0.2)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked: reuse the primary button material (pill gradient + raised pill shadow)
      "data-[state=checked]:bg-[image:var(--pill-gradient)]",
      "data-[state=checked]:[box-shadow:var(--shadow-pill)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-[1.125rem] w-[1.125rem] rounded-full bg-foreground",
        "[box-shadow:0_0_0_0.03125rem_oklch(0_0_0_/_0.25),0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]",
        "transition-transform duration-fast",
        "data-[state=checked]:translate-x-[1.125rem]",
        "data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
