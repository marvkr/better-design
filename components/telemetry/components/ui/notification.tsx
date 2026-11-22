import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Control Room Notification: event card from the alarm feed.
// Signal-tinted plate with matching border; severity is carried by the
// status color, not by decoration.

const notificationVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-sm border p-4",
    "border-l-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-card border-border border-l-border text-foreground",
        success:
          "bg-primary/10 border-primary/30 border-l-primary text-primary",
        warning:
          "bg-(--warning)/10 border-(--warning)/30 border-l-(--warning) text-(--warning)",
        destructive:
          "bg-destructive/10 border-destructive/30 border-l-destructive text-destructive",
        info: "bg-(--info)/10 border-(--info)/30 border-l-(--info) text-(--info)",
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
  onClose?: () => void
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-xs p-0.5 opacity-60 transition-opacity hover:opacity-100"
        >
          <Icon icon="tabler:x" className="size-4" />
        </button>
      )}
    </div>
  )
)
Notification.displayName = "Notification"

const NotificationTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 text-xs font-semibold uppercase tracking-widest leading-none",
      className
    )}
    {...props}
  />
))
NotificationTitle.displayName = "NotificationTitle"

const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-xs opacity-80", className)} {...props} />
))
NotificationDescription.displayName = "NotificationDescription"

export { Notification, NotificationTitle, NotificationDescription }
