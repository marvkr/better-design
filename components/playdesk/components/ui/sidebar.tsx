"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Sidebar — a translucent rail over the desk, so the wallpaper still
 * shows through. The active row is a filled pill, matching the segmented
 * control rather than a full-bleed highlight bar.
 */

const Sidebar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "flex h-full w-60 flex-col gap-1 p-3",
      "bg-card/70 backdrop-blur-md [box-shadow:inset_-0.0625rem_0_0_var(--border)]",
      className,
    )}
    {...props}
  />
));
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 px-2 pb-3 pt-1", className)}
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
    className={cn("flex-1 space-y-4 overflow-y-auto", className)}
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
    className={cn("border-t border-border pt-3", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-0.5", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2.5 pb-1 text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground",
      className,
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-current={active ? "page" : undefined}
    className={cn(
      "flex w-full items-center gap-2.5 rounded-full px-2.5 py-1.5 text-left text-sm",
      "transition-colors duration-fast",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      active
        ? "bg-secondary font-medium text-foreground [box-shadow:var(--shadow-rim)]"
        : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
      className,
    )}
    {...props}
  />
));
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
