"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Cream editorial Sidebar: an oat column beside the cream page, set off by
 * a warm hairline at its inner edge.
 *
 * Items are quiet rows in secondary ink that take an oat wash under the
 * pointer. The current item sits on the deeper oat tab in full ink at
 * medium weight, the way a category tab reads, so "you are here" never
 * shouts.
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
    className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-3 py-2", className)}
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
      "px-2.5 pt-1 pb-1.5 text-xs font-medium text-muted-foreground",
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
        "group/sidebar-item flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-start text-sm",
        "text-(--foreground-secondary) transition-[background-color,color] duration-fast ease-out",
        "hover:bg-secondary hover:text-foreground",
        focusRing,
        "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:hover:bg-transparent",
        active && "bg-muted font-medium text-foreground hover:bg-muted",
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
            active && "text-foreground",
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
