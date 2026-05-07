import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Empty — compositional empty-state primitive. Use when you need more layout
 * control than EmptyState provides. Just structural slots, no icon baked in.
 */

const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-8 text-center",
        className
      )}
      {...props}
    />
  )
)
Empty.displayName = "Empty"

const EmptyIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full",
        "bg-muted text-muted-foreground",
        "[box-shadow:var(--shadow-s)]",
        className
      )}
      {...props}
    />
  )
)
EmptyIcon.displayName = "EmptyIcon"

const EmptyTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-base font-semibold text-foreground", className)}
      {...props}
    />
  )
)
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed max-w-md", className)}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 pt-1", className)} {...props} />
  )
)
EmptyActions.displayName = "EmptyActions"

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions }
