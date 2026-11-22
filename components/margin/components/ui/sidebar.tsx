"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Margin Sidebar: the workspace rail, one grey step below the page and
 * bounded by a hairline on its right.
 *
 * Rows are 1.75rem tall with a bold grey icon. The current page sits on a
 * paper tab with a hairline ring, and a short oxblood bar marks it on the
 * rail's own left edge.
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-collapsible={collapsible ? "" : undefined}
      className={cn(
        "flex h-full w-56 flex-col border-e border-border bg-secondary text-secondary-foreground",
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
    className={cn(
      "flex min-h-13 shrink-0 items-center gap-2 border-b border-border bg-background px-4",
      className,
    )}
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
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-3.5 divide-y divide-border overflow-y-auto px-2.5 py-2.5",
      "*:data-[slot=sidebar-group]:not-first:pt-3.5",
      className,
    )}
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
    className={cn("mt-auto border-t border-border bg-background px-3.5 py-3", className)}
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
    className={cn("flex flex-col gap-0.5", className)}
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
    className={cn("px-2 pb-1 text-xs font-medium text-muted-foreground", className)}
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
        "group/sidebar-item relative flex h-7 w-full items-center gap-2.5 rounded-md px-2 text-start text-sm",
        focusRing,
        "transition-colors duration-fast ease-(--ease-out)",
        "disabled:cursor-not-allowed disabled:opacity-50",
        active
          ? cn(
              "bg-card text-foreground shadow-sm",
              "before:absolute before:inset-y-0 before:-start-2.5 before:w-0.75 before:rounded-e-sm before:bg-primary",
            )
          : "text-foreground/85 enabled:hover:bg-accent enabled:hover:text-foreground",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
            active ? "text-(--primary-text)" : "text-muted-foreground",
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
