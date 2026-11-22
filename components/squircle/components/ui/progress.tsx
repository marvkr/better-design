"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springStateChange } from "@/lib/motion"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max = 100, ...props }, ref) => {
  const clamped = Math.min(Math.max(value ?? 0, 0), max)
  const percent = max > 0 ? (clamped / max) * 100 : 0
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      max={max}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild>
        <motion.div
          className="h-full w-full flex-1 bg-primary"
          animate={{ x: `-${100 - percent}%` }}
          transition={springStateChange}
          initial={false}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
