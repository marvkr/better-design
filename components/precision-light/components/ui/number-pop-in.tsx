"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Number pop-in transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Per-digit pop-in with blur + Y translate + stagger.

const NUMBER_POP_IN_CSS = `
.t-digit-scope {
  --digit-dur: 500ms;
  --digit-distance: 8px;
  --digit-stagger: 70ms;
  --digit-blur: 2px;
  --digit-ease: cubic-bezier(0.34, 1.45, 0.64, 1);
  --digit-dir-x: 0;
  --digit-dir-y: 1;
}
@keyframes t-digit-pop-in {
  0% {
    transform: translate(
      calc(var(--digit-distance) * var(--digit-dir-x)),
      calc(var(--digit-distance) * var(--digit-dir-y))
    );
    opacity: 0;
    filter: blur(var(--digit-blur));
  }
  100% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
}
.t-digit-group {
  display: inline-flex;
  align-items: baseline;
}
.t-digit {
  display: inline-block;
  will-change: transform, opacity, filter;
}
.t-digit-group.is-animating .t-digit {
  animation: t-digit-pop-in var(--digit-dur) var(--digit-ease) both;
}
.t-digit-group.is-animating .t-digit[data-stagger] {
  animation-delay: calc(var(--digit-stagger) * var(--t-digit-i, 0));
}
@media (prefers-reduced-motion: reduce) {
  .t-digit-group .t-digit { animation: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-number-pop-in", "")
    el.textContent = NUMBER_POP_IN_CSS
    document.head.appendChild(el)
    injected = true
  }, [])
}

export function NumberPopIn({
  value = "123",
  className,
}: {
  value?: string
  className?: string
}) {
  useStyles()
  const [playing, setPlaying] = React.useState(true)

  const replay = () => {
    setPlaying(false)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPlaying(true)),
    )
  }

  return (
    <div className={cn("t-digit-scope flex flex-col items-center gap-3", className)}>
      <span
        className={cn(
          "t-digit-group font-mono text-3xl font-semibold tabular-nums text-foreground",
          playing && "is-animating",
        )}
        aria-live="polite"
      >
        {value.split("").map((ch, i) => (
          <span
            key={i}
            className="t-digit"
            data-stagger={i > 0 ? i : undefined}
            style={i > 0 ? ({ ["--t-digit-i" as string]: i } as React.CSSProperties) : undefined}
          >
            {ch}
          </span>
        ))}
      </span>
      <button
        type="button"
        onClick={replay}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        Animate
      </button>
    </div>
  )
}
