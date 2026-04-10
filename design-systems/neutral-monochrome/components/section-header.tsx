import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  size?: "sm" | "default" | "lg"
}

const sizeConfig = {
  sm: {
    title: "text-base font-semibold",
    description: "text-xs",
  },
  default: {
    title: "text-lg font-semibold",
    description: "text-sm",
  },
  lg: {
    title: "text-2xl font-bold tracking-tight",
    description: "text-base",
  },
}

function SectionHeader({
  title,
  description,
  action,
  size = "default",
  className,
  ...props
}: SectionHeaderProps) {
  const styles = sizeConfig[size]

  return (
    <div
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="space-y-1 min-w-0">
        <h2 className={cn("text-foreground", styles.title)}>{title}</h2>
        {description && (
          <p className={cn("text-muted-foreground", styles.description)}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  )
}

export { SectionHeader }
