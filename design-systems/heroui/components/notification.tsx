import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Dynamic Notification: card bg alert item, colored left border variants

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
  default:     "border-l-4 border-l-primary",
  success:     "border-l-4 border-l-[hsl(var(--success))]",
  warning:     "border-l-4 border-l-[hsl(var(--warning))]",
  destructive: "border-l-4 border-l-destructive",
}

function Notification({ icon, title, description, action, onDismiss, variant = "default", unread, className, ...props }: NotificationProps) {
  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-xl bg-card p-4",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {unread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary shadow-[0_0_0_3px_hsl(212_100%_47%/0.3)]" />
      )}
      {icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
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
