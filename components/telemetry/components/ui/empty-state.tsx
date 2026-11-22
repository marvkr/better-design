import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room EmptyState: no-signal panel. Recessed icon well with a
// quiet caption, like a feed waiting for telemetry.

const EmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center py-12 text-center",
      className
    )}
    {...props}
  />
))
EmptyState.displayName = "EmptyState"

const EmptyStateIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-4 flex h-14 w-14 items-center justify-center rounded-sm",
      "border border-border bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "[&>svg]:size-6 [&>svg]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
EmptyStateIcon.displayName = "EmptyStateIcon"

const EmptyStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "mb-1 text-sm font-semibold uppercase tracking-widest",
      className
    )}
    {...props}
  />
))
EmptyStateTitle.displayName = "EmptyStateTitle"

const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mb-4 max-w-sm text-xs text-muted-foreground", className)}
    {...props}
  />
))
EmptyStateDescription.displayName = "EmptyStateDescription"

export { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription }
