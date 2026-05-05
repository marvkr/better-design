"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Sidebar: left nav — background bg, white active indicator strip
// Collapsible support; items use ghost hover with white active state

// --- Context ---

type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
})

function useSidebar() {
  return React.useContext(SidebarContext)
}

// --- Provider ---

function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

// --- Root ---

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebar()
    return (
      <aside
        ref={ref}
        data-collapsed={collapsed}
        className={cn(
          "flex h-full flex-col border-r border-border bg-background",
          "transition-all duration-300 ease-out",
          collapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

// --- Header ---

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-b border-border px-4", className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

// --- Content ---

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-3", className)}
      {...props}
    />
  )
)
SidebarContent.displayName = "SidebarContent"

// --- Footer ---

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-t border-border p-3", className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = "SidebarFooter"

// --- Group ---

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 px-2 py-1", className)} {...props} />
  )
)
SidebarGroup.displayName = "SidebarGroup"

// --- Group Label ---

const SidebarGroupLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebar()
    return (
      <p
        ref={ref}
        className={cn(
          "px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60",
          "transition-opacity duration-200",
          collapsed && "sr-only",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// --- Item ---

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  active?: boolean
  badge?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ icon, active, badge, children, className, ...props }, ref) => {
    const { collapsed } = useSidebar()
    return (
      <button
        ref={ref}
        type="button"
        data-active={active}
        className={cn(
          "relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm tracking-wide",
          "transition-all duration-200 outline-none",
          "focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-40",
          active
            ? "bg-secondary text-foreground font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
          collapsed && "justify-center px-2",
          className
        )}
        {...props}
      >
        {/* Active indicator strip */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-primary" />
        )}
        {icon && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{children}</span>
            {badge && <span>{badge}</span>}
          </>
        )}
      </button>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

// --- Collapse trigger ---

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebar()
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground",
          "hover:bg-accent hover:text-foreground transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-300", collapsed && "rotate-180")}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarTrigger,
  useSidebar,
}
