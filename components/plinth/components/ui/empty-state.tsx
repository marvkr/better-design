import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Empty State: an empty stage. A dashed hairline outlines the panel
 * where content will land; the glyph sits in a recessed well, the copy is
 * short, and the one action below is the ember button the caller passes.
 */

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-[oklch(1_0_0/0.14)] bg-card/50 px-6 py-10 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-input text-muted-foreground [box-shadow:var(--shadow-inset)] [&_svg]:size-5">
        {icon ?? <InboxIcon />}
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <div className="text-[0.9375rem] font-medium text-foreground">{title}</div>
        {description && <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

// feather:inbox
function InboxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11" /></g>
    </svg>
  )
}

export { EmptyState }
