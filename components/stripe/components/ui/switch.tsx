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
        "group/switch peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-muted p-0.5 transition-[background-color,box-shadow] focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:[box-shadow:var(--shadow-primary)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb asChild>
        <span
          className="pointer-events-none block h-5 w-5 rounded-full bg-background [box-shadow:var(--shadow-thumb)] data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 origin-left data-[state=checked]:origin-right rtl:origin-right rtl:data-[state=checked]:origin-left transition-[translate,scale,transform-origin,background-color,box-shadow] duration-[260ms,140ms,0ms,150ms,150ms] delay-[0ms,0ms,140ms,0ms,0ms] ease-out motion-safe:group-active/switch:scale-x-[1.18] motion-reduce:transition-none"
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}

export { Switch }
