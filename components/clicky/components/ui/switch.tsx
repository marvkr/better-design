"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

// Clicky Switch — flat toggle, muted when off, primary when on
// Plays click sound on toggle

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, onCheckedChange, ...props }, ref) => {
  const { playClick } = useSound()
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group/switch peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
        "border border-transparent",
        "transition-all duration-base ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-muted data-[state=unchecked]:shadow-[var(--shadow-track-inset)]",
        "data-[state=checked]:bg-primary data-[state=checked]:border-[var(--primary-rim)]",
        "data-[state=checked]:shadow-[var(--shadow-tactile-control)]",
        className
      )}
      onCheckedChange={(checked) => {
        playClick()
        onCheckedChange?.(checked)
      }}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background ring-0",
          "data-[state=unchecked]:translate-x-0.5",
          "data-[state=checked]:translate-x-[1.125rem]",
          "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
        )}
      />
    </SwitchPrimitive.Root>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
