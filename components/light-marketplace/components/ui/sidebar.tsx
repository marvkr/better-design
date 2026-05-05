"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar root
// ──────────────────────────────────────────────────────────────────────────────
const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border bg-background",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
)
Sidebar.displayName = "Sidebar"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar Header
// ──────────────────────────────────────────────────────────────────────────────
const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center px-4 py-4 border-b border-border", className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar Content (scrollable)
// ──────────────────────────────────────────────────────────────────────────────
const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto px-3 py-3", className)}
      {...props}
    />
  )
)
SidebarContent.displayName = "SidebarContent"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar Footer
// ──────────────────────────────────────────────────────────────────────────────
const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center px-4 py-4 border-t border-border", className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = "SidebarFooter"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar Group
// ──────────────────────────────────────────────────────────────────────────────
const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
)
SidebarGroup.displayName = "SidebarGroup"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar Group Label
// ──────────────────────────────────────────────────────────────────────────────
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mb-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// ──────────────────────────────────────────────────────────────────────────────
// Sidebar Item
// ──────────────────────────────────────────────────────────────────────────────
export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
  badge?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active = false, icon, badge, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active
          ? "bg-foreground text-background font-semibold"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        className
      )}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0",
            active ? "text-background" : "text-muted-foreground"
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 truncate text-left">{children}</span>
      {badge && <span className="ml-auto shrink-0">{badge}</span>}
    </button>
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
