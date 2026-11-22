import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Precision Notification: alert/notification surface on the shared popover
// material (white card, hairline border, whisper-soft drop).

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
  success:
    "border-[oklch(0.85_0.09_152)] bg-[oklch(0.97_0.03_152)] text-foreground",
  warning:
    "border-[oklch(0.86_0.1_75)] bg-[oklch(0.97_0.04_75)] text-foreground",
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
        "relative flex gap-3 rounded-md border bg-popover p-4 text-popover-foreground",
        "shadow-[var(--shadow-popover)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {unread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary" />
      )}
      {icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-muted-foreground">
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
