"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Notification badge transition — ported from transitions.dev
// https://github.com/Jakubantalik/transitions.dev (MIT)
// Diagonal slide + spring pop-in with blur.

const NOTIFICATION_BADGE_CSS = `
.t-badge-scope {
  --badge-slide-dur: 260ms;
  --badge-pop-dur: 500ms;
  --badge-pop-close-dur: 180ms;
  --badge-fade-dur: 400ms;
  --badge-fade-close-dur: 180ms;
  --badge-blur: 2px;
  --badge-offset-x: -8.2px;
  --badge-offset-y: 12.4px;
  --badge-slide-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --badge-pop-ease: cubic-bezier(0.34, 1.36, 0.64, 1);
  --badge-close-ease: cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes t-badge-slide-in {
  from { transform: translate(var(--badge-offset-x), var(--badge-offset-y)); }
  to   { transform: translate(0, 0); }
}
.t-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  pointer-events: none;
  will-change: transform;
}
.t-badge[data-open="true"] {
  animation: t-badge-slide-in var(--badge-slide-dur) var(--badge-slide-ease);
}
.t-badge-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9999px;
  background: var(--primary);
  color: var(--primary-foreground);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  transform-origin: center;
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  transition:
    transform var(--badge-pop-dur)  var(--badge-pop-ease),
    opacity   var(--badge-fade-dur) var(--badge-pop-ease),
    filter    var(--badge-pop-dur)  var(--badge-pop-ease);
  will-change: transform, opacity, filter;
}
.t-badge[data-open="false"] .t-badge-dot {
  transform: scale(0);
  opacity: 0;
  filter: blur(var(--badge-blur));
  transition:
    transform var(--badge-pop-close-dur)  var(--badge-close-ease),
    opacity   var(--badge-fade-close-dur) var(--badge-close-ease),
    filter    var(--badge-pop-close-dur)  var(--badge-close-ease);
}
@media (prefers-reduced-motion: reduce) {
  .t-badge, .t-badge-dot { animation: none !important; transition: none !important; }
}
`

let injected = false
function useStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-t-notification-badge", "")
    el.textContent = NOTIFICATION_BADGE_CSS
    document.head.appendChild(el)
    injected = true
  }, [])
}

export function NotificationBadge({
  children,
  count = 1,
  defaultOpen = true,
  className,
}: {
  children?: React.ReactNode
  count?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  useStyles()
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <span className="t-badge-scope inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted",
          className,
        )}
        aria-label="Toggle notification badge"
      >
        {children ?? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        )}
        <span className="t-badge" data-open={open ? "true" : "false"}>
          <span className="t-badge-dot">{count}</span>
        </span>
      </button>
    </span>
  )
}
