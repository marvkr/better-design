import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel EmptyState.
 *
 * The ready-made empty state: one glyph, a title, a line of copy and an
 * action. The whole block is a well rather than a card, so it sits on the
 * inner token with the inset shadow at the 20px card radius. A dashed border
 * would say the same thing with a line this system does not draw, so the
 * pressed surface says it instead.
 */

/** Props for `EmptyState`; `icon` takes any Solar glyph name. */
export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: string
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { className, icon = "solar:inbox-linear", title, description, action, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[1.25rem] p-8 text-center",
        "bg-[var(--inner)] text-[var(--inner-foreground)]",
        "[box-shadow:var(--shadow-inset)]",
        className,
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-card text-muted-foreground [box-shadow:var(--shadow-sm)]">
        <Icon icon={icon} className="size-[1.375rem]" />
      </div>
      <div className="max-w-md space-y-1">
        <div className="text-[1rem] leading-[1.375rem] font-semibold tracking-[-0.025rem] text-foreground">
          {title}
        </div>
        {description && (
          <div className="text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  ),
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
