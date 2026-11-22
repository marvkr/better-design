"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing, selectedOption } from "./_shared";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Mallow Sidebar: the left rail on the white card, split from the page by a
 * hairline, whose current link takes the violet tint and ring.
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-collapsible={collapsible ? "" : undefined}
      className={cn(
        "flex h-full w-64 flex-col border-e border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-header"
    className={cn("flex min-h-16 items-center gap-3 px-4 pt-4 pb-2", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-content"
    className={cn("flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-3 py-3", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-footer"
    className={cn("mt-auto border-t border-border px-3 py-3", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-group"
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-group-label"
    className={cn("px-3 pb-1 text-xs font-medium text-muted-foreground", className)}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-item"
      data-active={active ? "" : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/sidebar-item flex min-h-10 w-full items-center gap-2.5 rounded-xl px-3 py-2 text-start text-sm",
        focusRing,
        "disabled:cursor-not-allowed disabled:opacity-50",
        active
          ? cn(selectedOption, "font-medium")
          : "text-muted-foreground transition-colors duration-fast ease-(--ease-out) enabled:hover:bg-accent enabled:hover:text-foreground",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-4.5 shrink-0 items-center justify-center [&_svg]:size-4.5",
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
