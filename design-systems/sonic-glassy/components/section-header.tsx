import * as React from "react"
import { cn } from "@/lib/utils"

// Tactile Minimal Section Header — signature dotted-line separator pattern.
// Label + dotted line that fills remaining space + optional actions.
// Clean, understated, no glass, no gradients.

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 pb-4", className)}
    {...props}
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionHeaderLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
      className
    )}
    {...props}
  />
))
SectionHeaderLabel.displayName = "SectionHeaderLabel"

const SectionHeaderLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn("flex-1 border-t border-dotted border-border", className)}
    {...props}
  />
))
SectionHeaderLine.displayName = "SectionHeaderLine"

const SectionHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
SectionHeaderTitle.displayName = "SectionHeaderTitle"

const SectionHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SectionHeaderDescription.displayName = "SectionHeaderDescription"

const SectionHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
SectionHeaderActions.displayName = "SectionHeaderActions"

export {
  SectionHeader,
  SectionHeaderLabel,
  SectionHeaderLine,
  SectionHeaderTitle,
  SectionHeaderDescription,
  SectionHeaderActions,
}
