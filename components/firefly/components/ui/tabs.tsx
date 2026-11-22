"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/**
 * Firefly Tabs: plain text tabs over a warm hairline. Idle tabs read in the
 * muted ink and darken under the pointer. The active tab turns full ink
 * and a short near-black bar, rounded at both ends, fades in on the line
 * beneath it. Nothing here glows.
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
      "inline-flex items-center gap-1 border-b border-border text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/** One tab: muted text, with the ink bar under it when active. */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "relative inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-t-md px-3",
      "text-sm font-medium text-muted-foreground transition-colors duration-fast ease-out",
      "hover:text-foreground data-[state=active]:text-foreground",
      "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-(--ink)",
      "after:opacity-0 after:transition-opacity after:duration-fast after:ease-out data-[state=active]:after:opacity-100",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
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
      "mt-4 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
