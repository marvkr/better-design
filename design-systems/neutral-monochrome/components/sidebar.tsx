import * as React from "react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Root sidebar
// ---------------------------------------------------------------------------

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsed = false, children, ...props }, ref) => (
    <aside
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "flex flex-col h-full border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
)
Sidebar.displayName = "Sidebar"

// ---------------------------------------------------------------------------
// Sidebar Header
// ---------------------------------------------------------------------------

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center h-14 shrink-0 px-4 border-b border-border",
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

// ---------------------------------------------------------------------------
// Sidebar Content (scrollable main area)
// ---------------------------------------------------------------------------

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto py-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

// ---------------------------------------------------------------------------
// Sidebar Footer
// ---------------------------------------------------------------------------

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shrink-0 border-t border-border px-3 py-3",
      className
    )}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

// ---------------------------------------------------------------------------
// Sidebar Group
// ---------------------------------------------------------------------------

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

// ---------------------------------------------------------------------------
// Sidebar Group Label
// ---------------------------------------------------------------------------

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60",
      className
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// ---------------------------------------------------------------------------
// Sidebar Item
// ---------------------------------------------------------------------------

export interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  href?: string
  badge?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, icon, label, active, href = "#", badge, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 h-4 w-4 transition-colors",
            active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{label}</span>
      {badge && <span className="ml-auto shrink-0">{badge}</span>}
    </a>
  )
)
SidebarItem.displayName = "SidebarItem"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
}
