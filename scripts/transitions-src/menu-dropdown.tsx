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
  /* hidden keeps the closed menu out of the tab order and the a11y tree.
     .is-closing holds it visible while the close runs; the JS timer drops that
     class when the close ends, so this state applies at once, with no delay. */
  visibility: hidden;
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
  visibility: visible;
}
.t-dropdown.is-closing {
  transform: scale(var(--dropdown-closing-scale));
  opacity: 0;
  pointer-events: none;
  /* stay visible for the length of the close */
  visibility: visible;
  transition:
    transform var(--dropdown-close-dur) var(--dropdown-ease),
    opacity   var(--dropdown-close-dur) var(--dropdown-ease);
}
@media (prefers-reduced-motion: reduce) {
  .t-dropdown { transition: none !important; }
}
`

// useInsertionEffect runs before the browser paints, so the resting state
// these rules define lands on the first frame instead of after it. The DOM
// query replaces a module-level flag, which stayed true if the tag was ever
// removed and never fired for a second document.
function useStyles() {
  React.useInsertionEffect(() => {
    if (typeof document === "undefined") return
    if (document.querySelector('style[data-t-menu-dropdown]')) return
    const el = document.createElement("style")
    el.setAttribute("data-t-menu-dropdown", "")
    el.textContent = MENU_DROPDOWN_CSS
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
  triggerLabel = "Toggle menu",
  onSelect,
  className,
}: {
  items?: React.ReactNode[]
  origin?: DropdownOrigin
  triggerLabel?: string
  /** Called with the index of the chosen item. */
  onSelect?: (index: number) => void
  className?: string
}) {
  useStyles()
  const scopeRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const id = React.useId()
  const triggerId = `${id}-trigger`
  const menuId = `${id}-menu`
  const [state, setState] = React.useState<"closed" | "open" | "closing">("closed")
  // ArrowUp on the trigger opens onto the last item; everything else onto the first.
  const openOnto = React.useRef<"first" | "last">("first")

  const menuItems = () =>
    Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])
  const focusItem = (onto: "first" | "last") => {
    const els = menuItems()
    ;(onto === "last" ? els[els.length - 1] : els[0])?.focus()
  }

  React.useEffect(() => {
    if (state !== "closing") return
    const ms = readMs(scopeRef.current, "--dropdown-close-dur", 150)
    const id = window.setTimeout(() => setState("closed"), ms)
    return () => window.clearTimeout(id)
  }, [state])

  // Move focus into the menu once it is visible. The items carry
  // tabIndex={-1}, so arrows move within the menu and Tab leaves it.
  React.useEffect(() => {
    if (state !== "open") return
    focusItem(openOnto.current)

    const onPointerDown = (e: PointerEvent) => {
      if (!scopeRef.current?.contains(e.target as Node)) setState("closing")
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [state])

  const open = (onto: "first" | "last") => {
    openOnto.current = onto
    // Already open: the focus effect will not run again, so move focus here.
    if (state === "open") focusItem(onto)
    else setState("open")
  }
  const close = () => {
    setState("closing")
    triggerRef.current?.focus()
  }

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    // Focus stays on the trigger when the menu has no items.
    if (e.key === "Escape" && state === "open") {
      e.preventDefault()
      close()
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      open(e.key === "ArrowUp" ? "last" : "first")
    }
  }

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const els = menuItems()
    const n = els.length
    if (n === 0) return
    const i = els.indexOf(document.activeElement as HTMLElement)
    let next: HTMLElement | undefined
    switch (e.key) {
      case "ArrowDown":
        next = els[(i + 1) % n]
        break
      case "ArrowUp":
        next = els[i <= 0 ? n - 1 : i - 1]
        break
      case "Home":
        next = els[0]
        break
      case "End":
        next = els[n - 1]
        break
      case "Escape":
        e.preventDefault()
        close()
        return
      case "Tab":
        // Let Tab move focus on as normal; the menu just closes behind it.
        setState("closing")
        return
      default:
        return
    }
    e.preventDefault()
    next.focus()
  }

  return (
    <div ref={scopeRef} className={cn("t-dropdown-scope relative inline-flex flex-col items-center gap-2", className)}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={state === "open"}
        aria-controls={menuId}
        onClick={() => (state === "open" ? close() : open("first"))}
        onKeyDown={onTriggerKeyDown}
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        {triggerLabel}
      </button>
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        data-origin={origin}
        onKeyDown={onMenuKeyDown}
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
            tabIndex={-1}
            onClick={() => {
              // Close first, so focus the consumer moves in onSelect stays put.
              close()
              onSelect?.(i)
            }}
            className="block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
