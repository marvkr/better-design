import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

const notificationVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-[10px] p-4",
    "border",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-card text-foreground border-border",
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
        warning: "bg-amber-500/10 border-amber-500/20 text-amber-600",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive",
        info: "bg-primary/10 border-primary/20 text-primary",
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
          onClick={onClose}
          className="shrink-0 rounded-[6px] p-0.5 opacity-70 transition-all duration-150 hover:opacity-100 active:scale-[0.98]"
        >
          <Icon icon="tabler:x" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
)
Notification.displayName = "Notification"

const NotificationTitle = React.forwardRef<
  HTMLParagraphElement,
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
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
NotificationDescription.displayName = "NotificationDescription"

export { Notification, NotificationTitle, NotificationDescription }
