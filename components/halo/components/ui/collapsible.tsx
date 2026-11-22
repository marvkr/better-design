"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between rounded-xl px-4 py-3",
      "backdrop-blur-md bg-foreground/[0.06] border border-border",
      "text-sm font-medium text-foreground/90",
      "transition-all duration-base",
      "hover:bg-foreground/[0.10] hover:shadow-[0_0_0.75rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40",
      "[&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-white/[0.04]",
      className
    )}
    {...props}
  />
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden rounded-b-xl",
      "backdrop-blur-md bg-foreground/[0.04] border border-t-0 border-border",
      "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  />
))
CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
