"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// SidebarNav: workspace navigation with direct selection, quick search, and
// a hover row that glides between items.
//
// Ink mail: a card on the black page, grey nav labels that turn to full ink
// under the pointer, and a white wash behind the hovered or current row. The
// one bright pixel is the small off-white plus on the "New email" action.
//
// Usage:
//   <SidebarNav />

const ITEMS = [
  { key: "emails", label: "Emails", icon: "ph:envelope-simple", section: "Sending", count: true },
  { key: "broadcasts", label: "Broadcasts", icon: "ph:paper-plane-tilt", section: "Sending" },
  { key: "logs", label: "Logs", icon: "ph:terminal-window", section: "Sending" },
  { key: "domains", label: "Domains", icon: "ph:globe", section: "Setup", plus: true },
  { key: "keys", label: "API keys", icon: "ph:key", section: "Setup" },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

/** Pixel offsets from layout, converted to rem so the glide stays in rem units. */
function toRem(value: number) {
  const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  return `${value / root}rem`
}

function SidebarNav({
  workspace = "Acme Mail",
  detail = "Production",
  className,
  ...props
}: SidebarNavProps) {
  const [active, setActive] = React.useState("emails")
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [box, setBox] = React.useState<{ top: string; height: string } | null>(null)
  const [query, setQuery] = React.useState("")
  const [badge, setBadge] = React.useState(4)
  const sections = ["Sending", "Setup"]
  const navRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef(new Map<string, HTMLButtonElement>())

  React.useLayoutEffect(() => {
    const container = navRef.current
    const target = itemRefs.current.get(hovered ?? active)
    if (!container || !target) return
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setBox({ top: toRem(targetRect.top - containerRect.top), height: toRem(targetRect.height) })
  }, [hovered, active])

  return (
    <div className={cn("w-60 rounded-lg border border-border bg-card p-2", className)} {...props}>
      {/* workspace row */}
      <button
        type="button"
        className="mb-2 flex w-full items-center gap-2.5 rounded-md p-1.5 text-start transition-colors duration-fast hover:bg-secondary outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-(--line-strong) bg-secondary text-sm font-semibold text-foreground">
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium leading-tight text-foreground">{workspace}</span>
          <span className="block truncate text-xs leading-tight text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="ph:caret-up-down" className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </button>

      {/* quick search */}
      <label className="mb-1 flex h-8 items-center gap-2 rounded-md border border-(--line-strong) bg-(--field) px-2.5 focus-within:border-foreground focus-within:ring-3 focus-within:ring-ring">
        <Icon icon="ph:magnifying-glass" className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Quick search"
          aria-label="Quick search"
          className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex size-4.5 items-center justify-center rounded-sm border border-(--line-strong) bg-secondary font-mono text-xs text-muted-foreground">
          /
        </kbd>
      </label>

      {/* primary action */}
      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1)
          setActive("emails")
        }}
        className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-secondary outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <span className="min-w-0 flex-1 truncate text-start">New email</span>
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon icon="ph:plus" className="size-2.5" aria-hidden="true" />
        </span>
      </button>

      {/* items */}
      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 rounded-md bg-(--wash)",
            "transition-[top,height,opacity] duration-base ease-out motion-reduce:transition-none",
            box ? "opacity-100" : "opacity-0",
          )}
          style={{ top: box?.top ?? 0, height: box?.height ?? 0 }}
        />
        {sections.map((section) => (
          <div key={section}>
            <div className="px-2 pb-1 pt-1 text-xs font-medium text-muted-foreground">{section}</div>
            <div className="flex flex-col gap-px">
              {ITEMS.filter((item) => item.section === section).map((item) => {
                const isActive = item.key === active
                return (
                  <button
                    key={item.key}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.key, el)
                      else itemRefs.current.delete(item.key)
                    }}
                    type="button"
                    onMouseEnter={() => setHovered(item.key)}
                    onFocus={() => setHovered(item.key)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setActive(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative z-10 flex h-8 w-full items-center gap-2 rounded-md px-2 text-start outline-none focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <Icon
                      icon={item.icon}
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 transition-colors duration-fast",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm transition-colors duration-fast",
                        isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.count && (
                      <span
                        key={badge}
                        className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full border border-(--line-strong) bg-secondary px-1 text-xs font-medium tabular-nums text-(--foreground-secondary) animate-in fade-in-0 zoom-in-90 duration-base"
                      >
                        {badge}
                      </span>
                    )}
                    {item.plus && (
                      <span
                        className={cn(
                          "flex size-4.5 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,opacity] duration-fast hover:bg-secondary hover:text-foreground",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        )}
                      >
                        <Icon icon="ph:plus" className="size-3" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface SidebarNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

function SidebarNavSection({ label, className, children, ...props }: SidebarNavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <span className="px-2 pb-1 text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

interface SidebarNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  count?: number
  active?: boolean
}

function SidebarNavItem({ label, count, active = false, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-8 items-center justify-between gap-2 rounded-md px-2 text-start text-sm transition-colors duration-fast outline-none focus-visible:ring-3 focus-visible:ring-ring",
        active
          ? "bg-(--wash) font-medium text-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full border border-(--line-strong) bg-secondary px-1 text-xs font-medium tabular-nums text-(--foreground-secondary)">
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
