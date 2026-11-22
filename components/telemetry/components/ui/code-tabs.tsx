"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

// Control Room CodeTabs: terminal source viewer.
// Recessed near-black code well under a console tab bar; the active tab
// carries a glowing signal-green underline.

interface CodeTab {
  label: string
  lang: string
  code: string
}

interface CodeTabsProps {
  tabs: CodeTab[]
  defaultTab?: number
  className?: string
}

function CodeTabs({ tabs, defaultTab = 0, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(defaultTab)
  const [direction, setDirection] = React.useState(0)
  const uid = React.useId()

  const handleTabChange = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const active = tabs[activeIndex] ?? tabs[0]
  if (!active) return null

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md",
        "border border-border bg-input",
        "[box-shadow:var(--shadow-inset)]",
        className
      )}
    >
      {/* Console tab bar */}
      <div className="relative flex border-b border-border bg-card">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={cn(
              "relative px-4 py-2.5 text-[0.625rem] font-semibold uppercase tracking-widest transition-colors duration-fast",
              i === activeIndex
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {i === activeIndex && (
              <motion.div
                layoutId={`code-tab-indicator-${uid}`}
                className="absolute bottom-0 left-0 right-0 h-[0.125rem] bg-primary shadow-[0_0_0.5rem_oklch(0.78_0.21_148/0.6)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Recessed code content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <pre className="m-0 overflow-x-auto bg-transparent p-4 text-xs leading-relaxed text-foreground/85">
              <code>{active.code}</code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export { CodeTabs }
export type { CodeTabsProps }
