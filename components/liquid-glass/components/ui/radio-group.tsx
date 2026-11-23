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
        "aspect-square size-[1.375rem] rounded-full border border-foreground/15 bg-(--glass-wash) text-primary-foreground ring-offset-background [box-shadow:var(--shadow-inset)] transition-colors duration-fast data-[state=checked]:border-transparent data-[state=checked]:bg-(--glass-accent) focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator forceMount className="relative flex items-center justify-center">
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              key="dot"
              className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current [box-shadow:var(--shadow-knob)]"
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
