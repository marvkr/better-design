import * as React from "react"
import { cn } from "@/lib/utils"

// Neon Vault Section Header: section title over the vault canvas with an
// optional subtitle and a right-aligned action, like the wallet's
// "Total Balance" row. Tight Inter headings, muted support text.

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: { title: "text-lg font-semibold", desc: "text-sm" },
  md: { title: "text-xl font-semibold", desc: "text-sm" },
  lg: { title: "text-3xl font-bold tracking-tight", desc: "text-base" },
}

function SectionHeader({
  title,
  description,
  action,
  size = "md",
  className,
  ...props
}: SectionHeaderProps) {
  const sizes = sizeClasses[size]

  return (
    <div
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h2 className={cn(sizes.title, "tracking-tight text-foreground")}>
          {title}
        </h2>
        {description && (
          <p className={cn(sizes.desc, "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export { SectionHeader }
export type { SectionHeaderProps }
