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
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "backdrop-blur-xl bg-foreground/[0.1]",
      "border border-border",
      "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
      "transition-all duration-base",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-gradient-to-t data-[state=checked]:from-primary data-[state=checked]:to-primary/85 data-[state=checked]:border-primary-foreground/20",
      "data-[state=checked]:shadow-[0_0.125rem_0.25rem_-0.0625rem_color-mix(in_oklch,var(--shade)_30%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.22)]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full",
        "bg-primary-foreground shadow-[0_0.0625rem_0.1875rem_color-mix(in_oklch,var(--shade)_30%,transparent)]",
        "transition-transform duration-base",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
