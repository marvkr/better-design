import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room StatCard: gauge tile from the system health matrix.
// Panel plate with an uppercase caption and a huge glowing mono value,
// like the 97% DRILLING readout.

const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md p-5",
      "bg-card border border-border",
      "shadow-[0_0_0_0.0625rem_oklch(0_0_0/0.4),0_0_1rem_oklch(0.78_0.21_148/0.04)]",
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
    className={cn(
      "text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground",
      className
    )}
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
    className={cn(
      "text-3xl font-bold tracking-tight text-primary",
      "[text-shadow:0_0_1rem_oklch(0.78_0.21_148/0.35)]",
      className
    )}
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
