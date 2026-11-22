"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/*
 * Interior Tabs — the signature control. The list is a well cut into the
 * panel; the triggers are plateaus seated in it, and the active one is a
 * lifted cap you could press. Radii nest: a 12px shell holds 8px plateaus
 * with 4px of padding between them. Selection is depth, never blue; focus
 * is the inset accent line, drawn over the cap when the trigger is active.
 */

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-0.5 rounded-[0.75rem] bg-secondary p-1",
      "shadow-[var(--shadow-well)]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[0.5rem] px-3 py-1.5",
      "text-[0.8125rem] font-medium leading-[1.4] text-muted-foreground",
      "transition-[background-color,color,box-shadow] duration-fast",
      "hover:text-foreground",
      "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-card data-[state=active]:text-foreground",
      "data-[state=active]:shadow-[var(--shadow-cap)]",
      "data-[state=active]:focus-visible:shadow-[var(--shadow-cap),inset_0_0_0_0.0625rem_var(--ring)]",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
