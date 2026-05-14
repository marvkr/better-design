"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Card resize transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Tweens width + height with cubic-bezier easing.

const CARD_RESIZE_CSS = `
.t-resize-scope {
  --resize-dur: 300ms;
  --resize-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
.t-resize {
  transition:
    width  var(--resize-dur) var(--resize-ease),
    height var(--resize-dur) var(--resize-ease);
  will-change: width, height;
}
@media (prefers-reduced-motion: reduce) {
  .t-resize { transition: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-card-resize", "")
    el.textContent = CARD_RESIZE_CSS
    document.head.appendChild(el)
    injected = true
  }, [])
}

export function CardResize({
  large = { width: 260, height: 180 },
  small = { width: 160, height: 100 },
  className,
}: {
  large?: { width: number; height: number }
  small?: { width: number; height: number }
  className?: string
}) {
  useStyles()
  const [isSmall, setSmall] = React.useState(false)
  const dims = isSmall ? small : large
  return (
    <div className={cn("t-resize-scope flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => setSmall((v) => !v)}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        {isSmall ? "Expand" : "Shrink"}
      </button>
      <div
        className="t-resize overflow-hidden rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm"
        style={{ width: dims.width, height: dims.height }}
      >
        <div className="flex h-full flex-col gap-2">
          <div className="h-2 w-1/2 rounded bg-muted" />
          <div className="h-2 w-2/3 rounded bg-muted" />
          <div className="h-2 w-1/3 rounded bg-muted" />
          <div className="mt-auto h-2 w-3/4 rounded bg-muted" />
          <div className="h-2 w-1/2 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
