"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

// Clay Product Switch, unchecked track is a recessed clay well; CHECKED track
// reuses the primary Button's exact clay material (blue oklch gradient +
// --shadow-clay-primary-sm). The thumb is a raised pillowy clay knob.

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "group/switch peer inline-flex h-[1.625rem] w-[2.875rem] shrink-0 cursor-pointer items-center rounded-full border border-border transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-input data-[state=unchecked]:[box-shadow:var(--shadow-clay-inset)]",
        "data-[state=checked]:border-transparent",
        "data-[state=checked]:bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))]",
        "data-[state=checked]:[box-shadow:var(--shadow-clay-primary-sm)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb asChild>
        <span
          className="pointer-events-none block h-[1.25rem] w-[1.25rem] rounded-full bg-[linear-gradient(180deg,oklch(1_0_0),oklch(0.96_0.01_94))] [box-shadow:var(--shadow-clay-sm)] ring-0 data-[state=checked]:translate-x-[1.3125rem] data-[state=unchecked]:translate-x-[0.125rem] origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}

export { Switch }
