import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe SectionHeader: page section title — refined typography, optional badge/action
// Eyebrow text (small caps tracking-widest) + title + description pattern

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
  align?: "left" | "center"
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        action && align !== "center" && "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-1.5", align === "center" && "items-center")}>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold text-foreground tracking-tight leading-none">
          {title}
        </h2>
        {description && (
          <p className={cn("text-sm text-muted-foreground leading-relaxed", align === "center" && "max-w-md")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export { SectionHeader }
