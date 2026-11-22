"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// SidebarNav: the left rail of a docs site, with a search pill, grouped
// pages, a hover tile that glides between links, and the current page in
// the green wash.
//
// Usage:
//   <SidebarNav />

const ITEMS = [
  { key: "introduction", label: "Introduction", section: "Get started", icon: "feather:book-open" },
  { key: "quickstart", label: "Quickstart", section: "Get started", icon: "feather:zap", count: true },
  { key: "authentication", label: "Authentication", section: "Get started", icon: "feather:lock" },
  { key: "endpoints", label: "Endpoints", section: "API reference", icon: "feather:terminal", plus: true },
  { key: "webhooks", label: "Webhooks", section: "API reference", icon: "feather:share-2" },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

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
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})

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
    <div className={cn("w-60 rounded-xl border border-border bg-background p-3", className)} {...props}>
      <button
        type="button"
        className="mb-3 flex w-full items-center gap-2.5 rounded-md p-1.5 text-left outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold leading-tight text-foreground">{workspace}</span>
          <span className="block truncate text-[0.6875rem] leading-tight text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="feather:chevron-down" aria-hidden="true" className="size-3.5 text-muted-foreground" />
      </button>

      <label className="mb-3 flex h-8 items-center gap-2 rounded-full border border-border bg-secondary px-3 transition-shadow duration-fast focus-within:ring-3 focus-within:ring-ring">
        <Icon icon="feather:search" aria-hidden="true" className="size-3.5 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs"
          aria-label="Search docs"
          className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex h-4.5 items-center rounded-sm border border-border bg-background px-1 font-mono text-[0.625rem] text-muted-foreground">
          ⌘K
        </kbd>
      </label>

      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1)
          setActive("quickstart")
        }}
        className="mb-3 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-(--primary-text) outline-none transition-colors duration-fast hover:bg-(--primary-wash) focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Icon icon="feather:plus-circle" aria-hidden="true" className="size-4" />
        <span className="min-w-0 flex-1 truncate text-left">New page</span>
      </button>

      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 rounded-md bg-secondary"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition: "top 200ms ease-out, height 200ms ease-out, opacity 150ms ease-out",
          }}
        />
        {sections.map((section) => {
          const items = visible.filter((item) => item.section === section)
          if (items.length === 0) return null
          return (
            <div key={section}>
              <div className="px-2 pb-1.5 text-xs font-semibold text-foreground">{section}</div>
              <div className="flex flex-col gap-px">
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
                        "group relative z-10 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
                        isActive && "bg-(--primary-wash)",
                      )}
                    >
                      <Icon
                        icon={item.icon}
                        aria-hidden="true"
                        className={cn("size-3.5 shrink-0", isActive ? "text-(--primary-text)" : "text-muted-foreground")}
                      />
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm transition-colors duration-fast",
                          isActive ? "font-medium text-(--primary-text)" : "text-(--foreground-secondary) group-hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.count && (
                        <span
                          key={badge}
                          className="flex h-4.5 min-w-4.5 animate-in zoom-in-90 fade-in items-center justify-center rounded-full bg-background px-1.5 text-[0.625rem] font-semibold tabular-nums text-(--primary-text) ring-1 ring-(--primary-line) duration-base"
                        >
                          {badge}
                        </span>
                      )}
                      {item.plus && (
                        <span
                          className={cn(
                            "flex size-4.5 items-center justify-center rounded-sm text-muted-foreground transition-opacity duration-fast hover:bg-muted hover:text-foreground",
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                          )}
                        >
                          <Icon icon="feather:plus" aria-hidden="true" className="size-3" />
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

function SidebarNavSection({ label, className, children, ...props }: SidebarNavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-px", className)} {...props}>
      <span className="px-2 pb-1.5 text-xs font-semibold text-foreground">{label}</span>
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
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
        active
          ? "bg-(--primary-wash) font-medium text-(--primary-text)"
          : "text-(--foreground-secondary) hover:bg-secondary hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-secondary px-1.5 text-[0.625rem] font-semibold tabular-nums text-muted-foreground">
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
