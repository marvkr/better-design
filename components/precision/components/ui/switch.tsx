"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Precision Switch - checked track reuses the primary Button material:
// solid blue fill, 1px outer ring, faint inset top highlight.

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "group/switch peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-input data-[state=unchecked]:border-border",
        "data-[state=checked]:bg-primary",
        "data-[state=checked]:shadow-[0_0_0_0.0625rem_oklch(0.5_0.18_268),0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.12),inset_0_0.0625rem_0_oklch(1_0_0/0.16)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-[0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.2)] ring-0",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
          "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
        )}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
