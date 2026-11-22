"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Amber Glass ThinkingIndicator: cycling status words with an amber shimmer.

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[]
  intervalMs?: number
}

const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  (
    {
      className,
      words = ["Thinking", "Reasoning", "Analyzing", "Working"],
      intervalMs = 1800,
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
      const id = setInterval(() => {
        setIndex((i) => (i + 1) % words.length)
      }, intervalMs)
      return () => clearInterval(id)
    }, [words.length, intervalMs])

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("inline-flex items-center gap-2.5", className)}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_0.5rem_oklch(0.69_0.195_42/0.6)]" />
        </span>
        <span className="relative inline-flex h-5 items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-[linear-gradient(90deg,oklch(0.66_0.012_75),oklch(0.96_0.005_85),oklch(0.66_0.012_75))] bg-[length:200%_100%] bg-clip-text text-sm font-semibold text-transparent [animation:shimmer_2s_linear_infinite]"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
        <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
      </div>
    )
  }
)
ThinkingIndicator.displayName = "ThinkingIndicator"

export { ThinkingIndicator }
export type { ThinkingIndicatorProps }
