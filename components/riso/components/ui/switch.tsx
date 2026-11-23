"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Retro-Playful Switch — checked track is a poster-blue slab matching the
// primary Button (same fill + chunky ink border-2 + hard offset). The thumb is a
// paper knob with its own ink border, like a cut-out sticker.

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "group/switch peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-border transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-secondary",
        "data-[state=checked]:bg-primary data-[state=checked]:shadow-[var(--shadow-hard-sm)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full border-2 border-border bg-card ring-0",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
          "origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
        )}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
