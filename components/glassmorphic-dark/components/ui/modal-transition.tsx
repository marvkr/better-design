// GENERATED FILE - do not edit.
// Source: scripts/transitions-src/modal-transition.tsx
// Re-generate: node scripts/generate-transitions.mjs
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Modal open/close transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Scale + fade with separate open / close durations.

const MODAL_CSS = `
.t-modal-scope {
  --modal-open-dur: 250ms;
  --modal-close-dur: 150ms;
  --modal-scale: 0.96;
  --modal-scale-close: 0.96;
  --modal-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
.t-modal {
  transform-origin: center;
  transform: scale(var(--modal-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-open-dur) var(--modal-ease),
    opacity   var(--modal-open-dur) var(--modal-ease);
  will-change: transform, opacity;
}
.t-modal.is-open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}
.t-modal.is-closing {
  transform: scale(var(--modal-scale-close));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-close-dur) var(--modal-ease),
    opacity   var(--modal-close-dur) var(--modal-ease);
}
@media (prefers-reduced-motion: reduce) {
  .t-modal { transition: none !important; }
}
`

// useInsertionEffect runs before the browser paints, so the resting state
// these rules define lands on the first frame instead of after it. The DOM
// query replaces a module-level flag, which stayed true if the tag was ever
// removed and never fired for a second document.
function useStyles() {
  React.useInsertionEffect(() => {
    if (typeof document === "undefined") return
    if (document.querySelector('style[data-t-modal]')) return
    const el = document.createElement("style")
    el.setAttribute("data-t-modal", "")
    el.textContent = MODAL_CSS
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

export function ModalTransition({
  children,
  triggerLabel = "Open modal",
  closeLabel = "Close",
  className,
}: {
  children?: React.ReactNode
  triggerLabel?: string
  closeLabel?: string
  className?: string
}) {
  useStyles()
  const scopeRef = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<"closed" | "open" | "closing">("closed")

  React.useEffect(() => {
    if (state !== "closing") return
    const ms = readMs(scopeRef.current, "--modal-close-dur", 150)
    const id = window.setTimeout(() => setState("closed"), ms)
    return () => window.clearTimeout(id)
  }, [state])

  // The dialog mounts only once it is opening, so it would paint the open
  // state on its first frame and skip the transition. Add .is-open a frame
  // later, the same way number-pop-in defers its entry.
  const [entered, setEntered] = React.useState(false)
  React.useEffect(() => {
    if (state !== "open") {
      setEntered(false)
      return
    }
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [state])

  const open = () => setState("open")
  const close = () => setState("closing")

  return (
    <div ref={scopeRef} className={cn("t-modal-scope flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onClick={open}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        {triggerLabel}
      </button>
      {state !== "closed" && (
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "t-modal w-64 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-lg",
            state === "open" && entered && "is-open",
            state === "closing" && "is-closing",
          )}
        >
          {children ?? (
            <div className="flex flex-col gap-2">
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="h-2 w-full rounded bg-muted" />
              <div className="h-2 w-4/5 rounded bg-muted" />
              <div className="h-2 w-3/4 rounded bg-muted" />
            </div>
          )}
          <button
            type="button"
            onClick={close}
            className="mt-4 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
          >
            {closeLabel}
          </button>
        </div>
      )}
    </div>
  )
}
