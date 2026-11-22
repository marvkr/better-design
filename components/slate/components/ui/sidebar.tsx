"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Ops Sharp Sidebar — a light ops rail: white panel surface, a hairline right
 * border, hairline-divided sections. The active item becomes the solid graphite
 * tile (bg-primary + --shadow-primary), matching the reference's selected
 * sidebar square and the primary Button.
 */

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <div
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col border-r border-border bg-card",
        "transition-[width] duration-base",
        collapsed ? "w-16" : "w-60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Sidebar.displayName = "Sidebar";

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
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-1 overflow-y-auto p-2", className)}
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
    className={cn("border-t border-border p-2", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, label, active, collapsed, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium",
        "transition-[background-color,box-shadow,color] duration-fast",
        active
          ? "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)]"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        collapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      )}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  )
);
SidebarItem.displayName = "SidebarItem";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mb-1 px-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground/60",
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarGroupLabel,
};
