import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

const notificationVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-xl p-4",
    "backdrop-blur-xl border border-white/[0.08]",
    "shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_0_8px_rgba(255,255,255,0.05)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-white/[0.05] text-foreground",
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        warning: "bg-orange-500/10 border-orange-500/20 text-orange-400",
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
          className="shrink-0 rounded-full p-0.5 opacity-60 transition-opacity hover:opacity-100"
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
    className={cn("text-sm opacity-80", className)}
    {...props}
  />
))
NotificationDescription.displayName = "NotificationDescription"

export { Notification, NotificationTitle, NotificationDescription }
