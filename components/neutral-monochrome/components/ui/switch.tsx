"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "group/switch peer inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_0_0.0625rem_oklch(1_0_0/0.12),0_0.0625rem_0.1875rem_oklch(0_0_0/0.5),inset_0_0.0625rem_0_oklch(1_0_0/0.85)] data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb asChild>
        <span
          className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}

export { Switch }
