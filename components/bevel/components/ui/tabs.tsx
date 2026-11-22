"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/*
 * Bevel Tabs, drawn as an iOS segmented control.
 *
 * The list is a well pressed into the card: the inner token plus the inset
 * shadow. The selected segment lifts back out of that well on the card color
 * with the button shadow, so the pair reads as one physical control instead of
 * two tinted rectangles. No border anywhere.
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center gap-1 rounded-[0.875rem] p-1",
      "bg-[var(--inner)] text-muted-foreground",
      "[box-shadow:var(--shadow-inset)]",
      className,
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
      "inline-flex h-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[0.625rem] px-3.5",
      "text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem]",
      "transition-[background-color,color,box-shadow] duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "text-muted-foreground hover:text-foreground",
      "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:[box-shadow:var(--shadow-button)]",
      "[&_svg]:pointer-events-none [&_svg]:size-[1.0625rem] [&_svg]:shrink-0",
      className,
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
      "mt-4",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
