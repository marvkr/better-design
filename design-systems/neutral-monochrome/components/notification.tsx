import * as React from "react"
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const notificationVariants = cva(
  [
    "relative flex gap-3 rounded-[10px] border border-border bg-card px-4 py-3",
    "border-l-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "border-l-primary",
        success:     "border-l-emerald-500",
        warning:     "border-l-orange-500",
        destructive: "border-l-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default:     Info,
  success:     CheckCircle,
  warning:     AlertTriangle,
  destructive: AlertCircle,
}

const iconColorMap = {
  default:     "text-primary",
  success:     "text-emerald-500",
  warning:     "text-orange-500",
  destructive: "text-destructive",
}

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title?: string
  description?: string
  onDismiss?: () => void
  icon?: React.ReactNode
  action?: React.ReactNode
}

function Notification({
  variant = "default",
  title,
  description,
  onDismiss,
  icon,
  action,
  className,
  children,
  ...props
}: NotificationProps) {
  const key = variant ?? "default"
  const DefaultIcon = iconMap[key]
  const iconColor = iconColorMap[key]

  return (
    <div
      role="alert"
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      <div className={cn("mt-0.5 shrink-0", iconColor)}>
        {icon ?? <DefaultIcon className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-0.5 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-foreground">{title}</p>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export { Notification, notificationVariants }
