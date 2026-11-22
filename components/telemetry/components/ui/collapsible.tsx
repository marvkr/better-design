"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"

// Control Room Collapsible: expandable diagnostics row.
// Trigger reads as a panel header strip; content as the recessed log body.

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between rounded-sm px-4 py-2.5",
      "bg-card border border-border",
      "text-xs font-semibold uppercase tracking-wider text-foreground",
      "transition-colors duration-fast",
      "hover:border-ring/40 hover:text-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
      "[&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0",
      className
    )}
    {...props}
  />
))
CollapsibleTrigger.displayName =
  CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden rounded-b-sm",
      "bg-background border border-t-0 border-border",
      "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  />
))
CollapsibleContent.displayName =
  CollapsiblePrimitive.CollapsibleContent.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
