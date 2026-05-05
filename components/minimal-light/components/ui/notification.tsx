import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe Notification: alert card with subtle left border indicator
// Monochromatic: default/info = white border; error = destructive; no green/yellow

const notificationVariants = cva(
  [
    "relative flex w-full gap-4 overflow-hidden rounded-xl border border-border/60 bg-card p-4",
    "text-sm text-foreground tracking-wide",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:rounded-full before:bg-foreground/30",
        info:
          "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:rounded-full before:bg-primary",
        warning:
          "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:rounded-full before:bg-muted-foreground",
        error:
          "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:rounded-full before:bg-destructive border-destructive/20 bg-destructive/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
  onDismiss?: () => void
}

function Notification({
  variant,
  icon,
  title,
  description,
  action,
  onDismiss,
  className,
  children,
  ...props
}: NotificationProps) {
  return (
    <div className={cn(notificationVariants({ variant }), className)} role="alert" {...props}>
      {icon && (
        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-medium text-foreground leading-tight">{title}</p>
        )}
        {description && (
          <p className={cn("text-muted-foreground text-sm", title && "mt-0.5")}>
            {description}
          </p>
        )}
        {children}
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Notification, notificationVariants }
