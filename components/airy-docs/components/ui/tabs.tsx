"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/**
 * Airy docs Tabs: the underline tabs of a docs page ("npm / yarn / bun",
 * "Request / Response"). Idle tabs read in the muted ink; the active tab
 * turns full ink with a 0.125rem green bar on the hairline beneath it.
 */
const Tabs = TabsPrimitive.Root;

/** The row of tabs, standing on a hairline. */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      "inline-flex items-center gap-4 border-b border-border text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/** One tab: muted text, with the green bar under it when active. */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "relative inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap px-0.5",
      "text-sm font-medium text-muted-foreground transition-colors duration-fast ease-out",
      "hover:text-foreground data-[state=active]:text-foreground",
      "after:absolute after:inset-x-0 after:-bottom-0.25 after:h-0.5 after:rounded-full after:bg-primary",
      "after:scale-x-0 after:transition-transform after:duration-fast after:ease-out data-[state=active]:after:scale-x-100",
      "rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring",
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
      "mt-4 rounded-md text-sm text-(--foreground-secondary) outline-none focus-visible:ring-3 focus-visible:ring-ring",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
