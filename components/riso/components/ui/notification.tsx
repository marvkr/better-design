import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Retro-Playful Notification: alert/notification item component

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  onDismiss?: () => void
  variant?: "default" | "success" | "warning" | "destructive"
  unread?: boolean
}

const variantClasses = {
  default: "border-border",
  success: "border-border bg-[oklch(0.6889_0.1644_152.71)]/15",
  warning: "border-border bg-[oklch(0.7041_0.1885_47.62)]/15",
  destructive: "border-destructive/20 bg-destructive/5",
}

function Notification({
  icon,
  title,
  description,
  action,
  onDismiss,
  variant = "default",
  unread,
  className,
  ...props
}: NotificationProps) {
  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border-2 border-border bg-background p-4",
        "shadow-[var(--shadow-hard)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {unread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary" />
      )}
      {icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      )}
    </div>
  )
}

export { Notification }
export type { NotificationProps }
