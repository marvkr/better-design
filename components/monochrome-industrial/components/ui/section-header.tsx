import * as React from "react"

import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
 title: React.ReactNode
 description?: React.ReactNode
 eyebrow?: React.ReactNode
 actions?: React.ReactNode
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
 ({ className, title, description, eyebrow, actions, ...props }, ref) => (
 <div
 ref={ref}
 className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}
 {...props}
 >
 <div className="min-w-0 flex-1">
 {eyebrow && (
 <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
 {eyebrow}
 </div>
 )}
 <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
 {description && (
 <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-2xl">
 {description}
 </p>
 )}
 </div>
 {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
 </div>
 )
)
SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
