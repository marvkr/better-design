"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import {
  cardSlab,
  creamBevel,
  focusRing,
  raisedBevel,
  wellInset,
} from "./_shared"

// SidebarNav: the left rail of a docs site, with a search pill, grouped
// pages, a hover wash that glides between links, and the current page
// raised as a graphite bevel.
//
// Usage:
//   <SidebarNav />

const ITEMS = [
  { key: "introduction", label: "Introduction", section: "Get started", icon: "ph:book-open" },
  { key: "quickstart", label: "Quickstart", section: "Get started", icon: "ph:lightning", count: true },
  { key: "authentication", label: "Authentication", section: "Get started", icon: "ph:lock-simple" },
  { key: "endpoints", label: "Endpoints", section: "API reference", icon: "ph:terminal", plus: true },
  { key: "webhooks", label: "Webhooks", section: "API reference", icon: "ph:share-network" },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

/**
 * Burnished SidebarNav: a rail on an umber slab. The workspace mark is a
 * small cream bevel tile, search is a graphite bevel pill, and the current
 * page rises as a raised graphite bevel while a faint wash follows the
 * pointer between the others.
 */
function SidebarNav({
  workspace = "Acme API",
  detail = "Documentation v2.4",
  className,
  ...props
}: SidebarNavProps) {
  const [active, setActive] = React.useState("quickstart")
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [box, setBox] = React.useState<{ top: number; height: number } | null>(null)
  const [query, setQuery] = React.useState("")
  const [badge, setBadge] = React.useState(4)
  const sections = ["Get started", "API reference"]
  const navRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({})

  React.useLayoutEffect(() => {
    const container = navRef.current
    const target = hovered ? itemRefs.current[hovered] : null
    if (!container || !target || hovered === active) {
      setBox(null)
      return
    }
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setBox({ top: targetRect.top - containerRect.top, height: targetRect.height })
  }, [hovered, active])

  const visible = ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className={cn(cardSlab, "w-64 rounded-2xl p-3", className)} {...props}>
      <button
        type="button"
        className={cn(
          focusRing,
          "mb-3 flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-colors duration-fast",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60",
        )}
      >
        <span
          className={cn(
            creamBevel,
            "flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
          )}
        >
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold leading-tight text-foreground">{workspace}</span>
          <span className="block truncate text-[0.6875rem] leading-tight text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="ph:caret-up-down" aria-hidden="true" className="size-3.5 text-muted-foreground" />
      </button>

      <label
        className={cn(
          "mb-3 flex h-9 items-center gap-2 rounded-full bg-(image:--fill-raised) ps-3 pe-1.5 shadow-(--bevel-raised)",
          "transition-shadow duration-fast focus-within:shadow-(--bevel-raised-focus) focus-within:ring-3 focus-within:ring-ring",
        )}
      >
        <Icon icon="ph:magnifying-glass" aria-hidden="true" className="size-3.5 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs"
          aria-label="Search docs"
          className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd
          className={cn(
            wellInset,
            "flex h-5.5 items-center rounded-full px-1.5 font-mono text-[0.625rem] text-muted-foreground",
          )}
        >
          ⌘K
        </kbd>
      </label>

      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1)
          setActive("quickstart")
        }}
        className={cn(
          focusRing,
          "mb-3 flex w-full items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-semibold text-primary-text transition-colors duration-fast",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-glow/10",
        )}
      >
        <Icon icon="ph:plus-circle" aria-hidden="true" className="size-4" />
        <span className="min-w-0 flex-1 truncate text-left">New page</span>
      </button>

      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 rounded-full bg-accent/60"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition: "top 200ms var(--ease-out), height 200ms var(--ease-out), opacity 150ms var(--ease-out)",
          }}
        />
        {sections.map((section) => {
          const items = visible.filter((item) => item.section === section)
          if (items.length === 0) return null
          return (
            <div key={section}>
              <div className="px-2.5 pb-1.5 text-xs font-semibold text-muted-foreground">{section}</div>
              <div className="flex flex-col gap-0.5">
                {items.map((item) => {
                  const isActive = item.key === active
                  return (
                    <button
                      key={item.key}
                      ref={(el) => {
                        itemRefs.current[item.key] = el
                      }}
                      type="button"
                      onMouseEnter={() => setHovered(item.key)}
                      onFocus={() => setHovered(item.key)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setActive(item.key)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        focusRing,
                        "group relative z-10 flex min-h-9 w-full items-center gap-2 rounded-full px-2.5 py-1.5 text-left",
                        isActive && raisedBevel,
                      )}
                    >
                      <Icon
                        icon={item.icon}
                        aria-hidden="true"
                        className={cn("size-3.5 shrink-0", isActive ? "text-primary-text" : "text-muted-foreground")}
                      />
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm transition-colors duration-fast",
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.count && (
                        <span
                          key={badge}
                          className="flex h-5 min-w-5 animate-in zoom-in-90 fade-in items-center justify-center rounded-full bg-glow/15 px-1.5 text-[0.625rem] font-semibold tabular-nums text-primary-text duration-base"
                        >
                          {badge}
                        </span>
                      )}
                      {item.plus && (
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-full text-muted-foreground transition-opacity duration-fast",
                            "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                            isActive
                              ? "opacity-100"
                              : "opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-focus-visible:opacity-100",
                          )}
                        >
                          <Icon icon="ph:plus" aria-hidden="true" className="size-3" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface SidebarNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

/** Burnished SidebarNavSection: a muted group label over its links. */
function SidebarNavSection({ label, className, children, ...props }: SidebarNavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <span className="px-2.5 pb-1.5 text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

interface SidebarNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  count?: number
  active?: boolean
}

/** Burnished SidebarNavItem: a pill link; the current one is a graphite bevel. */
function SidebarNavItem({ label, count, active = false, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        focusRing,
        "flex min-h-9 items-center justify-between gap-2 rounded-full px-2.5 py-1.5 text-left text-sm",
        active
          ? cn(raisedBevel, "font-semibold")
          : cn(
              "text-muted-foreground transition-colors duration-fast",
              "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
            ),
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.625rem] font-semibold tabular-nums",
            active ? "bg-glow/15 text-primary-text" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
