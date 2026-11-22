import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room SectionHeader: panel title strip. Uppercase tracked
// heading over a hairline rule, mirroring the SCADA panel headers.

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between border-b border-border pb-3",
      className
    )}
    {...props}
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-sm font-semibold uppercase tracking-widest text-foreground",
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
    className={cn("text-xs text-muted-foreground", className)}
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
  SectionHeaderTitle,
  SectionHeaderDescription,
  SectionHeaderActions,
}
