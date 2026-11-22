import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass SectionHeader: bold title row with optional action slot.

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const titleSizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, action, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h2 className={cn("font-bold tracking-[-0.02em]", titleSizes[size])}>
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
)
SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
export type { SectionHeaderProps }
