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

  // Single sliding pill — identical technique to graphite Tabs: one gradient
  // pill is absolutely positioned and animates left/width between the active
  // trigger, so CodeTabs shares the exact same motion as the segmented Tabs
  // instead of fading each button's own background in and out.
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const pillRef = React.useRef<HTMLSpanElement | null>(null)
  const firstPaint = React.useRef(true)

  React.useLayoutEffect(() => {
    const track = trackRef.current
    const pill = pillRef.current
    if (!track || !pill) return

    const measure = () => {
      const el = track.querySelector<HTMLElement>('[data-active="true"]')
      if (!el) {
        pill.style.opacity = "0"
        return
      }
      const trackRect = track.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      pill.style.opacity = "1"
      pill.style.left = `${r.left - trackRect.left}px`
      pill.style.width = `${r.width}px`
    }

    if (firstPaint.current) {
      const prev = pill.style.transition
      pill.style.transition = "none"
      measure()
      void pill.offsetWidth
      pill.style.transition = prev
      firstPaint.current = false
    } else {
      measure()
    }

    const ro = new ResizeObserver(measure)
    ro.observe(track)
    track.querySelectorAll<HTMLElement>("button").forEach((el) => ro.observe(el))
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [active, tabs.length])

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
        "relative group rounded-xl overflow-hidden",
        "bg-card border border-border [box-shadow:var(--shadow-tile)]",
        className,
      )}
    >
      <div
        ref={trackRef}
        role="tablist"
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
          const els = Array.from(
            e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
          )
          const current = els.findIndex((t) => t === document.activeElement)
          if (current === -1) return
          e.preventDefault()
          const dir = e.key === "ArrowRight" ? 1 : -1
          els[(current + dir + els.length) % els.length]?.focus()
        }}
        className="relative flex items-center gap-[0.1875rem] p-[0.1875rem] m-2 rounded-full bg-secondary [box-shadow:var(--shadow-inset)]"
      >
        <span
          ref={pillRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-[0.1875rem] bottom-[0.1875rem] z-0 rounded-full",
            "bg-[image:var(--pill-gradient)]",
            "[box-shadow:var(--shadow-pill)]",
            "transition-[left,width,opacity] duration-[380ms]",
            "[transition-timing-function:cubic-bezier(0.32,0.72,0.28,1)]",
          )}
          style={{ opacity: 0 }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={active === tab.label}
            tabIndex={active === tab.label ? 0 : -1}
            data-active={active === tab.label}
            onClick={() => setActive(tab.label)}
            className={cn(
              "relative z-10 px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap",
              "transition-[color] duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active === tab.label
                ? "text-foreground [text-shadow:var(--text-shadow-pressed)]"
                : "text-foreground/55 hover:text-foreground/80",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative border-t border-border">
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
            "[box-shadow:var(--shadow-tile)]",
            "hover:text-foreground hover:bg-accent hover:[box-shadow:var(--shadow-md)]",
            "active:translate-y-px",
            "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring",
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
