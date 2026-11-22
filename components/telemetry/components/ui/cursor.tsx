"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

// Control Room Cursor: live operator feed.
// Types into a console plate chip with a blinking block caret in signal
// green, tagged with a glowing operator lamp.

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
  color = "oklch(0.78 0.21 148)",
  speed = 60,
  delay = 500,
  loop = false,
  className,
}: CursorProps) {
  const [displayedText, setDisplayedText] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let charIndex = 0

    const startTyping = () => {
      setIsTyping(true)
      setDisplayedText("")
      charIndex = 0

      const typeChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1))
          charIndex++
          timeout = setTimeout(typeChar, speed + Math.random() * 40)
        } else {
          setIsTyping(false)
          if (loop) {
            timeout = setTimeout(() => {
              setDisplayedText("")
              timeout = setTimeout(startTyping, delay)
            }, 2000)
          }
        }
      }

      timeout = setTimeout(typeChar, 100)
    }

    timeout = setTimeout(startTyping, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay, loop])

  return (
    <div className={cn("relative inline-flex flex-col gap-2", className)}>
      <AnimatePresence>
        {(isTyping || displayedText) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "rounded-sm px-3 py-2 text-sm text-foreground",
              "border border-border bg-card",
              "[box-shadow:var(--shadow-popover)]"
            )}
            style={{ minHeight: "36px" }}
          >
            <span>{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="ml-0.5 inline-block h-[0.875rem] w-[0.4375rem] align-middle"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 6px ${color}`,
              }}
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
            className="size-2.5 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
          <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </motion.div>
      )}
    </div>
  )
}

export { Cursor }
export type { CursorProps }
