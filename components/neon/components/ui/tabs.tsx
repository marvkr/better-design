"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/*
 * Dark Neon AI Tabs.
 *
 * The list is a recessed well sunk into the surface. The ACTIVE trigger is the
 * DS signature: it adopts the neon-green material (the same gradient + glow as
 * the primary Button), scaled to a tab. Inactive triggers are quiet muted text
 * that warms to the foreground on hover.
 */

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn("", className)} {...props} />
}
Tabs.displayName = TabsPrimitive.Root.displayName

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-[0.75rem] bg-input p-1 text-muted-foreground [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    />
  )
}
TabsList.displayName = TabsPrimitive.List.displayName

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-[0.5625rem] px-3 py-1.5 text-sm font-medium",
        "text-muted-foreground transition-[color,background,box-shadow] duration-fast",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:[background:var(--neon-gradient)] data-[state=active]:text-primary-foreground data-[state=active]:[box-shadow:var(--shadow-neon)]",
        className
      )}
      {...props}
    />
  )
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    />
  )
}
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
