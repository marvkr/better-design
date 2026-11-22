"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion, useMotionValue, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

// Clay Product Checkbox, unchecked is a soft recessed clay well; CHECKED reuses
// the primary Button's exact clay material (blue oklch gradient + --shadow-clay-primary-sm),
// scaled down, so the filled control reads as the same sculpted blue clay.

function Checkbox({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [isChecked, setIsChecked] = React.useState(
    checked ?? defaultChecked ?? false
  )
  const pathLength = useMotionValue(isChecked ? 1 : 0)
  const strokeLinecap = useTransform(() =>
    pathLength.get() === 0 ? "none" : "round"
  )

  React.useEffect(() => {
    if (checked !== undefined) setIsChecked(!!checked)
  }, [checked])

  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-[var(--radius-sm)] border border-border bg-input ring-offset-background transition-all",
        "[box-shadow:var(--shadow-clay-inset)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-transparent data-[state=checked]:text-primary-foreground",
        "data-[state=checked]:bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))]",
        "data-[state=checked]:[box-shadow:var(--shadow-clay-primary-sm)]",
        className
      )}
      checked={isChecked}
      onCheckedChange={(value) => {
        setIsChecked(!!value)
        onCheckedChange?.(value)
      }}
      asChild
      {...props}
    >
      <motion.button
        className="flex items-center justify-center p-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 14 14"
          className="h-4 w-4"
          fill="none"
          strokeWidth={2.25}
          stroke="currentColor"
          strokeLinejoin="round"
        >
          <motion.path
            d="M2 6l4 4 6-6"
            animate={{ pathLength: isChecked ? 1 : 0 }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: isChecked ? 0.3 : 0.1,
            }}
            style={{ pathLength, strokeLinecap }}
          />
        </svg>
      </motion.button>
    </CheckboxPrimitive.Root>
  )
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
