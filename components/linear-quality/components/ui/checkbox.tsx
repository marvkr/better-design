"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion, useMotionValue, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

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
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
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
          strokeWidth={2}
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
