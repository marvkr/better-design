import * as React from "react"
import { cn } from "@/lib/utils"

/* The metric widget from the reference: velvet panel, quiet label, big value. */

const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl p-6",
      "[background-image:var(--velour)] [box-shadow:var(--shadow-s)]",
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
    className={cn("text-3xl font-semibold tracking-tight", className)}
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
