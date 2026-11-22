"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springInteraction } from "@/lib/motion"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-muted p-0.5 transition-[background-color,box-shadow] focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:[box-shadow:var(--shadow-primary)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb asChild>
        <motion.span
          layout
          transition={springInteraction}
          className="pointer-events-none block h-5 w-5 rounded-full bg-background [box-shadow:var(--shadow-thumb)] data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}

export { Switch }
