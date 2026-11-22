"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface CursorProps {
  text: string
  label?: string
  color?: string
  speed?: number
  delay?: number
  loop?: boolean
  className?: string
}

function Cursor({
  text,
  label,
  color = "oklch(1 0 0)",
  speed = 60,
  delay = 500,
  loop = false,
  className,
}: CursorProps) {
  const [displayedText, setDisplayedText] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)

  React.useEffect(() => {
    // Track every scheduled timer so cleanup clears all of them, not just the
    // most recently assigned one (the typing chain reschedules continuously).
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms)
      timeouts.push(t)
      return t
    }
    let charIndex = 0

    const startTyping = () => {
      setIsTyping(true)
      setDisplayedText("")
      charIndex = 0

      const typeChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1))
          charIndex++
          schedule(typeChar, speed + Math.random() * 40)
        } else {
          setIsTyping(false)
          if (loop) {
            schedule(() => {
              setDisplayedText("")
              schedule(startTyping, delay)
            }, 2000)
          }
        }
      }

      schedule(typeChar, 100)
    }

    schedule(startTyping, delay)
    return () => timeouts.forEach(clearTimeout)
  }, [text, speed, delay, loop])

  return (
    <div className={cn("relative inline-flex flex-col gap-2", className)}>
      <AnimatePresence>
        {(isTyping || displayedText) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "rounded-xl px-3 py-2 text-sm text-white/90",
              "backdrop-blur-xl bg-white/[0.05] border border-white/[0.08]",
              "shadow-[inset_0_0_0.5rem_oklch(1_0_0/0.07),0_0.25rem_1.5rem_oklch(0_0_0/0.4)]"
            )}
            style={{ minHeight: "36px" }}
          >
            <span>{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[0.125rem] h-[0.875rem] ml-[0.0625rem] align-middle"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {label && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1.5"
        >
          <div
            className="h-2.5 w-2.5 rounded-full shadow-[0_0_0.5rem_oklch(1_0_0/0.4)]"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-medium text-white/50">{label}</span>
        </motion.div>
      )}
    </div>
  )
}

export { Cursor }
export type { CursorProps }
