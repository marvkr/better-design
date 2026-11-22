"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Sidebar: a calm white rail like the recruiting portal's left
// nav. The active item gets a soft orange-tinted highlight.

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <div
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col",
        "border-r border-border bg-card",
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

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-b border-border/60 px-4", className)}
      {...props}
    />
  )
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto p-2", className)} {...props} />
  )
);
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-t border-border/60 p-3", className)}
      {...props}
    />
  )
);
SidebarFooter.displayName = "SidebarFooter";

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      data-active={active}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm",
        "transition-colors duration-fast",
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:size-4">{icon}</span>}
      <span className="truncate">{children}</span>
    </div>
  )
);
SidebarItem.displayName = "SidebarItem";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-0.5 py-2", className)} {...props} />
  )
);
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-3 pb-1 pt-2 text-[0.625rem] font-medium uppercase tracking-widest text-muted-foreground/70",
        className
      )}
      {...props}
    />
  )
);
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
