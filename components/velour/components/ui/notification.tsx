import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * A floating velvet strip on the shared --shadow-l token. Status tints
 * stay dim, like the reference's muted labels.
 */

const notificationVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-lg p-4",
    "[box-shadow:var(--shadow-l)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "[background-image:var(--velour)] text-foreground",
        success:
          "bg-[oklch(0.45_0.09_165)]/15 text-[oklch(0.82_0.11_165)]",
        warning:
          "bg-[oklch(0.5_0.1_80)]/15 text-[oklch(0.85_0.1_85)]",
        destructive: "bg-destructive/15 text-[oklch(0.78_0.14_22)]",
        info: "bg-primary/10 text-primary",
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
          className="shrink-0 rounded-md p-0.5 opacity-60 transition-opacity duration-fast hover:opacity-100"
        >
          <Icon icon="tabler:x" className="h-4 w-4" />
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
  <p
    ref={ref}
    className={cn("text-sm opacity-80", className)}
    {...props}
  />
))
NotificationDescription.displayName = "NotificationDescription"

export { Notification, NotificationTitle, NotificationDescription }
