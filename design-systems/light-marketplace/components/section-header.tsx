import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  size?: "sm" | "default" | "lg"
}

const sizeStyles = {
  sm: {
    wrapper: "gap-1",
    title:   "text-base font-semibold",
    desc:    "text-sm",
  },
  default: {
    wrapper: "gap-1.5",
    title:   "text-xl font-semibold",
    desc:    "text-sm",
  },
  lg: {
    wrapper: "gap-2",
    title:   "text-2xl font-semibold",
    desc:    "text-base",
  },
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, action, size = "default", className, ...props }, ref) => {
    const s = sizeStyles[size]

    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between gap-4", className)}
        {...props}
      >
        <div className={cn("flex flex-col", s.wrapper)}>
          <h2 className={cn("text-foreground leading-tight", s.title)}>
            {title}
          </h2>
          {description && (
            <p className={cn("text-muted-foreground", s.desc)}>{description}</p>
          )}
        </div>
        {action && <div className="shrink-0 mt-0.5">{action}</div>}
      </div>
    )
  }
)
SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
