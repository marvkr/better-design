"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Sidebar: console rail. Near-black strip with hairline
// border; the active item carries a green-tinted plate and a signal edge,
// like the icon rail on the SCADA shell.

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <div
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col",
        "bg-card border-r border-border",
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

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-14 items-center border-b border-border px-4",
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-1 overflow-y-auto p-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-border p-2", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, label, active, collapsed, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-sm px-3 py-2",
        "text-xs font-semibold uppercase tracking-wider transition-colors duration-fast",
        active
          ? "bg-primary/10 text-primary [box-shadow:inset_0.125rem_0_0_oklch(0.78_0.21_148/0.8)]"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        collapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:size-4">{icon}</span>}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  )
)
SidebarItem.displayName = "SidebarItem"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mb-1 px-3 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground/60",
      className
    )}
    {...props}
  />
))
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
