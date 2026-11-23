import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth SectionHeader: a tight Geist title with an optional mono index
 * above it, the way the stage numbers its sections, and an action on the
 * right.
 */

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  action?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const titleSizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-[1.75rem] leading-[1.1]",
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, eyebrow, action, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="section-header"
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {eyebrow && <div className="mb-2 font-mono text-[0.6875rem] uppercase text-muted-foreground">{eyebrow}</div>}
        <h2 className={cn("font-medium tracking-[-0.025em] text-foreground", titleSizes[size])}>{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  )
)
SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
