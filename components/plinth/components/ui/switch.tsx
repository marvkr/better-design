"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/*
 * Plinth Switch: a recessed track with a white thumb, like the editor's
 * scene toggles. On, the track takes the ember Button material, scaled down.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "group/switch peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:[background:var(--ember-gradient)] data-[state=checked]:[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4),0_0_0_0.0625rem_var(--ember-rim)]",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block size-4 rounded-full bg-foreground",
        "[box-shadow:0_0_0_0.0625rem_oklch(0_0_0/0.25),0_0.0625rem_0.125rem_oklch(0_0_0/0.4)]",
        "data-[state=checked]:translate-x-[1.125rem] data-[state=unchecked]:translate-x-0.5",
        "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin] duration-[180ms,120ms,0ms] delay-[0ms,0ms,120ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
