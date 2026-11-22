"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

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

/*
 * Atelier CodeTabs — a single white card (no nested CodeBlock chrome, which
 * would draw a second border-in-border). A quiet warm-gray tab strip sits on
 * top; the active tab carries a thin forest-green underline, matching the
 * refined accent. Code renders flush below.
 */
const CodeTabs = ({ tabs, defaultTab, className }: CodeTabsProps) => {
  const [active, setActive] = React.useState(defaultTab ?? tabs[0]?.label)
  const [copied, setCopied] = React.useState(false)
  const current = tabs.find((t) => t.label === active) ?? tabs[0]

  if (!current) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silent fail — copy is best-effort
    }
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-card border border-border [box-shadow:var(--shadow-s)]",
        className
      )}
    >
      <div className="flex items-center gap-1 px-2 border-b border-border bg-secondary/60">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(tab.label)}
            className={cn(
              "relative px-3 py-2.5 text-xs font-medium transition-colors duration-fast",
              active === tab.label
                ? "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed font-mono text-foreground">
          <code>{current.code}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full",
            "bg-card text-muted-foreground border border-border [box-shadow:var(--shadow-s)]",
            "opacity-0 group-hover:opacity-100 transition-[opacity,box-shadow,color] duration-fast",
            "hover:text-foreground hover:[box-shadow:var(--shadow-m)]",
            "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/40"
          )}
        >
          <Icon icon={copied ? "ph:check" : "ph:copy"} className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
CodeTabs.displayName = "CodeTabs"

export { CodeTabs }
