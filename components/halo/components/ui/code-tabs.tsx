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
        "rounded-xl overflow-hidden",
        "backdrop-blur-xl bg-foreground/[0.06] border border-border",
        "shadow-[inset_0_0_0.5rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
        className
      )}
    >
      {/* Translucent tab bar */}
      <div className="relative flex border-b border-foreground/[0.06] backdrop-blur-md bg-foreground/[0.03]">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={cn(
              "relative px-4 py-2.5 text-xs font-medium transition-colors duration-base",
              i === activeIndex
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/70"
            )}
          >
            {i === activeIndex && (
              <motion.div
                layoutId={`code-tab-indicator-${uid}`}
                className="absolute bottom-0 left-0 right-0 h-[0.125rem] bg-primary shadow-[0_0_0.5rem_color-mix(in_oklch,var(--primary)_50%,transparent)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Translucent code content */}
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
            <pre className="p-4 m-0 bg-transparent text-xs leading-relaxed overflow-x-auto text-foreground/80">
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
