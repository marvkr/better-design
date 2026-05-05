import * as React from "react"
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationVariant = "default" | "info" | "success" | "warning" | "error"

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NotificationVariant
  title?: string
  description?: string
  icon?: React.ReactNode
  onDismiss?: () => void
  action?: React.ReactNode
}

const variantStyles: Record<
  NotificationVariant,
  { container: string; icon: React.ReactNode; accent: string }
> = {
  default: {
    container: "border-border",
    icon: <Info className="h-4 w-4 text-foreground" />,
    accent: "bg-foreground",
  },
  info: {
    container: "border-blue-200",
    icon: <Info className="h-4 w-4 text-blue-500" />,
    accent: "bg-blue-500",
  },
  success: {
    container: "border-green-200",
    icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    accent: "bg-green-500",
  },
  warning: {
    container: "border-amber-200",
    icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
    accent: "bg-amber-400",
  },
  error: {
    container: "border-red-200",
    icon: <XCircle className="h-4 w-4 text-destructive" />,
    accent: "bg-destructive",
  },
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      variant = "default",
      title,
      description,
      icon,
      onDismiss,
      action,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex gap-3 overflow-hidden rounded-[14px] border bg-card p-4 shadow-sm",
          styles.container,
          className
        )}
        {...props}
      >
        {/* Colored left accent bar */}
        <div
          className={cn("absolute left-0 inset-y-0 w-1 rounded-l-[14px]", styles.accent)}
        />

        {/* Icon */}
        <div className="mt-0.5 shrink-0 pl-1">{icon ?? styles.icon}</div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold text-foreground">{title}</p>
          )}
          {description && (
            <p className={cn("text-sm text-muted-foreground", title && "mt-0.5")}>
              {description}
            </p>
          )}
          {children}
          {action && <div className="mt-3">{action}</div>}
        </div>

        {/* Dismiss */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="shrink-0 rounded-lg p-0.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Notification.displayName = "Notification"

export { Notification }
