"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Bevel ThinkingIndicator.
 *
 * A chip pressed into the card, with the three dots iOS uses while a message
 * is on its way. The dots ride the accent and lift in sequence; the label
 * beside them swaps on a timer, sliding up out of a fixed slot so the chip
 * never changes width mid-sentence.
 */

const DEFAULT_WORDS = ["Thinking", "Planning", "Refining", "Generating"]

/** Props for `ThinkingIndicator`; `words` rotate every `intervalMs`. */
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
    [words],
  )

  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-3.5 py-2",
        "bg-[var(--inner)] [box-shadow:var(--shadow-inset)]",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-[0.3125rem] rounded-full bg-primary"
            animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot * 0.15,
            }}
          />
        ))}
      </span>
      <span className="inline-grid overflow-hidden text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem]">
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
