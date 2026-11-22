import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Notification — inline notification/banner with icon, title, description, and
 * dismiss. A raised chrome card (shadow-md) with a hairline rim; the accent
 * variants tint only the rim so the metal surface stays neutral.
 */

const notificationVariants = cva(
  "relative flex gap-3 rounded-xl p-4 border " +
    "bg-card text-foreground " +
    "[box-shadow:var(--shadow-md)] " +
    "transition-[background-color,box-shadow,border-color] duration-fast",
  {
    variants: {
      variant: {
        default: "border-white/10",
        info: "border-primary/40",
        success: "border-[oklch(0.62_0.13_150)]/40",
        warning: "border-[oklch(0.68_0.15_75)]/40",
        destructive: "border-[oklch(0.6_0.2_25)]/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type NotificationVariant = NonNullable<VariantProps<typeof notificationVariants>["variant"]>

const iconColor = {
  default: "text-muted-foreground",
  info: "text-primary",
  success: "text-[oklch(0.72_0.13_150)]",
  warning: "text-[oklch(0.78_0.15_75)]",
  destructive: "text-[oklch(0.68_0.2_25)]",
} satisfies Record<NotificationVariant, string>

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
)

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 9h.01" />
    <path d="M11 12h1v4h1" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 9v4" />
    <path d="M10.36 3.6 2.3 18a2 2 0 0 0 1.74 3h15.92a2 2 0 0 0 1.74-3L13.64 3.6a2 2 0 0 0-3.28 0Z" />
    <path d="M12 17h.01" />
  </svg>
)

const AlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
)

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const iconForVariant = {
  default: BellIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  destructive: AlertIcon,
} satisfies Record<NotificationVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>>

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
    { className, variant = "default", title, description, icon, onDismiss, actions, children, ...props },
    ref
  ) => {
    const key = variant ?? "default"
    const DefaultIcon = iconForVariant[key]
    return (
      <div ref={ref} className={cn(notificationVariants({ variant }), className)} {...props}>
        <div className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center", iconColor[key])}>
          {icon ?? <DefaultIcon className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          {title && <div className="text-sm font-semibold leading-none">{title}</div>}
          {description && (
            <div className={cn("text-sm leading-relaxed text-muted-foreground", title && "mt-1")}>
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
              "shrink-0 rounded-md p-1 text-muted-foreground",
              "transition-[background-color,color] duration-fast",
              "hover:bg-accent hover:text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring/40"
            )}
            aria-label="Dismiss"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Notification.displayName = "Notification"

export { Notification }
