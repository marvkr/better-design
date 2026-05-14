import * as React from "react"
import { cn } from "@/lib/utils"

// Tactile Minimal Stat Card: clean card for key metrics

const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[10px] p-6",
      "bg-card text-card-foreground border border-border",
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
    className={cn("text-xs text-muted-foreground mt-1", className)}
    {...props}
  />
))
StatCardDescription.displayName = "StatCardDescription"

export { StatCard, StatCardLabel, StatCardValue, StatCardDescription }
