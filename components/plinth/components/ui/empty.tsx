import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Empty: an empty drop zone on the stage. A dashed hairline frame,
 * the icon seated in a graphite keycap, a short title and one action.
 */

interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ icon, title, description, action, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-3xl p-10 text-center",
        "border border-dashed border-[oklch(1_0_0/0.12)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl text-muted-foreground",
          "[background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)] [&_svg]:size-5"
        )}
      >
        {icon ?? <InboxIcon />}
      </div>
      {(title || description) && (
        <div className="flex max-w-xs flex-col gap-1.5">
          {title && <p className="text-[0.9375rem] font-medium leading-snug tracking-tight text-foreground">{title}</p>}
          {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  )
)
Empty.displayName = "Empty"

// feather:inbox
function InboxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11" /></g>
    </svg>
  )
}

export { Empty }
export type { EmptyProps }
