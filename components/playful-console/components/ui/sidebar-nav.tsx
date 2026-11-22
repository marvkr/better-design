"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// SidebarNav: workspace navigation with direct selection, quick search, and
// a cream hover tile that glides between items. Playful console dresses it
// as a white card with chunky keys: the workspace badge is a small orange
// key, the search field a white well, and the current item a white key.
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
  activity: "ph:pulse-duotone",
  tasks: "ph:check-square-duotone",
  spaces: "ph:stack-duotone",
  dashboard: "ph:squares-four-duotone",
  analytics: "ph:chart-bar-duotone",
} as const satisfies Record<string, string>

const ITEM_ICON_LOOKUP: { readonly [kind: string]: string } = ITEM_ICONS

function ItemIcon({ kind }: { kind: string }) {
  return <Icon icon={ITEM_ICON_LOOKUP[kind] ?? "ph:circle-duotone"} className="size-4" aria-hidden="true" />
}

/** Converts a measured pixel offset to rem, so the tile follows the root size. */
function toRem(value: number) {
  return `${value / 16}rem`
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

/** A self-contained workspace navigation card with search and a gliding hover tile. */
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
  const itemRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({})

  React.useLayoutEffect(() => {
    const container = navRef.current
    const target = itemRefs.current[hovered ?? active]
    if (!container || !target) return
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setBox({ top: targetRect.top - containerRect.top, height: targetRect.height })
  }, [hovered, active])

  return (
    <div className={cn("w-60 rounded-lg border border-border bg-card p-2", className)} {...props}>
      {/* workspace row */}
      <button
        type="button"
        className="mb-2 flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors duration-fast hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border-[0.09375rem] border-(--primary-rim) bg-primary text-sm font-extrabold text-primary-foreground shadow-(--shadow-control)">
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold leading-tight text-foreground">{workspace}</span>
          <span className="block truncate text-xs leading-tight text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="ph:caret-up-down-bold" className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </button>

      {/* quick search */}
      <label className="mb-1 flex h-8 items-center gap-2 rounded-md border border-(--line-strong) bg-(--field) px-2.5 transition-[border-color,box-shadow] duration-fast focus-within:border-ring focus-within:ring-3 focus-within:ring-(--highlight-blue)">
        <Icon icon="ph:magnifying-glass-duotone" className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Quick search"
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex size-[1.125rem] items-center justify-center rounded-sm border border-(--line-strong) bg-card font-mono text-[0.625rem] text-muted-foreground shadow-(--shadow-control-off)">
          /
        </kbd>
      </label>

      {/* accent action */}
      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1)
          setActive("tasks")
        }}
        className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[0.8125rem] font-bold text-primary transition-colors duration-fast hover:bg-(--primary-wash) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="min-w-0 flex-1 truncate text-left">New task</span>
        <span className="flex size-4.5 shrink-0 items-center justify-center rounded-sm border border-(--primary-rim) bg-primary text-primary-foreground">
          <Icon icon="ph:plus-bold" className="size-2.5" aria-hidden="true" />
        </span>
      </button>

      {/* items */}
      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 rounded-md bg-secondary"
          style={{
            top: toRem(box?.top ?? 0),
            height: toRem(box?.height ?? 0),
            opacity: box ? 1 : 0,
            transition:
              "top 180ms cubic-bezier(0.23,1,0.32,1), height 180ms cubic-bezier(0.23,1,0.32,1), opacity 120ms ease",
          }}
        />
        {sections.map((section) => (
          <div key={section}>
            <div className="px-2 pb-1 pt-1 text-[0.6875rem] font-bold uppercase text-muted-foreground">
              {section}
            </div>
            <div className="flex flex-col gap-px">
              {ITEMS.filter((item) => item.section === section).map((item) => {
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
                      "group relative z-10 flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left transition-[color,background-color,border-color] duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      isActive ? "border-border bg-card shadow-(--shadow-control-off)" : "border-transparent",
                    )}
                  >
                    <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                      <ItemIcon kind={item.key} />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[0.8125rem] transition-colors duration-fast",
                        isActive ? "font-bold text-foreground" : "font-medium text-(--foreground-secondary)",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.count && (
                      <span
                        key={badge}
                        className="flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full border border-(--primary-rim) bg-primary px-1 font-mono text-[0.6563rem] font-semibold tabular-nums text-primary-foreground"
                        style={{ animation: "pc-pop-in 220ms cubic-bezier(0.34,1.56,0.64,1) both" }}
                      >
                        {badge}
                      </span>
                    )}
                    {item.plus && (
                      <span
                        className="flex size-[1.125rem] items-center justify-center rounded-sm text-muted-foreground opacity-0 transition-[background-color,color,opacity] duration-fast group-hover:opacity-100 hover:bg-(--surface-3) hover:text-foreground"
                        style={isActive ? { opacity: 1 } : undefined}
                      >
                        <Icon icon="ph:plus-bold" className="size-2.5" aria-hidden="true" />
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
        @keyframes pc-pop-in { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface SidebarNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

/** A labelled group of SidebarNavItem rows. */
function SidebarNavSection({ label, className, children, ...props }: SidebarNavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <span className="px-1.5 pb-1 text-[0.6875rem] font-bold uppercase text-muted-foreground">
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

/** One navigation row with an optional count badge; `active` marks the current page. */
function SidebarNavItem({ label, count, active = false, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md border px-2 py-1.5 text-left text-[0.8125rem] transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "border-border bg-card font-bold text-foreground shadow-(--shadow-control-off)"
          : "border-transparent font-medium text-(--foreground-secondary) hover:bg-secondary hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-(--primary-wash) px-1 font-mono text-[0.6563rem] font-semibold text-primary tabular-nums">
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
