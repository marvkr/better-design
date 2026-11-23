"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Cursor: a typing readout. The text types into a recessed well with
 * an ember caret; an optional name tag sits under it like a collaborator's
 * pointer label on the canvas.
 */

export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string
  label?: string
  color?: string
  speed?: number
  delay?: number
  loop?: boolean
  pauseMs?: number
}

const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  (
    { className, text, label, color = "var(--primary)", speed = 60, delay = 300, loop = false, pauseMs = 1500, ...props },
    ref
  ) => {
    const [count, setCount] = React.useState(0)
    const [phase, setPhase] = React.useState<"waiting" | "typing" | "holding" | "deleting">("waiting")

    React.useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | undefined
      if (phase === "waiting") timer = setTimeout(() => setPhase("typing"), delay)
      else if (phase === "typing") {
        if (count < text.length) timer = setTimeout(() => setCount((n) => n + 1), speed)
        else if (loop) timer = setTimeout(() => setPhase("deleting"), pauseMs)
        else setPhase("holding")
      } else if (phase === "deleting") {
        if (count > 0) timer = setTimeout(() => setCount((n) => n - 1), speed / 2)
        else setPhase("typing")
      }
      return () => clearTimeout(timer)
    }, [count, phase, text, speed, delay, loop, pauseMs])

    return (
      <span ref={ref} className={cn("inline-flex flex-col items-start gap-2", className)} {...props}>
        <span
          aria-label={text}
          className="inline-flex min-h-9 items-center rounded-lg bg-input px-3 py-1.5 font-mono text-sm text-foreground [box-shadow:var(--shadow-inset)]"
        >
          <span aria-hidden="true">{text.slice(0, count)}</span>
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[1.1em] w-[0.125rem] rounded-full motion-safe:animate-pulse motion-safe:[animation-duration:1s]"
            style={{ backgroundColor: color }}
          />
        </span>
        {label && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary py-0.5 pl-1.5 pr-2 [box-shadow:var(--shadow-button)]">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-mono text-[0.6875rem] text-secondary-foreground">{label}</span>
          </span>
        )}
      </span>
    )
  }
)
Cursor.displayName = "Cursor"

export { Cursor }
