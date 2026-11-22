"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// ThinkingIndicator: animated status indicator with a morphing SVG and
// rotating word labels. Muted-foreground glyph, semantic tokens only.
//
// Usage:
//   <ThinkingIndicator />
//   <ThinkingIndicator words={["Searching", "Reading", "Writing"]} />

const circleA =
  "M 12 8 C 14.21 8 16 9.79 16 12 C 16 14.21 14.21 16 12 16 C 9.79 16 8 14.21 8 12 C 8 9.79 9.79 8 12 8 Z"
const infinity =
  "M 12 12 C 14 8.5 19 8.5 19 12 C 19 15.5 14 15.5 12 12 C 10 8.5 5 8.5 5 12 C 5 15.5 10 15.5 12 12 Z"
const circleB =
  "M 12 16 C 14.21 16 16 14.21 16 12 C 16 9.79 14.21 8 12 8 C 9.79 8 8 9.79 8 12 C 8 14.21 9.79 16 12 16 Z"

const DEFAULT_WORDS = ["Thinking", "Planning", "Refining", "Generating"]

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[]
  intervalMs?: number
}

function ThinkingIndicator({
  words = DEFAULT_WORDS,
  intervalMs = 4000,
  className,
  ...props
}: ThinkingIndicatorProps) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs])

  const widest = React.useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [words]
  )

  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 text-muted-foreground",
        className
      )}
      {...props}
    >
      <motion.svg
        aria-hidden
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <motion.path
          d={circleA}
          initial={{ d: circleA }}
          animate={{ d: [circleA, infinity, circleB, infinity, circleA] }}
          transition={{
            d: {
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.25, 0.5, 0.75, 1.0],
            },
          }}
        />
      </motion.svg>
      <span className="inline-grid overflow-hidden text-[0.8125rem] font-medium">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {widest}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            className="col-start-1 row-start-1 text-foreground"
            initial={{ y: "80%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
            }}
            exit={{
              y: "-80%",
              opacity: 0,
              transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

export { ThinkingIndicator }
export type { ThinkingIndicatorProps }
