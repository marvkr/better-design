"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useDataState, springInteraction } from "@/lib/motion"

// Clay Product Radio, ring is a recessed clay well; the selected DOT reuses the
// primary Button's exact clay material (blue oklch gradient + --shadow-clay-primary-sm).

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cn("grid gap-2.5", className)} {...props} />
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
        "aspect-square h-5 w-5 rounded-full border border-border bg-input ring-offset-background transition-all",
        "[box-shadow:var(--shadow-clay-inset)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator forceMount className="relative flex items-center justify-center">
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              key="dot"
              className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))] [box-shadow:var(--shadow-clay-primary-sm)]"
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
