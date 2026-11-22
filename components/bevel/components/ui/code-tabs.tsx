"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"

/*
 * Bevel CodeTabs.
 *
 * The whole panel is one well, and the tab strip sits inside it above a single
 * pixel of the track token. The selected tab is a filled segment, so it takes
 * the primary button's gradient and rim rather than a flat tint, and the code
 * below it drops its own well to avoid a box inside a box.
 */

/** One tab: a label and the code it shows. */
export interface CodeTabsItem {
  label: string
  code: string
  language?: string
  filename?: string
}

/** Props for `CodeTabs`; `defaultTab` matches an item's `label`. */
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
      className={cn(
        "overflow-hidden rounded-[0.875rem]",
        "bg-[var(--inner)] text-[var(--inner-foreground)]",
        "[box-shadow:var(--shadow-inset)]",
        className,
      )}
    >
      <div role="tablist" className="flex items-center gap-1 p-1.5">
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
                "rounded-[0.5rem] px-2.5 py-1.5",
                "text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem]",
                "transition-[box-shadow,background-color,color] duration-fast ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "text-primary-foreground bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] [box-shadow:var(--shadow-primary)]"
                  : "text-muted-foreground hover:bg-card hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="h-px w-full bg-[var(--track)]" aria-hidden />
      <CodeBlock
        code={current.code}
        language={current.language}
        filename={current.filename}
        className="rounded-none bg-transparent [box-shadow:none]"
      />
    </div>
  )
}
CodeTabs.displayName = "CodeTabs"

export { CodeTabs }
