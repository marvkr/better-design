"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { cashmereGrainStyle } from "./_shared"
import { CodeBlock } from "./code-block"

export interface CodeTabsItem {
  label: string
  code: string
  language?: string
  filename?: string
}

export interface CodeTabsProps {
  tabs: CodeTabsItem[]
  defaultTab?: string
  className?: string
}

const CodeTabs = ({ tabs, defaultTab, className }: CodeTabsProps) => {
  const [active, setActive] = React.useState(defaultTab ?? tabs[0]?.label)
  const current = tabs.find((t) => t.label === active) ?? tabs[0]

  if (!current) return null

  return (
    <div
      style={cashmereGrainStyle}
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-card border border-border [box-shadow:var(--shadow-s)]",
        className
      )}
    >
      <div className="flex items-center gap-0.5 px-2 pt-2 border-b border-border bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(tab.label)}
            className={cn(
              "relative px-3 py-1.5 text-xs font-medium rounded-t-lg",
              "transition-[background-color,color] duration-fast",
              active === tab.label
                // -mb-px: active tab drops over the strip's border-b so it
                // connects to the (flush) code panel instead of sitting on the line.
                ? "bg-card text-foreground -mb-px relative z-10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={current.code}
        language={current.language}
        filename={current.filename}
        className="rounded-none border-0 [box-shadow:none]"
      />
    </div>
  )
}
CodeTabs.displayName = "CodeTabs"

export { CodeTabs }
