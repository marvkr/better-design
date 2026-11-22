"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass Notification: glass row; unread rows carry an amber dot.

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  onDismiss?: () => void
  variant?: "default" | "success" | "warning" | "destructive"
  unread?: boolean
}

const variantIconColor = {
  default: "text-primary",
  success: "text-[oklch(0.72_0.15_155)]",
  warning: "text-[oklch(0.78_0.14_80)]",
  destructive: "text-[oklch(0.7_0.18_27)]",
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    { className, icon, title, description, action, onDismiss, variant = "default", unread, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full items-start gap-3 rounded-xl p-4",
        "backdrop-blur-[var(--ag-blur)] bg-card",
        "border border-[color:var(--ag-border)]",
        "shadow-[var(--shadow-glass)]",
        className
      )}
      {...props}
    >
      {unread && (
        <span
          aria-label="Unread"
          className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0.5rem_oklch(0.69_0.195_42/0.6)]"
        />
      )}
      {icon && (
        <span
          className={cn(
            "mt-0.5 shrink-0 [&>svg]:h-4 [&>svg]:w-4",
            variantIconColor[variant]
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-bold tracking-[-0.01em]">{title}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Icon icon="tabler:x" className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
)
Notification.displayName = "Notification"

export { Notification }
export type { NotificationProps }
