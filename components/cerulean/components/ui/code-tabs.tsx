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
      // best-effort
    }
  }

  return (
    <div
      className={cn(
        "relative group rounded-lg overflow-hidden",
        "bg-card border border-border [box-shadow:var(--shadow-s)]",
        className,
      )}
    >
      <div className="flex items-center gap-0.5 px-2 pt-2 border-b border-border bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(tab.label)}
            className={cn(
              "relative px-3 py-1.5 text-xs font-medium rounded-t-md",
              "transition-[background-color,color] duration-fast",
              active === tab.label
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40",
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
          className={cn(
            "absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-md",
            "bg-popover text-muted-foreground border border-border",
            "transition-[opacity,background-color,color,box-shadow] duration-fast",
            "opacity-0 group-hover:opacity-100",
            "[box-shadow:var(--shadow-s)]",
            "hover:text-foreground hover:bg-accent hover:[box-shadow:var(--shadow-m)]",
            "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/40",
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          <Icon icon={copied ? "tabler:check" : "tabler:copy"} className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
CodeTabs.displayName = "CodeTabs"

export { CodeTabs }
