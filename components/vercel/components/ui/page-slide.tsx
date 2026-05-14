"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Page side-by-side transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Page 1 exits left, page 2 exits right; slide + fade + blur.

const PAGE_SLIDE_CSS = `
.t-page-slide-scope {
  --page-slide-dur: 200ms;
  --page-fade-dur: 200ms;
  --page-slide-distance: 8px;
  --page-blur: 3px;
  --page-stagger: 0ms;
  --page-exit-enabled: 1;
  --page-slide-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --page-fade-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
.t-page-slide {
  position: relative;
}
.t-page-slide .t-page[data-page-id="1"] {
  --t-page-from-x: calc(var(--page-slide-distance) * -1);
}
.t-page-slide .t-page[data-page-id="2"] {
  --t-page-from-x: var(--page-slide-distance);
}
.t-page-slide .t-page {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateX(calc(var(--t-page-from-x, 0px) * var(--page-exit-enabled)));
  filter: blur(calc(var(--page-blur) * var(--page-exit-enabled)));
  transition:
    opacity   var(--page-fade-dur)  var(--page-fade-ease),
    transform var(--page-slide-dur) var(--page-slide-ease),
    filter    var(--page-slide-dur) var(--page-slide-ease);
  will-change: opacity, transform, filter;
}
.t-page-slide[data-page="1"] .t-page[data-page-id="1"],
.t-page-slide[data-page="2"] .t-page[data-page-id="2"] {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
  filter: blur(0);
  transition-delay: var(--page-stagger);
}
@media (prefers-reduced-motion: reduce) {
  .t-page-slide .t-page { transition: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-page-slide", "")
    el.textContent = PAGE_SLIDE_CSS
    document.head.appendChild(el)
    injected = true
  }, [])
}

export function PageSlide({ className }: { className?: string }) {
  useStyles()
  const [page, setPage] = React.useState<1 | 2>(1)
  return (
    <div className={cn("t-page-slide-scope flex flex-col items-stretch gap-3", className)}>
      <div
        className="t-page-slide relative h-40 w-full overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
        data-page={page}
      >
        <section className="t-page p-4" data-page-id="1">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Page 1</h2>
          <div className="mb-3 space-y-2">
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-5/6 rounded bg-muted" />
            <div className="h-2 w-2/3 rounded bg-muted" />
          </div>
          <button
            type="button"
            onClick={() => setPage(2)}
            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
          >
            Next
          </button>
        </section>
        <section className="t-page p-4" data-page-id="2">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Page 2</h2>
          <div className="mb-3 grid grid-cols-3 gap-2">
            <div className="h-12 rounded-md bg-muted" />
            <div className="h-12 rounded-md bg-muted" />
            <div className="h-12 rounded-md bg-muted" />
          </div>
          <button
            type="button"
            onClick={() => setPage(1)}
            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
          >
            Back
          </button>
        </section>
      </div>
    </div>
  )
}
