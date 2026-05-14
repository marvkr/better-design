"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Menu dropdown transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Origin-aware open / close with scale + opacity.

const MENU_DROPDOWN_CSS = `
.t-dropdown-scope {
  --dropdown-open-dur: 250ms;
  --dropdown-close-dur: 150ms;
  --dropdown-pre-scale: 0.97;
  --dropdown-closing-scale: 0.99;
  --dropdown-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
.t-dropdown {
  transform-origin: top left;
  transform: scale(var(--dropdown-pre-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--dropdown-open-dur) var(--dropdown-ease),
    opacity   var(--dropdown-open-dur) var(--dropdown-ease);
  will-change: transform, opacity;
}
.t-dropdown[data-origin="top-right"]     { transform-origin: top right; }
.t-dropdown[data-origin="top-center"]    { transform-origin: top center; }
.t-dropdown[data-origin="bottom-left"]   { transform-origin: bottom left; }
.t-dropdown[data-origin="bottom-center"] { transform-origin: bottom center; }
.t-dropdown[data-origin="bottom-right"]  { transform-origin: bottom right; }
.t-dropdown.is-open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}
.t-dropdown.is-closing {
  transform: scale(var(--dropdown-closing-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--dropdown-close-dur) var(--dropdown-ease),
    opacity   var(--dropdown-close-dur) var(--dropdown-ease);
}
@media (prefers-reduced-motion: reduce) {
  .t-dropdown { transition: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-menu-dropdown", "")
    el.textContent = MENU_DROPDOWN_CSS
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

export type DropdownOrigin =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export function MenuDropdown({
  items = ["Item 1", "Item 2", "Item 3"],
  origin = "top-center",
  className,
}: {
  items?: React.ReactNode[]
  origin?: DropdownOrigin
  className?: string
}) {
  useStyles()
  const [state, setState] = React.useState<"closed" | "open" | "closing">("closed")

  React.useEffect(() => {
    if (state !== "closing") return
    const ms = readMs("--dropdown-close-dur", 150)
    const id = window.setTimeout(() => setState("closed"), ms)
    return () => window.clearTimeout(id)
  }, [state])

  const toggle = () => setState((s) => (s === "open" ? "closing" : "open"))

  return (
    <div className={cn("t-dropdown-scope relative inline-flex flex-col items-center gap-2", className)}>
      <button
        type="button"
        onClick={toggle}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        Toggle menu
      </button>
      <div
        role="menu"
        data-origin={origin}
        className={cn(
          "t-dropdown min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
          state === "open" && "is-open",
          state === "closing" && "is-closing",
        )}
      >
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            role="menuitem"
            className="block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
