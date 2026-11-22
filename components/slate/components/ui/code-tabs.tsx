"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { CodeBlock } from "./code-block"

// Ops Sharp Code Tabs: a panel with a hairline tab strip. The active tab reads
// as a white card connecting down into the code panel; inactive tabs sit on the
// muted strip. The body renders through the slate CodeBlock.

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

  const active = tabs[activeIndex]

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card [box-shadow:var(--shadow-s)]",
        className
      )}
    >
      {/* Tab strip */}
      <div className="flex border-b border-border bg-secondary">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative px-4 py-2.5 font-mono text-xs font-medium transition-colors",
              i === activeIndex
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {i === activeIndex && (
              <span className="absolute inset-x-0 bottom-0 h-px bg-card" />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content */}
      <CodeBlock
        code={active.code}
        language={active.lang}
        className="rounded-none border-0 [box-shadow:none]"
      />
    </div>
  )
}

export { CodeTabs }
export type { CodeTabsProps }
