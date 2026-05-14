"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Icon swap transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Two icons cross-fade with scale + blur on the same grid cell.

const ICON_SWAP_CSS = `
.t-icon-swap-scope {
  --icon-swap-dur: 200ms;
  --icon-swap-blur: 2px;
  --icon-swap-start-scale: 0.25;
  --icon-swap-ease: ease-in-out;
}
.t-icon-swap {
  position: relative;
  display: inline-grid;
}
.t-icon-swap .t-icon {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    opacity   var(--icon-swap-dur) var(--icon-swap-ease),
    filter    var(--icon-swap-dur) var(--icon-swap-ease),
    transform var(--icon-swap-dur) var(--icon-swap-ease);
  will-change: opacity, filter, transform;
}
.t-icon-swap[data-state="a"] .t-icon[data-icon="a"],
.t-icon-swap[data-state="b"] .t-icon[data-icon="b"] {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
.t-icon-swap[data-state="a"] .t-icon[data-icon="b"],
.t-icon-swap[data-state="b"] .t-icon[data-icon="a"] {
  opacity: 0;
  filter: blur(var(--icon-swap-blur));
  transform: scale(var(--icon-swap-start-scale));
}
@media (prefers-reduced-motion: reduce) {
  .t-icon-swap .t-icon { transition: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-icon-swap", "")
    el.textContent = ICON_SWAP_CSS
    document.head.appendChild(el)
    injected = true
  }, [])
}

const HamburgerIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
)

const CloseIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

export function IconSwap({
  iconA = HamburgerIcon,
  iconB = CloseIcon,
  className,
}: {
  iconA?: React.ReactNode
  iconB?: React.ReactNode
  className?: string
}) {
  useStyles()
  const [state, setState] = React.useState<"a" | "b">("a")
  return (
    <span className={cn("t-icon-swap-scope inline-flex", className)}>
      <button
        type="button"
        aria-label={state === "a" ? "Show B" : "Show A"}
        onClick={() => setState((s) => (s === "a" ? "b" : "a"))}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted"
      >
        <span className="t-icon-swap" data-state={state}>
          <span className="t-icon" data-icon="a">
            {iconA}
          </span>
          <span className="t-icon" data-icon="b">
            {iconB}
          </span>
        </span>
      </button>
    </span>
  )
}
