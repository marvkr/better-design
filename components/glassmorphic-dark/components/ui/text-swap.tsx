"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Text states swap transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Three-phase sequence: exit (translate up + blur + fade), swap text,
// then enter from below back to rest.

const TEXT_SWAP_CSS = `
.t-text-swap-scope {
  --text-swap-dur: 200ms;
  --text-swap-translate-y: 8px;
  --text-swap-blur: 2px;
  --text-swap-ease: ease-out;
}
.t-text-swap {
  display: inline-block;
  transform: translateY(0);
  filter: blur(0);
  opacity: 1;
  transition:
    transform var(--text-swap-dur) var(--text-swap-ease),
    filter    var(--text-swap-dur) var(--text-swap-ease),
    opacity   var(--text-swap-dur) var(--text-swap-ease);
  will-change: transform, filter, opacity;
}
.t-text-swap.is-exit {
  transform: translateY(calc(var(--text-swap-translate-y) * -1));
  filter: blur(var(--text-swap-blur));
  opacity: 0;
}
.t-text-swap.is-enter-start {
  transform: translateY(var(--text-swap-translate-y));
  filter: blur(var(--text-swap-blur));
  opacity: 0;
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  .t-text-swap { transition: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-text-swap", "")
    el.textContent = TEXT_SWAP_CSS
    document.head.appendChild(el)
    injected = true
  }, [])
}

function readMs(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : fallback
}

const DEFAULT_MESSAGES = ["Transaction processing…", "Transaction completed"]

export function TextStatesSwap({
  messages = DEFAULT_MESSAGES,
  className,
}: {
  messages?: string[]
  className?: string
}) {
  useStyles()
  const [index, setIndex] = React.useState(0)
  const ref = React.useRef<HTMLSpanElement>(null)
  const busy = React.useRef(false)

  const next = () => {
    if (busy.current) return
    const el = ref.current
    if (!el) return
    busy.current = true
    const dur = readMs("--text-swap-dur", 200)

    el.classList.add("is-exit")
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length)
      el.classList.remove("is-exit")
      el.classList.add("is-enter-start")
      // force reflow
      void el.offsetWidth
      el.classList.remove("is-enter-start")
      busy.current = false
    }, dur)
  }

  return (
    <div className={cn("t-text-swap-scope flex flex-col items-center gap-3", className)}>
      <span ref={ref} className="t-text-swap text-sm font-medium text-foreground">
        {messages[index]}
      </span>
      <button
        type="button"
        onClick={next}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        Next
      </button>
    </div>
  )
}
