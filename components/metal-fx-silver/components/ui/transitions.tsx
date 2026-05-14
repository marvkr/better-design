"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// transitions.dev — 9 essential CSS transitions
// Ported from https://github.com/Jakubantalik/transitions.dev (MIT)
// Uses semantic CSS variables (--foreground, --card, --primary, --background)
// so each design system themes them automatically.

const TRANSITION_STYLES = `
[data-tdev-scope] {
  --t-skeleton: color-mix(in oklab, var(--foreground) 8%, transparent);
  --t-surface: var(--card, #fff);
  --t-shadow:
    0 -1px 0 0 rgba(0, 0, 0, 0.06),
    0 2px 6px 0 rgba(0, 0, 0, 0.05),
    0 4px 42px 0 rgba(0, 0, 0, 0.06);
}
[data-tdev-scope] .tdev-sk {
  background: var(--t-skeleton);
  border-radius: 4px;
}

/* P1 — Notification Badge */
[data-tdev-scope] {
  --p1-pos-open-dur: 260ms;
  --p1-scale-open-dur: 500ms;
  --p1-scale-close-dur: 180ms;
  --p1-opacity-open-dur: 400ms;
  --p1-opacity-close-dur: 180ms;
  --p1-blur: 2px;
  --p1-distance-x: -8.2px;
  --p1-distance-y: 12.4px;
  --p1-ease-pos-open: cubic-bezier(0.22, 1, 0.36, 1);
  --p1-ease-scale-open: cubic-bezier(0.34, 1.36, 0.64, 1);
  --p1-ease-close: cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes tdev-p1-slide-in {
  0% { transform: translate(var(--p1-distance-x), var(--p1-distance-y)); }
  100% { transform: translate(0, 0); }
}
[data-tdev-scope] .p1-bell { position: relative; display: inline-flex; }
[data-tdev-scope] .p1-bell .p1-bell-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
[data-tdev-scope] .p1-bell[data-badge-open="true"] .p1-bell-badge {
  animation: tdev-p1-slide-in var(--p1-pos-open-dur) var(--p1-ease-pos-open);
}
[data-tdev-scope] .p1-bell .p1-bell-badge-inner {
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
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  transition:
    transform var(--p1-scale-open-dur) var(--p1-ease-scale-open),
    opacity var(--p1-opacity-open-dur) var(--p1-ease-scale-open),
    filter var(--p1-scale-open-dur) var(--p1-ease-scale-open);
}
[data-tdev-scope] .p1-bell[data-badge-open="false"] .p1-bell-badge-inner {
  transform: scale(0);
  opacity: 0;
  filter: blur(var(--p1-blur));
  transition:
    transform var(--p1-scale-close-dur) var(--p1-ease-close),
    opacity var(--p1-opacity-close-dur) var(--p1-ease-close),
    filter var(--p1-scale-close-dur) var(--p1-ease-close);
}

/* P2 — Menu Dropdown */
[data-tdev-scope] {
  --p2-open-dur: 250ms;
  --p2-close-dur: 150ms;
  --p2-pre-scale: 0.97;
  --p2-closing-scale: 0.99;
  --p2-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
[data-tdev-scope] .p2-dropdown {
  transform-origin: top center;
  transform: scale(var(--p2-pre-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--p2-open-dur) var(--p2-ease),
    opacity var(--p2-open-dur) var(--p2-ease);
}
[data-tdev-scope] .p2-dropdown.is-open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}
[data-tdev-scope] .p2-dropdown.is-closing {
  transform: scale(var(--p2-closing-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--p2-close-dur) var(--p2-ease),
    opacity var(--p2-close-dur) var(--p2-ease);
}

/* P3 — Panel Reveal */
[data-tdev-scope] {
  --p3-open-dur: 400ms;
  --p3-close-dur: 350ms;
  --p3-panel-height: 140px;
  --p3-translate-y: calc(var(--p3-panel-height) * 0.5);
  --p3-blur: 2px;
  --p3-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
[data-tdev-scope] .p3-panel-clip {
  position: relative;
  width: 100%;
  height: var(--p3-panel-height);
  overflow: hidden;
}
[data-tdev-scope] .p3-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: var(--t-surface);
  box-shadow: var(--t-shadow);
  transform: translateY(var(--p3-translate-y));
  opacity: 0;
  filter: blur(var(--p3-blur));
  pointer-events: none;
  transition:
    transform var(--p3-close-dur) var(--p3-ease),
    opacity var(--p3-close-dur) var(--p3-ease),
    filter var(--p3-close-dur) var(--p3-ease);
}
[data-tdev-scope] .p3-panel.is-open {
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
  pointer-events: auto;
  transition:
    transform var(--p3-open-dur) var(--p3-ease),
    opacity var(--p3-open-dur) var(--p3-ease),
    filter var(--p3-open-dur) var(--p3-ease);
}

/* P4 — Card Resize */
[data-tdev-scope] {
  --p4-dur: 300ms;
  --p4-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
[data-tdev-scope] .p4-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 12px;
  border-radius: 10px;
  background: var(--t-surface);
  box-shadow: var(--t-shadow);
  width: 220px;
  height: 112px;
  transition:
    width var(--p4-dur) var(--p4-ease),
    height var(--p4-dur) var(--p4-ease);
}
[data-tdev-scope] .p4-card.is-small {
  width: 154px;
  height: 128px;
}

/* P5 — Theme Icon Stack (Sun <-> Moon) */
[data-tdev-scope] {
  --p5-dur: 200ms;
  --p5-blur: 2px;
  --p5-start-scale: 0.25;
  --p5-ease: ease-in-out;
}
[data-tdev-scope] .p5-icon-stack {
  position: relative;
  display: inline-flex;
  width: 24px;
  height: 24px;
}
[data-tdev-scope] .p5-icon {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(var(--p5-start-scale));
  filter: blur(var(--p5-blur));
  transition:
    opacity var(--p5-dur) var(--p5-ease),
    filter var(--p5-dur) var(--p5-ease),
    transform var(--p5-dur) var(--p5-ease);
  color: var(--foreground);
}
[data-tdev-scope] .p5-icon-stack[data-active="moon"] .p5-icon-moon,
[data-tdev-scope] .p5-icon-stack[data-active="sun"] .p5-icon-sun {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}

/* P6 — Text States Swap */
[data-tdev-scope] {
  --p6-dur: 200ms;
  --p6-translate-y: 8px;
  --p6-blur: 2px;
  --p6-ease: ease-out;
}
[data-tdev-scope] .p6-text {
  display: inline-block;
  transform: translateY(0);
  filter: blur(0);
  opacity: 1;
  transition:
    transform var(--p6-dur) var(--p6-ease),
    filter var(--p6-dur) var(--p6-ease),
    opacity var(--p6-dur) var(--p6-ease);
}
[data-tdev-scope] .p6-text.is-exit {
  transform: translateY(calc(var(--p6-translate-y) * -1));
  filter: blur(var(--p6-blur));
  opacity: 0;
}
[data-tdev-scope] .p6-text.is-enter-start {
  transform: translateY(var(--p6-translate-y));
  filter: blur(var(--p6-blur));
  opacity: 0;
  transition: none;
}

/* P7 — Modal Open/Close */
[data-tdev-scope] {
  --p7-open-dur: 250ms;
  --p7-close-dur: 150ms;
  --p7-scale: 0.96;
  --p7-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
[data-tdev-scope] .p7-dialog {
  transform-origin: center;
  transform: scale(var(--p7-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--p7-open-dur) var(--p7-ease),
    opacity var(--p7-open-dur) var(--p7-ease);
}
[data-tdev-scope] .p7-dialog.is-open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}
[data-tdev-scope] .p7-dialog.is-closing {
  transform: scale(var(--p7-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--p7-close-dur) var(--p7-ease),
    opacity var(--p7-close-dur) var(--p7-ease);
}

/* P8 — Page Slide */
[data-tdev-scope] {
  --p8-slide-dur: 200ms;
  --p8-fade-dur: 200ms;
  --p8-distance: 8px;
  --p8-blur: 3px;
  --p8-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
[data-tdev-scope] .p8-modal { position: relative; }
[data-tdev-scope] .p8-modal .p8-page-1 { --p8-from-x: calc(var(--p8-distance) * -1); }
[data-tdev-scope] .p8-modal .p8-page-2 { --p8-from-x: var(--p8-distance); }
[data-tdev-scope] .p8-modal .p8-page {
  opacity: 0;
  pointer-events: none;
  transform: translateX(var(--p8-from-x));
  filter: blur(var(--p8-blur));
  transition:
    opacity var(--p8-fade-dur) var(--p8-ease),
    transform var(--p8-slide-dur) var(--p8-ease),
    filter var(--p8-slide-dur) var(--p8-ease);
}
[data-tdev-scope] .p8-modal[data-page="1"] .p8-page-1,
[data-tdev-scope] .p8-modal[data-page="2"] .p8-page-2 {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
  filter: blur(0);
}

/* P9 — Number Pop-In */
[data-tdev-scope] {
  --p9-dur: 500ms;
  --p9-distance: 8px;
  --p9-stagger: 70ms;
  --p9-blur: 2px;
  --p9-ease: cubic-bezier(0.34, 1.45, 0.64, 1);
}
@keyframes tdev-p9-pop-in {
  0% {
    transform: translateY(var(--p9-distance));
    opacity: 0;
    filter: blur(var(--p9-blur));
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    filter: blur(0);
  }
}
[data-tdev-scope] .p9-number { display: inline-flex; gap: 1px; }
[data-tdev-scope] .p9-char { display: inline-block; opacity: 1; }
[data-tdev-scope] .p9-number.is-animating .p9-char {
  animation: tdev-p9-pop-in var(--p9-dur) var(--p9-ease) both;
}

@media (prefers-reduced-motion: reduce) {
  [data-tdev-scope] *,
  [data-tdev-scope] *::before,
  [data-tdev-scope] *::after {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
    transform: none !important;
    filter: none !important;
  }
}
`

let stylesInjected = false
function useTransitionStyles() {
  React.useEffect(() => {
    if (stylesInjected || typeof document === "undefined") return
    const el = document.createElement("style")
    el.setAttribute("data-tdev-styles", "")
    el.textContent = TRANSITION_STYLES
    document.head.appendChild(el)
    stylesInjected = true
  }, [])
}

function TransitionScope({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  useTransitionStyles()
  return (
    <div
      data-tdev-scope
      className={cn("flex flex-col items-center gap-3", className)}
    >
      {children}
    </div>
  )
}

const triggerBtn =
  "rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:bg-muted"

/* ─── P1 — Notification Badge ─────────────────────────────────────── */
export function P1Bell() {
  const [open, setOpen] = React.useState(false)
  return (
    <TransitionScope>
      <div className="p1-bell" data-badge-open={open ? "true" : "false"}>
        <Icon icon="tabler:bell" className="h-7 w-7 text-foreground" />
        <span className="p1-bell-badge">
          <span className="p1-bell-badge-inner">1</span>
        </span>
      </div>
      <button type="button" onClick={() => setOpen((v) => !v)} className={triggerBtn}>
        {open ? "Hide badge" : "Show badge"}
      </button>
    </TransitionScope>
  )
}

/* ─── P2 — Menu Dropdown ──────────────────────────────────────────── */
export function P2Menu() {
  const [state, setState] = React.useState<"closed" | "open" | "closing">("closed")
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  function toggle() {
    if (timer.current) clearTimeout(timer.current)
    if (state === "closed") setState("open")
    else {
      setState("closing")
      timer.current = setTimeout(() => setState("closed"), 150)
    }
  }
  return (
    <TransitionScope>
      <button type="button" onClick={toggle} className={triggerBtn}>
        Toggle menu
      </button>
      <div
        className={cn(
          "p2-dropdown w-44 rounded-[10px] border border-border bg-card p-3 shadow-md",
          state === "open" && "is-open",
          state === "closing" && "is-closing",
        )}
      >
        <div className="tdev-sk mb-2 h-2 w-3/4" />
        <div className="tdev-sk mb-2 h-2 w-1/2" />
        <div className="tdev-sk h-2 w-2/3" />
      </div>
    </TransitionScope>
  )
}

/* ─── P3 — Panel Reveal ───────────────────────────────────────────── */
export function P3Panel() {
  const [open, setOpen] = React.useState(true)
  return (
    <TransitionScope className="items-stretch">
      <div className="p3-panel-clip">
        <div className={cn("p3-panel", open && "is-open")}>
          <div className="tdev-sk h-2 w-3/5" />
          <div className="tdev-sk h-2 w-2/5" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="tdev-sk h-12 w-full rounded-md" />
            <div className="tdev-sk h-12 w-full rounded-md" />
            <div className="tdev-sk h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
      <button type="button" onClick={() => setOpen((v) => !v)} className={cn(triggerBtn, "self-center")}>
        {open ? "Hide panel" : "Reveal panel"}
      </button>
    </TransitionScope>
  )
}

/* ─── P4 — Card Resize ────────────────────────────────────────────── */
export function P4Resize() {
  const [small, setSmall] = React.useState(false)
  return (
    <TransitionScope>
      <div className={cn("p4-card", small && "is-small")}>
        <div className="tdev-sk h-3 w-full" />
        <div className="tdev-sk h-3 w-2/3" />
        <div className="tdev-sk h-3 w-3/4" />
        <div className="tdev-sk h-3 w-1/2" />
        <div className="tdev-sk h-3 w-3/4" />
        <div className="tdev-sk h-3 w-2/3" />
      </div>
      <button type="button" onClick={() => setSmall((v) => !v)} className={triggerBtn}>
        Animate
      </button>
    </TransitionScope>
  )
}

/* ─── P5 — Icon Swap (Sun/Moon) ───────────────────────────────────── */
export function P5IconSwap() {
  const [active, setActive] = React.useState<"moon" | "sun">("moon")
  return (
    <TransitionScope>
      <button
        type="button"
        onClick={() => setActive((v) => (v === "moon" ? "sun" : "moon"))}
        className="rounded-full border border-border bg-card p-2 hover:bg-muted"
        aria-label="Toggle theme icon"
      >
        <span className="p5-icon-stack" data-active={active}>
          <span className="p5-icon p5-icon-moon">
            <Icon icon="tabler:moon" className="h-5 w-5" />
          </span>
          <span className="p5-icon p5-icon-sun">
            <Icon icon="tabler:sun" className="h-5 w-5" />
          </span>
        </span>
      </button>
      <span className="text-xs text-muted-foreground">Click to swap</span>
    </TransitionScope>
  )
}

/* ─── P6 — Text Swap ──────────────────────────────────────────────── */
const P6_MESSAGES = [
  "Transaction processing…",
  "Confirming with bank…",
  "Almost there…",
  "Payment complete",
]
export function P6TextSwap() {
  const [index, setIndex] = React.useState(0)
  const [phase, setPhase] = React.useState<"idle" | "exit" | "enter-start" | "enter">("idle")
  const exitTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const enterTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current)
      if (enterTimer.current) clearTimeout(enterTimer.current)
    },
    [],
  )
  function advance() {
    if (phase !== "idle") return
    setPhase("exit")
    exitTimer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % P6_MESSAGES.length)
      setPhase("enter-start")
      enterTimer.current = setTimeout(() => {
        setPhase("enter")
        setTimeout(() => setPhase("idle"), 220)
      }, 20)
    }, 220)
  }
  return (
    <TransitionScope>
      <div className="flex h-8 items-center justify-center overflow-hidden px-3">
        <span
          className={cn(
            "p6-text text-sm font-medium text-foreground",
            phase === "exit" && "is-exit",
            phase === "enter-start" && "is-enter-start",
          )}
        >
          {P6_MESSAGES[index]}
        </span>
      </div>
      <button type="button" onClick={advance} className={triggerBtn}>
        Next message
      </button>
    </TransitionScope>
  )
}

/* ─── P7 — Modal Open/Close ───────────────────────────────────────── */
export function P7Modal() {
  const [state, setState] = React.useState<"closed" | "open" | "closing">("closed")
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  function toggle() {
    if (timer.current) clearTimeout(timer.current)
    if (state === "closed") setState("open")
    else {
      setState("closing")
      timer.current = setTimeout(() => setState("closed"), 150)
    }
  }
  return (
    <TransitionScope>
      <button type="button" onClick={toggle} className={triggerBtn}>
        {state === "closed" ? "Open modal" : "Close modal"}
      </button>
      <div
        className={cn(
          "p7-dialog w-56 rounded-[12px] border border-border bg-card p-4",
          state === "open" && "is-open",
          state === "closing" && "is-closing",
        )}
      >
        <div className="tdev-sk mb-3 h-3 w-1/2" />
        <div className="tdev-sk mb-2 h-2 w-full" />
        <div className="tdev-sk mb-2 h-2 w-4/5" />
        <div className="tdev-sk mb-3 h-2 w-3/4" />
        <div className="flex gap-1.5">
          <div className="tdev-sk h-5 w-12 rounded-full" />
          <div className="tdev-sk h-5 w-16 rounded-full" />
        </div>
      </div>
    </TransitionScope>
  )
}

/* ─── P8 — Page Slide ─────────────────────────────────────────────── */
export function P8PageSlide() {
  const [page, setPage] = React.useState<1 | 2>(1)
  return (
    <TransitionScope className="items-stretch">
      <div
        className="p8-modal relative h-32 w-full overflow-hidden rounded-[10px] border border-border bg-card"
        data-page={page}
      >
        <div className="p8-page p8-page-1 absolute inset-0 p-4">
          <div className="tdev-sk mb-2 h-3 w-1/3" />
          <div className="tdev-sk mb-1.5 h-2 w-full" />
          <div className="tdev-sk mb-1.5 h-2 w-5/6" />
          <div className="tdev-sk h-2 w-2/3" />
        </div>
        <div className="p8-page p8-page-2 absolute inset-0 p-4">
          <div className="tdev-sk mb-2 h-3 w-2/5" />
          <div className="grid grid-cols-3 gap-2">
            <div className="tdev-sk h-12 w-full rounded-md" />
            <div className="tdev-sk h-12 w-full rounded-md" />
            <div className="tdev-sk h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={cn(triggerBtn, "disabled:opacity-40")}
        >
          Page 1
        </button>
        <button
          type="button"
          onClick={() => setPage(2)}
          disabled={page === 2}
          className={cn(triggerBtn, "disabled:opacity-40")}
        >
          Page 2
        </button>
      </div>
    </TransitionScope>
  )
}

/* ─── P9 — Number Pop-In ──────────────────────────────────────────── */
function randomPrice() {
  return (Math.random() * 90 + 10).toFixed(2)
}
export function P9Number() {
  const [value, setValue] = React.useState("65.78")
  const [animKey, setAnimKey] = React.useState(0)
  const cooldown = React.useRef(false)
  function animate() {
    if (cooldown.current) return
    cooldown.current = true
    setValue(randomPrice())
    setAnimKey((k) => k + 1)
    setTimeout(() => {
      cooldown.current = false
    }, 550)
  }
  return (
    <TransitionScope>
      <div
        key={animKey}
        className="p9-number is-animating font-mono text-2xl font-semibold tabular-nums text-foreground"
        aria-live="polite"
      >
        {value.split("").map((ch, i) => (
          <span
            key={`${animKey}-${i}`}
            className="p9-char"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {ch}
          </span>
        ))}
      </div>
      <button type="button" onClick={animate} className={triggerBtn}>
        Animate
      </button>
    </TransitionScope>
  )
}

export const Transitions = {
  P1Bell,
  P2Menu,
  P3Panel,
  P4Resize,
  P5IconSwap,
  P6TextSwap,
  P7Modal,
  P8PageSlide,
  P9Number,
}
