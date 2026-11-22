"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Tabs: category tabs, the way a reading room files its
 * shelves. Idle tabs are muted sans labels with no tray behind them and
 * darken under the pointer. The active tab sits on a soft oat block in
 * full ink. Terracotta stays out of it.
 */
const Tabs = TabsPrimitive.Root;

/** The row of tabs: a loose line of labels, no tray. */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      "inline-flex items-center gap-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/** One tab: a muted label that takes the oat block when active. */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-3.5 py-1.5",
      "text-sm font-medium text-muted-foreground",
      "transition-colors duration-fast ease-out",
      "hover:text-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground",
      "outline-none focus-visible:ring-3 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/** The panel shown for the active tab. */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      "mt-5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
