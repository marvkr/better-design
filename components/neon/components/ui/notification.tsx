import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Dark Neon AI Notification: alert/notification item component

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
  default: "border-border bg-card",
  success:
    "border-[oklch(0.86_0.22_145_/_0.4)] bg-[oklch(0.86_0.22_145_/_0.08)]",
  warning: "border-[oklch(0.78_0.16_75_/_0.4)] bg-[oklch(0.78_0.16_75_/_0.08)]",
  destructive: "border-[oklch(0.62_0.23_25_/_0.4)] bg-[oklch(0.62_0.23_25_/_0.08)]",
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
        "relative flex gap-3 rounded-[0.75rem] border p-4",
        "[box-shadow:var(--shadow-sm)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {unread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary [box-shadow:var(--shadow-neon)]" />
      )}
      {icon && (
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.5rem] bg-secondary text-muted-foreground",
            variant === "success" && "text-primary",
            variant === "destructive" && "text-destructive"
          )}
        >
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
