"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// Control Room Tabs: panel selector strip.
// Recessed dark rail; the active tab raises to the panel surface with an
// energized green underline, like the active sector tab on the console.

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center gap-1 rounded-sm p-1",
      "border border-border bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-xs px-3 py-1",
      "text-xs font-semibold uppercase tracking-wider",
      "transition-all duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
      "disabled:pointer-events-none disabled:opacity-50",
      "hover:text-foreground",
      "data-[state=active]:bg-card data-[state=active]:text-primary",
      "data-[state=active]:[box-shadow:inset_0_0_0_0.0625rem_oklch(0.78_0.21_148/0.3),0_0_0.5rem_oklch(0.78_0.21_148/0.15)]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
