"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// SidebarNav: workspace navigation with direct selection, quick search, and
// a hover pill that glides between items.
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

function ItemIcon({ kind }: { kind: string }) {
  const p: Record<string, React.ReactNode> = {
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    tasks: <g><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></g>,
    spaces: <g><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>,
    dashboard: <g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    analytics: <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p[kind]}
    </svg>
  )
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
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})

  React.useLayoutEffect(() => {
    const container = navRef.current
    const target = itemRefs.current[hovered ?? active]
    if (!container || !target) return
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setBox({ top: targetRect.top - containerRect.top, height: targetRect.height })
  }, [hovered, active])

  return (
    <div className={cn("w-60 rounded-xl border border-border bg-card p-2 shadow-md", className)} {...props}>
      {/* workspace row */}
      <button
        type="button"
        className="mb-2 flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-[background-color,transform] duration-fast hover:bg-accent active:scale-[0.96]"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[0.5rem] bg-primary text-[0.8125rem] font-semibold text-primary-foreground">
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.8125rem] font-medium leading-tight text-foreground">{workspace}</span>
          <span className="block truncate text-[0.6875rem] leading-tight text-muted-foreground">{detail}</span>
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" aria-hidden="true">
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
        </svg>
      </button>

      {/* quick search */}
      <label className="mb-1 flex h-8 items-center gap-2 rounded-md border border-border bg-muted px-2.5 focus-within:ring-2 focus-within:ring-ring">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Quick search"
          className="min-w-0 flex-1 bg-transparent text-[0.7813rem] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] border border-border bg-card text-[0.625rem] text-muted-foreground">
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
        className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[0.8125rem] font-medium text-primary transition-[background-color,transform] duration-fast hover:bg-primary/10 active:scale-[0.96]"
      >
        <span className="min-w-0 flex-1 truncate text-left">New task</span>
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {/* items */}
      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 rounded-[0.4375rem] bg-accent"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition:
              "top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
          }}
        />
        {sections.map((section) => (
          <div key={section}>
            <div className="px-2 pb-1 pt-1 text-[0.6563rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
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
                    className="group relative z-10 flex w-full items-center gap-2 rounded-[0.4375rem] px-2 py-1.5 text-left transition-[color,transform] duration-fast active:scale-[0.96]"
                  >
                    <span className={isActive ? "text-foreground" : "text-muted-foreground"}>
                      <ItemIcon kind={item.key} />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[0.8125rem] transition-colors duration-fast",
                        isActive ? "font-medium text-foreground" : "text-foreground/70",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.count && (
                      <span
                        key={badge}
                        className={cn(
                          "flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-1 text-[0.6563rem] font-semibold tabular-nums",
                          isActive ? "border border-border bg-card text-foreground/70" : "bg-primary/10 text-primary",
                        )}
                        style={{ animation: "bui-pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
                      >
                        {badge}
                      </span>
                    )}
                    {item.plus && (
                      <span
                        className="flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] text-muted-foreground opacity-0 transition-[background-color,color,opacity] duration-fast group-hover:opacity-100 hover:bg-border/70 hover:text-foreground"
                        style={isActive ? { opacity: 1 } : undefined}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
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
        @keyframes bui-pop-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
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
      <span className="px-1.5 pb-1 text-[0.6563rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
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
        "flex items-center justify-between gap-2 rounded-[0.4375rem] px-2 py-1.5 text-left text-[0.8125rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-accent font-medium text-foreground" : "text-foreground/70 hover:bg-accent/60 hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary/10 px-1 text-[0.6563rem] font-semibold text-primary tabular-nums">
          {count}
        </span>
      )}
    </button>
  )
}

export { SidebarNav, SidebarNavSection, SidebarNavItem }
