"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

// Leather Luxe CodeTabs: a card shell whose active tab is underlined by a
// stitched cognac seam; code rests in the recessed well below.

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
        "overflow-hidden rounded-lg",
        "border border-border bg-card [box-shadow:var(--shadow-card)]",
        className
      )}
    >
      {/* Tab bar */}
      <div className="relative flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={cn(
              "relative px-4 py-2.5 text-xs font-medium transition-colors duration-base",
              i === activeIndex
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {i === activeIndex && (
              <motion.div
                layoutId={`code-tab-indicator-${uid}`}
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[0.125rem]",
                  "[background-image:var(--gradient-leather)]",
                  "shadow-[0_-0.0625rem_0.375rem_oklch(0.55_0.115_52/0.45)]"
                )}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code well */}
      <div className="relative overflow-hidden bg-well [box-shadow:var(--shadow-well)]">
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
