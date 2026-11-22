"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// neon ThinkingIndicator: animated status indicator with a neon spinner
// and rotating word labels. The motion/react morphing SVG from the reference is
// dropped (banned dep); the active thinking accent is the neon Loader2 spinner.
//
// Usage:
//   <ThinkingIndicator />
//   <ThinkingIndicator words={["Searching", "Reading", "Writing"]} />

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
      <Loader2 aria-hidden className="h-5 w-5 shrink-0 animate-spin text-primary" />
      <span className="inline-grid overflow-hidden text-[0.8125rem] font-medium">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {widest}
        </span>
        <span
          key={words[index]}
          className="col-start-1 row-start-1 text-foreground"
        >
          {words[index]}
        </span>
      </span>
    </div>
  )
}

export { ThinkingIndicator }
export type { ThinkingIndicatorProps }
