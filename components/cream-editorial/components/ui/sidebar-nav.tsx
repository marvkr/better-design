"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// SidebarNav: workspace navigation with direct selection, quick search, and
// an oat tab that glides between items under the pointer.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <SidebarNav />

const ITEMS = [
  { key: "activity", label: "Home", section: "Workspace" },
  { key: "tasks", label: "Agent tasks", section: "Workspace", count: true },
  { key: "dashboard", label: "Inbox", section: "Workspace" },
  { key: "spaces", label: "Suppliers", section: "Objects", plus: true },
  { key: "analytics", label: "Inventory", section: "Objects" },
]

const ITEM_ICONS = {
  activity: "ph:sparkle",
  tasks: "ph:check-circle",
  dashboard: "ph:file-text",
  spaces: "ph:user",
  analytics: "ph:trend-up",
} as const satisfies Record<string, string>

function ItemIcon({ kind }: { kind: string }) {
  const icon = Object.entries(ITEM_ICONS).find(([key]) => key === kind)?.[1] ?? "ph:circle"
  return <Icon icon={icon} className="size-4" aria-hidden="true" />
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

function SidebarNav({
  workspace = "Creamery Ops",
  detail = "Production Workspace",
  className,
  ...props
}: SidebarNavProps) {
  const [active, setActive] = React.useState("tasks")
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [box, setBox] = React.useState<{ top: number; height: number } | null>(null)
  const [query, setQuery] = React.useState("")
  const [badge, setBadge] = React.useState(4)
  const sections = ["Workspace", "Objects"]
  const navRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef(new Map<string, HTMLButtonElement>())

  React.useLayoutEffect(() => {
    const container = navRef.current
    const target = itemRefs.current.get(hovered ?? active)
    if (!container || !target) return
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setBox({ top: targetRect.top - containerRect.top, height: targetRect.height })
  }, [hovered, active])

  return (
    <div className={cn("w-60 rounded-xl border border-border bg-card p-2", className)} {...props}>
      {/* workspace row */}
      <button
        type="button"
        className="mb-2 flex w-full items-center gap-2.5 rounded-md p-1.5 text-left outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground font-serif text-base font-medium text-background">
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.8125rem] font-medium leading-tight text-foreground">{workspace}</span>
          <span className="block truncate text-xs leading-tight text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="ph:caret-up-down" className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </button>

      {/* quick search */}
      <label className="mb-1 flex h-8 items-center gap-2 rounded-md border border-(--line-strong) bg-(--field) px-2.5 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring">
        <Icon icon="ph:magnifying-glass" className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Quick search"
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex size-4.5 items-center justify-center rounded-sm border border-border bg-secondary font-sans text-[0.625rem] text-muted-foreground">
          /
        </kbd>
      </label>

      {/* the one terracotta action */}
      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1)
          setActive("tasks")
        }}
        className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[0.8125rem] font-medium text-(--primary-text) outline-none transition-colors duration-fast hover:bg-(--primary-wash) focus-visible:ring-3 focus-visible:ring-ring"
      >
        <span className="min-w-0 flex-1 truncate text-left">New task</span>
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon icon="ph:plus" className="size-2.5" aria-hidden="true" />
        </span>
      </button>

      {/* items */}
      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 rounded-md bg-muted motion-reduce:transition-none"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition:
              "top 200ms cubic-bezier(0.23,1,0.32,1), height 200ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease-out",
          }}
        />
        {sections.map((section) => (
          <div key={section}>
            <div className="px-2 pb-1 pt-1 text-xs font-medium text-muted-foreground">
              {section}
            </div>
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
                    className="group relative z-10 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span className={isActive ? "text-foreground" : "text-muted-foreground"}>
                      <ItemIcon kind={item.key} />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[0.8125rem] transition-colors duration-fast",
                        isActive ? "font-medium text-foreground" : "text-(--foreground-secondary)",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.count && (
                      <span
                        key={badge}
                        className={cn(
                          "flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-medium tabular-nums motion-reduce:animate-none",
                          isActive ? "bg-background text-foreground" : "bg-secondary text-(--foreground-secondary)",
                        )}
                        style={{ animation: "ce-count-in 200ms ease-out both" }}
                      >
                        {badge}
                      </span>
                    )}
                    {item.plus && (
                      <span
                        className={cn(
                          "flex size-4.5 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,opacity] duration-fast group-hover:opacity-100 hover:bg-secondary hover:text-foreground",
                          isActive ? "opacity-100" : "opacity-0",
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
      <style>{`
        @keyframes ce-count-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
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
      <span className="px-2 pb-1 text-xs font-medium text-muted-foreground">
        {label}
      </span>
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
        "flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
        active ? "bg-muted font-medium text-foreground" : "text-(--foreground-secondary) hover:bg-secondary hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-secondary px-1.5 text-[0.6875rem] font-medium text-(--foreground-secondary) tabular-nums">
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
