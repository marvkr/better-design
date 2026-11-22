"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/**
 * Bold retail Tabs: underlined text tabs, the way a product page switches
 * between Details, Reviews and Shipping. The strip stands on a soft inset
 * hairline. Idle tabs read in grey and darken under the pointer; the active
 * tab turns black and a 2-unit black bar sits flush on the hairline under it.
 */
const Tabs = TabsPrimitive.Root;

/** The tab strip, with the hairline drawn inside its bottom edge. */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      "inline-flex items-center gap-6 text-muted-foreground shadow-(--shadow-line)",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/** One tab: grey text, black with a black underline when active. */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "relative inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap",
      "text-base font-medium text-muted-foreground transition-colors duration-fast ease-out",
      "hover:text-foreground data-[state=active]:text-foreground",
      "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary",
      "after:scale-x-0 after:transition-transform after:duration-fast after:ease-out data-[state=active]:after:scale-x-100",
      "motion-reduce:after:transition-none",
      "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/** The panel for the active tab. */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      "mt-6 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
