"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Neon Vault Switch: a recessed dark track that, when on, takes the hero
// magenta material (gradient + sheen + rim + glow) shared with the primary
// Button. The thumb is a soft raised puck.

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
        "border border-border bg-input [box-shadow:var(--shadow-inset)]",
        "transition-[background,box-shadow,border-color] duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-transparent data-[state=checked]:bg-primary",
        "data-[state=checked]:[background-image:var(--gradient-primary)]",
        "data-[state=checked]:[box-shadow:var(--shadow-button)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-foreground",
          "[box-shadow:0_0.0625rem_0.125rem_oklch(0_0_0/0.45)]",
          "transition-transform duration-fast",
          "data-[state=checked]:translate-x-5.5 data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
