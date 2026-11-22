"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useDataState, springInteraction } from "@/lib/motion"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} />
  )
}
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const dataState = useDataState(ref)
  const isSelected = dataState === "checked"

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-border text-foreground/90 ring-offset-background [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-transparent data-[state=checked]:bg-[var(--glass-strong)] data-[state=checked]:shadow-[inset_0_0.0938rem_0_oklch(1_0_0_/_0.75),inset_0_-0.0938rem_0_oklch(1_0_0_/_0.25),0_0.0625rem_0.125rem_oklch(0_0_0_/_0.06),0_0.25rem_0.625rem_oklch(0_0_0_/_0.08)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator forceMount className="relative flex items-center justify-center">
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              key="dot"
              className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={springInteraction}
            />
          )}
        </AnimatePresence>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
