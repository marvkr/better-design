"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Airy docs Sidebar: the left rail of a documentation site.
 *
 * The rail shares the white page and is set apart by a hairline on its
 * right edge. Group labels read as small semibold ink, never in capitals.
 * Links read in the secondary ink and take the pale tray under the pointer;
 * the current page sits in the faint green wash with green medium text.
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
    className={cn("flex min-h-14 items-center gap-2 px-4 pt-3 pb-1", className)}
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
    className={cn("flex flex-col gap-px", className)}
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
      "px-3 pb-1.5 text-xs font-semibold text-foreground",
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
        "group/sidebar-item flex min-h-8 w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-start text-sm",
        "text-(--foreground-secondary) transition-colors duration-fast ease-out",
        "hover:bg-secondary hover:text-foreground",
        "outline-none focus-visible:ring-3 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:hover:bg-transparent",
        active &&
          "bg-(--primary-wash) font-medium text-(--primary-text) hover:bg-(--primary-wash) hover:text-(--primary-text)",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
            "group-hover/sidebar-item:text-foreground",
            active && "text-(--primary-text) group-hover/sidebar-item:text-(--primary-text)",
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
