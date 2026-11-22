import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel SectionHeader.
 *
 * The 19px section step from the type ramp, with the actions on the same
 * baseline on a wide screen and stacked underneath on a phone. There is no
 * surface here, because a heading names the cards below it and should not read
 * as another card itself.
 */

/** Props for `SectionHeader`; `actions` sits opposite the title. */
export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  actions?: React.ReactNode
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, eyebrow, actions, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="mb-1.5 text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] text-primary">
            {eyebrow}
          </div>
        )}
        <h2 className="text-[1.1875rem] leading-6 font-semibold tracking-[-0.0375rem] text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2.5">{actions}</div>
      )}
    </div>
  ),
)
SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
