"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Sidebar: the editor's side panel. It sits on the stage as a panel
 * one step lighter, split by hairlines. The current item takes the raised
 * segment material, the same as a chosen segment in a well.
 */

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <aside
      ref={ref}
      data-slot="sidebar"
      className={cn("flex h-full w-60 flex-col bg-card text-card-foreground border-r border-border", className)}
      {...props}
    />
  )
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn("flex h-12 shrink-0 items-center gap-2 px-4 border-b border-border", className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="sidebar-content" className={cn("flex-1 overflow-y-auto p-2", className)} {...props} />
  )
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="sidebar-footer" className={cn("shrink-0 p-2 border-t border-border", className)} {...props} />
  )
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="sidebar-group" className={cn("flex flex-col gap-0.5 py-1.5", className)} {...props} />
  )
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidebar-group-label"
      className={cn("px-2.5 pb-1.5 pt-1 font-mono text-[0.6875rem] uppercase text-muted-foreground", className)}
      {...props}
    />
  )
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm",
        "text-muted-foreground transition-[background,color,box-shadow] duration-fast",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        active && "text-foreground [background:var(--segment-gradient)] [box-shadow:var(--shadow-segment)] hover:[background:var(--segment-gradient)]",
        className
      )}
      {...props}
    >
      {icon && <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>}
      <span className="flex min-w-0 flex-1 items-center truncate">{children}</span>
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
