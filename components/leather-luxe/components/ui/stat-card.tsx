import * as React from "react"

import { cn } from "@/lib/utils"

// Leather Luxe StatCard: the "$30 Monthly plan" panel; a card slip with a
// big confident figure.

const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl bg-card p-6",
      "border border-border [box-shadow:var(--shadow-card)]",
      className
    )}
    {...props}
  />
))
StatCard.displayName = "StatCard"

const StatCardLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
StatCardLabel.displayName = "StatCardLabel"

const StatCardValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-3xl font-bold tracking-tight text-foreground", className)}
    {...props}
  />
))
StatCardValue.displayName = "StatCardValue"

const StatCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-xs text-muted-foreground", className)}
    {...props}
  />
))
StatCardDescription.displayName = "StatCardDescription"

export { StatCard, StatCardLabel, StatCardValue, StatCardDescription }
