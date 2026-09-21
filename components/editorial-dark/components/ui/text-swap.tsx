// GENERATED FILE - do not edit.
// Source: scripts/transitions-src/text-swap.tsx
// Re-generate: node scripts/generate-transitions.mjs
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

// useInsertionEffect runs before the browser paints, so the resting state
// these rules define lands on the first frame instead of after it. The DOM
// query replaces a module-level flag, which stayed true if the tag was ever
// removed and never fired for a second document.
function useStyles() {
  React.useInsertionEffect(() => {
    if (typeof document === "undefined") return
    if (document.querySelector('style[data-t-text-swap]')) return
    const el = document.createElement("style")
    el.setAttribute("data-t-text-swap", "")
    el.textContent = TEXT_SWAP_CSS
    document.head.appendChild(el)
  }, [])
}

// The duration variables live on the .t-*-scope wrapper, not on :root, so the
// lookup has to start from the scope element. Custom properties inherit
// downwards, so reading documentElement never sees them.
function readMs(el: Element | null, name: string, fallback: number) {
  if (typeof window === "undefined" || !el) return fallback
  const raw = getComputedStyle(el).getPropertyValue(name).trim()
  if (!raw) return fallback
  const n = parseFloat(raw)
  if (!Number.isFinite(n)) return fallback
  return raw.endsWith("ms") ? n : raw.endsWith("s") ? n * 1000 : n
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
  const scopeRef = React.useRef<HTMLDivElement>(null)
  const [index, setIndex] = React.useState(0)
  const ref = React.useRef<HTMLSpanElement>(null)
  const busy = React.useRef(false)

  const timer = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const next = () => {
    if (busy.current) return
    const el = ref.current
    // messages is a public prop; an empty list would make the modulo NaN.
    if (!el || messages.length === 0) return
    busy.current = true
    const dur = readMs(scopeRef.current, "--text-swap-dur", 200)

    el.classList.add("is-exit")
    timer.current = window.setTimeout(() => {
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
    <div ref={scopeRef} className={cn("t-text-swap-scope flex flex-col items-center gap-3", className)}>
      <span ref={ref} className="t-text-swap text-sm font-medium text-foreground">
        {messages[index % messages.length]}
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
