"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * TV Style Cursor — split-flap scramble typewriter.
 * Each character briefly cycles through random scramble characters (like the
 * character-plate flips on a mechanical airport board) before settling on
 * the target glyph. Uppercase Helvetica with a blinking amber caret.
 *
 * Reference: magnum6actual/flipoff `Tile.js` scramble loop.
 */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,-!?"
const SCRAMBLE_TICKS_PER_CHAR = 4
const TICK_MS = 35

export interface CursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string
  speed?: number
  loop?: boolean
  pauseMs?: number
}

const pickScramble = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]

const Cursor = React.forwardRef<HTMLSpanElement, CursorProps>(
  ({ className, text, speed = 60, loop = false, pauseMs = 1500, ...props }, ref) => {
    const upper = text.toUpperCase()
    const [revealed, setRevealed] = React.useState(0)
    const [scramble, setScramble] = React.useState("")
    const [phase, setPhase] = React.useState<"typing" | "paused" | "deleting">("typing")

    // Scramble the next character for a few ticks before committing it.
    React.useEffect(() => {
      if (phase !== "typing" || revealed >= upper.length) return
      let tick = 0
      const id = setInterval(() => {
        tick += 1
        if (tick >= SCRAMBLE_TICKS_PER_CHAR) {
          setScramble("")
          setRevealed((r) => r + 1)
          clearInterval(id)
        } else {
          setScramble(pickScramble())
        }
      }, Math.max(TICK_MS, speed / SCRAMBLE_TICKS_PER_CHAR))
      return () => clearInterval(id)
    }, [phase, revealed, upper, speed])

    // Phase transitions: typing → paused → (optionally) deleting → typing.
    React.useEffect(() => {
      if (phase === "typing" && revealed >= upper.length) {
        if (loop) {
          const t = setTimeout(() => setPhase("deleting"), pauseMs)
          return () => clearTimeout(t)
        }
        setPhase("paused")
      }
      if (phase === "deleting") {
        if (revealed > 0) {
          const t = setTimeout(() => setRevealed((r) => r - 1), speed / 2)
          return () => clearTimeout(t)
        }
        setPhase("typing")
      }
    }, [phase, revealed, upper.length, loop, pauseMs, speed])

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-baseline font-mono font-bold uppercase tracking-[0.08em]",
          className
        )}
        aria-label={text}
        {...props}
      >
        <span>{upper.slice(0, revealed)}</span>
        {phase === "typing" && scramble && (
          <span className="text-[var(--tv-amber)]">{scramble}</span>
        )}
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary"
        />
      </span>
    )
  }
)
Cursor.displayName = "Cursor"

export { Cursor }
