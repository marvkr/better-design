"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing, raisedBevel } from "./_shared";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Burnished Sidebar: the left rail, a strip of the umber page set apart by
 * a hairline on its right edge.
 *
 * Group labels are small muted semibold text, never in capitals. Links
 * read in muted text and take a faint graphite wash under a fine pointer;
 * the current page rises as a raised graphite bevel with cream text and a
 * copper icon.
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-collapsible={collapsible ? "" : undefined}
      className={cn(
        "flex h-full w-64 flex-col border-e border-border bg-background text-foreground",
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
    className={cn("flex min-h-16 items-center gap-2.5 px-4 pt-3 pb-1", className)}
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
    className={cn("flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-3", className)}
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
    className={cn(
      "px-3 pb-1.5 text-xs font-semibold text-muted-foreground",
      className,
    )}
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
        "group/sidebar-item flex min-h-9 w-full items-center gap-2.5 rounded-full px-3 py-1.5 text-start text-sm",
        focusRing,
        "disabled:cursor-not-allowed disabled:opacity-50",
        active
          ? cn(raisedBevel, "font-semibold")
          : cn(
              "text-muted-foreground transition-colors duration-fast ease-(--ease-out)",
              "[@media(hover:hover)_and_(pointer:fine)]:enabled:hover:bg-accent/60 [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:text-foreground",
            ),
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
            active
              ? "text-primary-text"
              : "text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:group-hover/sidebar-item:text-foreground",
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
