"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Sidebar: the board's left rail. Bare canvas with a hairline
// border; the active item is a raised glass pill.

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <div
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col border-r border-[color:var(--ag-border)] bg-background",
        "transition-[width] duration-base",
        collapsed ? "w-16" : "w-60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-14 items-center border-b border-[color:var(--ag-border)] px-4",
        className
      )}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col gap-1 overflow-y-auto p-2", className)}
      {...props}
    />
  )
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-t border-[color:var(--ag-border)] p-2", className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = "SidebarFooter"

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  icon?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      data-active={active}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold",
        "transition-colors duration-fast",
        active
          ? "bg-[var(--ag-fill-hover)] text-foreground border border-[color:var(--ag-border)] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]"
          : "border border-transparent text-muted-foreground hover:bg-[var(--ag-fill)] hover:text-foreground",
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn("[&>svg]:h-4 [&>svg]:w-4", active && "text-primary")}>
          {icon}
        </span>
      )}
      {children}
    </div>
  )
)
SidebarItem.displayName = "SidebarItem"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 py-2", className)} {...props} />
  )
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarGroupLabel,
}
