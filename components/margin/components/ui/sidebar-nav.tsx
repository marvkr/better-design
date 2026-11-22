"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"
import { Button } from "./button"

// SidebarNav: the workspace rail from a notes app. A brand row, a grey
// search field, an oxblood "New note" button, grouped destinations, and the
// current page on a paper tab with an oxblood bar on the rail's left edge.
//
// Usage:
//   <SidebarNav />

const ITEMS = [
  { key: "home", label: "Home", section: "Workspace", icon: "solar:home-2-bold" },
  { key: "notes", label: "Notes", section: "Workspace", icon: "solar:notebook-bold", count: true },
  { key: "tasks", label: "Tasks", section: "Workspace", icon: "solar:check-circle-bold" },
  { key: "templates", label: "Templates", section: "Workspace", icon: "solar:widget-bold", isNew: true },
  { key: "shared", label: "Shared with me", section: "Team", icon: "solar:users-group-rounded-bold", plus: true },
  { key: "space", label: "Space", section: "Team", icon: "solar:box-bold" },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string
  detail?: string
}

/**
 * Margin SidebarNav: a notes workspace rail. The current page is a white
 * pill with a hairline ring, marked by a short oxblood bar on the rail's edge,
 * and a quiet grey wash follows the pointer between the other rows.
 */
function SidebarNav({
  workspace = "Northwind Notes",
  detail = "Personal workspace",
  className,
  ...props
}: SidebarNavProps) {
  const [active, setActive] = React.useState("notes")
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [box, setBox] = React.useState<{ top: number; height: number } | null>(null)
  const [query, setQuery] = React.useState("")
  const [badge, setBadge] = React.useState(12)
  const sections = ["Workspace", "Team"]
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
    <div
      className={cn(
        "flex w-56 flex-col overflow-hidden rounded-xl border border-border bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    >
      <div className="flex h-13 items-center gap-2 border-b border-border bg-background px-3">
        <button
          type="button"
          className={cn(
            focusRing,
            "flex min-w-0 flex-1 items-center gap-2 rounded-md p-1 text-left transition-colors duration-fast hover:bg-accent",
          )}
        >
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
          >
            {workspace.charAt(0)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold leading-tight text-foreground">{workspace}</span>
            <span className="block truncate text-xs leading-tight text-muted-foreground">{detail}</span>
          </span>
        </button>
        <Button variant="secondary" size="icon-sm" aria-label="Collapse sidebar">
          <Icon icon="solar:double-alt-arrow-left-linear" aria-hidden="true" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 px-2.5 pt-3">
        <label
          className={cn(
            "flex h-7.5 items-center gap-2 rounded-lg border border-transparent bg-(--field) px-2.5 shadow-(--field-edge)",
            "transition duration-fast ease-(--ease-out)",
            "focus-within:border-primary/45 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring",
          )}
        >
          <Icon icon="solar:magnifer-linear" aria-hidden="true" className="size-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            aria-label="Search pages"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded-sm bg-card px-1 font-mono text-xs text-muted-foreground shadow-xs">⌘K</kbd>
        </label>
        <Button
          className="w-full"
          onClick={() => {
            setBadge((current) => current + 1)
            setActive("notes")
          }}
        >
          <Icon icon="solar:document-add-bold" aria-hidden="true" />
          New note
        </Button>
      </div>

      <div
        ref={navRef}
        onMouseLeave={() => setHovered(null)}
        className="relative flex flex-col gap-3.5 px-2.5 py-3"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2.5 rounded-md bg-accent"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition:
              "top var(--transition-duration-base) var(--ease-out), height var(--transition-duration-base) var(--ease-out), opacity var(--transition-duration-fast) var(--ease-out)",
          }}
        />
        {sections.map((section, sectionIndex) => {
          const items = visible.filter((item) => item.section === section)
          if (items.length === 0) return null
          return (
            <div
              key={section}
              className={cn(sectionIndex > 0 && "border-t border-border pt-3.5")}
            >
              <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">{section}</div>
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
                        "group relative z-10 flex h-7 w-full items-center gap-2.5 rounded-md px-2 text-left",
                        isActive &&
                          "bg-card shadow-sm before:absolute before:inset-y-0 before:-start-2.5 before:w-0.75 before:rounded-e-sm before:bg-primary",
                      )}
                    >
                      <Icon
                        icon={item.icon}
                        aria-hidden="true"
                        className={cn("size-4 shrink-0", isActive ? "text-(--primary-text)" : "text-muted-foreground")}
                      />
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm transition-colors duration-fast",
                          isActive ? "font-medium text-foreground" : "text-foreground/85 group-hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.count && (
                        <span
                          key={badge}
                          className="flex h-4.5 min-w-4.5 animate-in fade-in zoom-in-90 items-center justify-center rounded-sm bg-(--field) px-1 text-xs tabular-nums text-muted-foreground duration-base"
                        >
                          {badge}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="flex h-4.5 items-center rounded-sm bg-(--mark) px-1.5 text-xs font-medium text-(--mark-foreground)">
                          New
                        </span>
                      )}
                      {item.plus && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex size-5 items-center justify-center rounded-sm text-muted-foreground transition-opacity duration-fast hover:bg-(--field) hover:text-foreground",
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                          )}
                        >
                          <Icon icon="solar:add-circle-linear" className="size-3.5" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
        {visible.length === 0 && (
          <p className="px-2 py-1 text-sm text-muted-foreground">No pages match that search.</p>
        )}
      </div>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface SidebarNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

/** Margin SidebarNavSection: a small muted group label above its rows. */
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

/** Margin SidebarNavItem: a compact row; the current one sits on a paper tab. */
function SidebarNavItem({ label, count, active = false, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        focusRing,
        "flex h-7 items-center justify-between gap-2 rounded-md px-2 text-left text-sm transition-colors duration-fast",
        active
          ? "bg-card font-medium text-foreground shadow-sm"
          : "text-foreground/85 hover:bg-accent hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "flex h-4.5 min-w-4.5 items-center justify-center rounded-sm px-1 text-xs tabular-nums",
            active ? "bg-(--mark) text-(--mark-foreground)" : "bg-(--field) text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
