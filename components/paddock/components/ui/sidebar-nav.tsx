"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, primaryFace, focusRing, formFieldBase, wellInset } from "./_shared"

// SidebarNav: the app's left rail, with a workspace row, a search field,
// grouped links, a grey wash that glides between links on hover, the current
// page on a flat grey highlight, and the storage meter at the foot.
//
// Usage:
//   <SidebarNav />

const ITEMS = [
  { key: "overview", label: "Overview", section: "Workspace", icon: "mingcute:layout-grid-line" },
  { key: "projects", label: "Projects", section: "Workspace", icon: "mingcute:folder-line", count: true },
  { key: "reports", label: "Reports", section: "Workspace", icon: "mingcute:chart-bar-line" },
  { key: "invoices", label: "Invoices", section: "Finance", icon: "mingcute:wallet-line", plus: true },
  { key: "people", label: "People", section: "Finance", icon: "mingcute:group-line" },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

/**
 * Paddock SidebarNav: a white rail card. The workspace mark is a round slate
 * tile, search is the white bordered field, the current page sits on the flat
 * grey highlight with a white count chip, and a fainter wash follows the pointer.
 */
function SidebarNav({
  workspace = "Fernbrook",
  detail = "Team workspace",
  className,
  ...props
}: SidebarNavProps) {
  const [active, setActive] = React.useState("projects")
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [box, setBox] = React.useState<{ top: number; height: number } | null>(null)
  const [query, setQuery] = React.useState("")
  const [badge, setBadge] = React.useState(9)
  const sections = ["Workspace", "Finance"]
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
    <div className={cn(cardSlab, "flex w-64 flex-col rounded-2xl p-3", className)} {...props}>
      <button
        type="button"
        className={cn(
          focusRing,
          "mb-3 flex w-full items-center gap-3 rounded-lg p-1.5 text-left transition-colors duration-fast hover:bg-accent/60",
        )}
      >
        <span
          className={cn(
            primaryFace,
            "flex size-9 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold",
          )}
        >
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.9375rem] font-semibold text-foreground">{workspace}</span>
          <span className="block truncate text-xs text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="mingcute:selector-vertical-line" aria-hidden="true" className="size-4 text-muted-foreground" />
      </button>

      <label
        className={cn(
          formFieldBase,
          "mb-3 flex h-9 items-center gap-2 ps-3 pe-1.5 focus-within:ring-2 focus-within:ring-ring",
        )}
      >
        <Icon icon="mingcute:search-line" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          aria-label="Search links"
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd
          className={cn(
            wellInset,
            "flex h-5.5 items-center rounded-sm px-1.5 font-mono text-xs text-muted-foreground",
          )}
        >
          ⌘K
        </kbd>
      </label>

      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1)
          setActive("projects")
        }}
        className={cn(
          focusRing,
          "mb-4 flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-[0.9375rem] font-medium text-foreground transition-colors duration-fast hover:bg-accent/60",
        )}
      >
        <Icon icon="mingcute:add-circle-line" aria-hidden="true" className="size-4 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-left">New project</span>
      </button>

      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 rounded-md bg-accent/60 transition-[top,height,opacity] duration-base ease-out"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
          }}
        />
        {sections.map((section) => {
          const items = visible.filter((item) => item.section === section)
          if (items.length === 0) return null
          return (
            <div key={section}>
              <div className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">{section}</div>
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
                        "group relative z-10 flex h-9.5 w-full items-center gap-3 rounded-md px-2.5 text-left",
                        isActive && "bg-accent",
                      )}
                    >
                      <Icon
                        icon={item.icon}
                        aria-hidden="true"
                        className={cn("size-4 shrink-0", isActive ? "text-foreground" : "text-muted-foreground")}
                      />
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-[0.9375rem] transition-colors duration-fast",
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-secondary-foreground group-hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.count && (
                        <span
                          key={badge}
                          className={cn(
                            "flex h-5 min-w-6 animate-in zoom-in-90 fade-in items-center justify-center rounded-sm px-1.5 text-xs font-medium tabular-nums text-secondary-foreground duration-base",
                            isActive ? "bg-card shadow-(--card-ring)" : "bg-secondary",
                          )}
                        >
                          {badge}
                        </span>
                      )}
                      {item.plus && (
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-sm text-muted-foreground transition-opacity duration-fast hover:bg-secondary hover:text-foreground",
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                          )}
                        >
                          <Icon icon="mingcute:add-line" aria-hidden="true" className="size-3" />
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

      <div className="mt-5 rounded-lg bg-muted p-3.5">
        <div className="flex items-center justify-between text-[0.8125rem] font-medium text-foreground">
          <span>Storage</span>
          <span className="tabular-nums">64%</span>
        </div>
        <div
          role="meter"
          aria-label="Storage used"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={64}
          className="mt-2.5 mb-2 h-1 overflow-hidden rounded-xs bg-card"
        >
          <div className="h-full w-2/3 rounded-xs bg-primary" />
        </div>
        <p className="text-xs text-muted-foreground">32 GB of 50 GB used</p>
      </div>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface SidebarNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

/** Paddock SidebarNavSection: a small muted group label over its links. */
function SidebarNavSection({ label, className, children, ...props }: SidebarNavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <span className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

interface SidebarNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  count?: number
  active?: boolean
}

/** Paddock SidebarNavItem: a rail link; the current one sits on the grey highlight with a white count chip. */
function SidebarNavItem({ label, count, active = false, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        focusRing,
        "flex h-9.5 items-center justify-between gap-2 rounded-md px-2.5 text-left text-[0.9375rem] transition-colors duration-fast",
        active
          ? "bg-accent font-semibold text-foreground"
          : "text-secondary-foreground hover:bg-accent/60 hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "flex h-5 min-w-6 items-center justify-center rounded-sm px-1.5 text-xs font-medium tabular-nums text-secondary-foreground",
            active ? "bg-card shadow-(--card-ring)" : "bg-secondary",
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
