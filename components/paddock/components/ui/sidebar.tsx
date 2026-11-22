"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Paddock Sidebar: the app's left rail, a white panel set off from the cool
 * canvas by a 1px border on its right edge.
 *
 * Group labels are small muted text. Links read in muted text and take a
 * faint grey wash on hover; the current page sits on a flat grey rounded
 * rectangle in semibold slate.
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-collapsible={collapsible ? "" : undefined}
      className={cn(
        "flex h-full w-64 flex-col border-e border-border bg-card text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Sidebar.displayName = "Sidebar";

/** The workspace row at the top, parted from the links by a 1px border. */
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-header"
    className={cn("mx-4 flex min-h-16 items-center gap-3 border-b border-border pt-3 pb-3", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

/** The scrolling body that holds the link groups. */
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-content"
    className={cn("flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-3 py-4", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

/** The foot of the rail, for settings and the storage meter. */
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-footer"
    className={cn("mx-4 mt-auto flex flex-col gap-3 border-t border-border py-4", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

/** One group of links. */
const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-group"
    className={cn("flex flex-col gap-0.5", className)}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

/** A group's small muted label. */
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-group-label"
    className={cn("px-2.5 pb-1 text-xs font-medium text-muted-foreground", className)}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

/** A link in the rail; the current page sits on the flat grey highlight. */
const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-item"
      data-active={active ? "" : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/sidebar-item flex h-9.5 w-full items-center gap-3 rounded-md px-2.5 text-start text-[0.9375rem]",
        focusRing,
        "transition-colors duration-fast ease-out",
        "disabled:cursor-not-allowed disabled:opacity-50",
        active
          ? "bg-accent font-semibold text-foreground"
          : "text-secondary-foreground enabled:hover:bg-accent/60 enabled:hover:text-foreground",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
            active ? "text-foreground" : "text-muted-foreground group-hover/sidebar-item:text-foreground",
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </button>
  ),
);
SidebarItem.displayName = "SidebarItem";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
};
