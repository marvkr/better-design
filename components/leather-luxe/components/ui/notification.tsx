import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

// Leather Luxe Notification: a raised card slip; status variants tint the
// surface mint, amber, saddle red or cognac.

const notificationVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-lg border p-4",
    "[box-shadow:var(--shadow-card)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-highlight bg-card text-card-foreground",
        success:
          "border-[oklch(0.85_0.12_162/0.25)] bg-[oklch(0.85_0.12_162/0.08)] text-mint",
        warning:
          "border-[oklch(0.78_0.14_75/0.25)] bg-[oklch(0.78_0.14_75/0.08)] text-[oklch(0.82_0.12_75)]",
        destructive:
          "border-[oklch(0.6_0.16_28/0.3)] bg-[oklch(0.52_0.16_28/0.1)] text-[oklch(0.76_0.12_30)]",
        info: "border-[oklch(0.62_0.115_55/0.3)] bg-[oklch(0.55_0.115_52/0.1)] text-[oklch(0.74_0.1_58)]",
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
          className="shrink-0 rounded-full p-0.5 opacity-60 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
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
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
NotificationTitle.displayName = "NotificationTitle"

const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm opacity-80", className)} {...props} />
))
NotificationDescription.displayName = "NotificationDescription"

export { Notification, NotificationTitle, NotificationDescription }
