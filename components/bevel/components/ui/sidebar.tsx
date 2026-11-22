"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Sidebar.
 *
 * A card that runs the full height of the screen. It has no border, so the
 * header and the footer separate from the scrolling list with one pixel of the
 * track token. The active item is the only lit row: it takes the primary
 * gradient and the primary shadow, matching the filled controls elsewhere.
 */

/** Props for `Sidebar`; `collapsible` is reserved for a narrow rail. */
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsible: _collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        "flex h-full w-64 flex-col",
        "bg-card text-card-foreground",
        "[box-shadow:var(--shadow-card)]",
        className,
      )}
      {...props}
    />
  ),
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex items-center gap-2.5 px-3.5 py-3",
      "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--track)]",
      className,
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
    className={cn("flex-1 overflow-y-auto p-2.5", className)}
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
    className={cn(
      "relative px-3.5 py-3",
      "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[var(--track)]",
      className,
    )}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 py-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2.5 pb-1.5 text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

/** Props for `SidebarItem`; `active` lights the row the reader is on. */
interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[0.75rem] px-3.5 py-2.5 text-left",
        "text-[0.9063rem] leading-[1.125rem] font-medium tracking-[0.0188rem]",
        "transition-[background-color,background-image,color,box-shadow] duration-fast ease-out",
        "text-muted-foreground hover:bg-[var(--inner)] hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active && [
          "font-semibold text-primary-foreground",
          "bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
          "[box-shadow:var(--shadow-primary)]",
          "hover:bg-[linear-gradient(180deg,var(--primary-hover-from)_0%,var(--primary-hover-to)_100%)] hover:text-primary-foreground",
        ],
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex size-[1.125rem] shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
    </button>
  ),
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
