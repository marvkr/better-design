import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { folioGrainStyle } from "./_shared"

/*
 * Notification — inline notification/banner with icon, title, description, and dismiss.
 * More prominent than Alert, typically used at the top of a page.
 */

const notificationVariants = cva(
  "relative flex gap-3 rounded-xl p-4 border " +
    "bg-popover text-popover-foreground " +
    "[box-shadow:var(--shadow-l)] " +
    "transition-[background-color,box-shadow] duration-fast",
  {
    variants: {
      variant: {
        default: "border-border",
        info: "border-primary/30",
        success: "border-[oklch(0.5_0.15_145)]/30",
        warning: "border-[oklch(0.55_0.18_55)]/30",
        destructive: "border-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default: { icon: "ph:bell", color: "text-muted-foreground" },
  info: { icon: "ph:info", color: "text-primary" },
  success: { icon: "ph:check-circle", color: "text-[oklch(0.78_0.15_145)]" },
  warning: { icon: "ph:warning", color: "text-[oklch(0.82_0.14_80)]" },
  destructive: { icon: "ph:warning-circle", color: "text-destructive" },
} as const

export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof notificationVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  onDismiss?: () => void
  actions?: React.ReactNode
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    { className, variant = "default", title, description, icon, onDismiss, actions, children, style, ...props },
    ref
  ) => {
    const meta = iconMap[variant ?? "default"]
    return (
      <div
        ref={ref}
        style={{ ...folioGrainStyle, ...style }}
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <div className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center", meta.color)}>
          {icon ?? <Icon icon={meta.icon} className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          {title && <div className="text-sm font-semibold leading-none">{title}</div>}
          {description && (
            <div className={cn("text-sm text-muted-foreground leading-relaxed", title && "mt-1")}>
              {description}
            </div>
          )}
          {children}
          {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              "shrink-0 rounded-lg p-1 text-muted-foreground",
              "transition-[background-color,color] duration-fast",
              "hover:bg-accent hover:text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring/40"
            )}
            aria-label="Dismiss"
          >
            <Icon icon="ph:x" className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Notification.displayName = "Notification"

export { Notification }
