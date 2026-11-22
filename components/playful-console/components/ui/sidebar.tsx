"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean;
}

/**
 * Playful console Sidebar: a cream column ruled off by the olive hairline.
 *
 * The column shares the page colour, so the edge line sets it apart. Items
 * are small rows in the secondary ink that take a cream wash under the
 * pointer. The current item lifts into a white card with the hairline edge
 * and a thin slab under it, the same move the product tabs make.
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-collapsible={collapsible ? "" : undefined}
      className={cn(
        "flex h-full w-60 flex-col border-r border-border bg-background text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Sidebar.displayName = "Sidebar";

/** The top of the column: a product name or a switcher. */
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-header"
    className={cn("flex min-h-14 items-center gap-2 px-4 pt-3 pb-1 font-extrabold tracking-tight", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

/** The scrolling middle that holds the groups. */
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-content"
    className={cn("flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-2.5 py-2", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

/** The foot of the column, ruled off by the hairline. */
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-footer"
    className={cn("mt-auto border-t border-border px-2.5 py-3", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

/** A group of items under one label. */
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

/** A group heading in small bold capitals and the muted ink. */
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sidebar-group-label"
    className={cn(
      "px-2.5 pt-2 pb-1 text-xs font-bold uppercase text-muted-foreground",
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

/** One place in the column; `active` marks the page you are on. */
const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-item"
      data-active={active ? "" : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/sidebar-item flex h-8 w-full items-center gap-2.5 rounded-md border border-transparent px-2.5 text-start text-sm font-medium",
        "text-(--foreground-secondary) transition-[background-color,color] duration-fast ease-out",
        "hover:bg-secondary hover:text-foreground active:bg-(--surface-3)",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:hover:bg-transparent",
        active &&
          "border-border bg-card font-semibold text-foreground shadow-(--shadow-control-off) hover:bg-card active:bg-card",
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
            active && "text-primary",
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
