"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

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

// Monochrome Industrial CodeTabs — sharp container, hairline border, mono labels.
// The active tab indicator is a 1px solid accent line, no spring physics.

function CodeTabs({ tabs, defaultTab = 0, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(defaultTab)
  const [direction, setDirection] = React.useState(0)
  const uid = React.useId()

  const handleTabChange = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const active = tabs[activeIndex]

  return (
    <div
      className={cn(
        "rounded-none border border-[var(--mono-border-visible)] bg-card overflow-hidden",
        className
      )}
    >
      {/* Tab bar */}
      <div className="relative flex border-b border-[var(--mono-border-visible)] bg-[var(--mono-surface)]">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={cn(
              "relative px-4 py-2.5 font-[family-name:var(--font-mono)] uppercase tracking-[0.08em] text-[10px] transition-colors",
              i === activeIndex
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {i === activeIndex && (
              <motion.div
                layoutId={`code-tab-indicator-${uid}`}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--mono-accent)]"
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <pre className="p-4 m-0 bg-transparent font-[family-name:var(--font-mono)] text-[12px] leading-relaxed overflow-x-auto text-foreground">
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
