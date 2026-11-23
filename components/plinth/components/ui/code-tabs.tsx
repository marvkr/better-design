"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Code Tabs: an editor panel whose file switcher is the system's
 * segmented control, a recessed track with the chosen file raised out of it.
 * The code sits in a darker well below.
 */

export interface CodeTabsItem {
  label: string
  code: string
  language?: string
  lang?: string
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
  const language = current.language ?? current.lang

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-border bg-card p-2", className)}>
      <div className="flex items-center justify-between gap-2 px-1 pb-2">
        <div
          role="tablist"
          aria-label="Files"
          className="flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-lg bg-input p-0.5 [box-shadow:var(--shadow-inset)]"
        >
          {tabs.map((tab) => {
            const selected = tab.label === current.label
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.label)}
                className={cn(
                  "shrink-0 cursor-pointer rounded-md px-2.5 py-1 font-mono text-xs",
                  "transition-[color,background,box-shadow] duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "[background:var(--segment-gradient)] text-foreground [box-shadow:var(--shadow-segment)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        {language && (
          <span className="shrink-0 pr-1 font-mono text-[0.6875rem] uppercase text-muted-foreground">{language}</span>
        )}
      </div>
      <pre
        role="tabpanel"
        className="overflow-x-auto rounded-2xl bg-input px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-foreground [box-shadow:var(--shadow-inset)]"
      >
        <code>{current.code}</code>
      </pre>
    </div>
  )
}
CodeTabs.displayName = "CodeTabs"

export { CodeTabs }
