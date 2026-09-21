"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Panel reveal transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Y-axis slide + fade + cross-blur on the same duration.

const PANEL_REVEAL_CSS = `
.t-panel-scope {
  --panel-open-dur: 400ms;
  --panel-close-dur: 350ms;
  --panel-translate-y: 80px;
  --panel-blur: 2px;
  --panel-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
.t-panel-slide {
  transform: translateY(var(--panel-translate-y));
  opacity: 0;
  filter: blur(var(--panel-blur));
  pointer-events: none;
  /* hidden keeps the collapsed panel's children out of the tab order */
  visibility: hidden;
  transition:
    transform var(--panel-close-dur) var(--panel-ease),
    opacity   var(--panel-close-dur) var(--panel-ease),
    filter    var(--panel-close-dur) var(--panel-ease),
    visibility 0s linear var(--panel-close-dur);
  will-change: transform, opacity, filter;
}
.t-panel-slide[data-open="true"] {
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
  pointer-events: auto;
  visibility: visible;
  transition-delay: 0s;
  transition:
    transform var(--panel-open-dur) var(--panel-ease),
    opacity   var(--panel-open-dur) var(--panel-ease),
    filter    var(--panel-open-dur) var(--panel-ease);
}
@media (prefers-reduced-motion: reduce) {
  .t-panel-slide { transition: none !important; }
}
`

// useInsertionEffect runs before the browser paints, so the resting state
// these rules define lands on the first frame instead of after it. The DOM
// query replaces a module-level flag, which stayed true if the tag was ever
// removed and never fired for a second document.
function useStyles() {
  React.useInsertionEffect(() => {
    if (typeof document === "undefined") return
    if (document.querySelector('style[data-t-panel-reveal]')) return
    const el = document.createElement("style")
    el.setAttribute("data-t-panel-reveal", "")
    el.textContent = PANEL_REVEAL_CSS
    document.head.appendChild(el)
  }, [])
}

export function PanelReveal({
  children,
  defaultOpen = false,
  className,
}: {
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  useStyles()
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className={cn("t-panel-scope flex flex-col items-stretch gap-3", className)}>
      <div className="self-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          {open ? "Hide" : "Show"} panel
        </button>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div
          className="t-panel-slide rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm"
          data-open={open}
        >
          {children ?? (
            <div className="flex flex-col gap-3">
              <div className="h-2 w-3/5 rounded bg-muted" />
              <div className="h-2 w-2/5 rounded bg-muted" />
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="h-12 rounded-md bg-muted" />
                <div className="h-12 rounded-md bg-muted" />
                <div className="h-12 rounded-md bg-muted" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
