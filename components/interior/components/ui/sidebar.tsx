"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior Sidebar — furniture, not content. It sits on the bezel, unlifted:
 * no card fill, no shadow, just a hairline edge against the panel. The active
 * nav row is a row picked out of the list — a 9px plateau with the row
 * shadow — and section labels are small caps with real tracking.
 */

const Sidebar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "flex h-full w-60 flex-col gap-1 bg-background p-3",
      "border-r border-border",
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
      "px-2.5 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
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
      "flex w-full items-center gap-2.5 rounded-[0.5625rem] px-2.5 py-1.5 text-left",
      "text-[0.8125rem] leading-[1.4]",
      "transition-[background-color,color,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      active
        ? "bg-secondary font-medium text-foreground shadow-[var(--shadow-row)]"
        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
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
