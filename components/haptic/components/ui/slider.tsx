"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { useHaptics } from "./haptics-provider"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onValueChange, onValueCommit, ...props }, ref) => {
  const { select, trigger } = useHaptics()
  return (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    onValueChange={(value) => {
      select()
      onValueChange?.(value)
    }}
    onValueCommit={(value) => {
      trigger("rigid")
      onValueCommit?.(value)
    }}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full border border-border",
        "bg-input [box-shadow:var(--shadow-inset)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0_/_0.5),inset_0_-0.0625rem_0_oklch(0_0_0_/_0.22)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border border-border bg-popover",
        "[box-shadow:var(--shadow-m)]",
        "transition-[background-color,box-shadow] duration-fast",
        "hover:[box-shadow:var(--shadow-l)] hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
