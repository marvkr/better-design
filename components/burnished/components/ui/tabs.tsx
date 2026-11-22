"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { focusRing, wellInset } from "./_shared";

/**
 * Burnished Tabs: a segmented control set in a groove. The list is a
 * recessed pill track, and the active trigger is a graphite bevel that
 * sits up out of it, the way a switch rests in its slot.
 */
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      "inline-flex h-11 items-center justify-center gap-0.5 rounded-full p-1 text-muted-foreground",
      wellInset,
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
    data-slot="tabs-trigger"
    className={cn(
      "inline-flex h-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold",
      "text-muted-foreground transition-[color,box-shadow,background-image] duration-base ease-(--ease-out)",
      "[@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
      focusRing,
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-(image:--fill-raised) data-[state=active]:text-foreground data-[state=active]:shadow-(--bevel-raised)",
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
    data-slot="tabs-content"
    className={cn("mt-4 rounded-lg", focusRing, className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
