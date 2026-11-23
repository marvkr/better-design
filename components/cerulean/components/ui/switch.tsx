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
      "group/switch peer inline-flex h-[1.375rem] w-[2.375rem] shrink-0 cursor-pointer items-center rounded-full",
      "bg-input border border-border [box-shadow:var(--shadow-well)]",
      "transition-[background,box-shadow,border-color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked track reuses the primary Button accent material.
      "data-[state=checked]:border-transparent data-[state=checked]:[background:var(--accent-fill)] data-[state=checked]:[box-shadow:var(--shadow-accent)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-[1.125rem] w-[1.125rem] rounded-full bg-foreground",
        "[box-shadow:0_0_0_0.03125rem_oklch(0_0_0/0.25),0_0.0625rem_0.125rem_oklch(0_0_0/0.4)]",
        "data-[state=checked]:translate-x-[1.125rem]",
        "data-[state=unchecked]:translate-x-0.5",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
