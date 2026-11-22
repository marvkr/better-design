import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Playful console Notification: a callout band, edged on all four sides.
 *
 * The default is a white card behind the olive hairline. Info takes the
 * pale blue band, success the green, warning the orange and danger the red,
 * each with its own deeper text so the words pass contrast on the tint and
 * a matching edge. The tone is carried by the fill and edge, never by a
 * stripe down one side.
 */
const notificationVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        info: "border-(--info)/40 bg-(--info-tint) text-(--info-text) [&_[data-slot=notification-description]]:text-current",
        success:
          "border-(--success)/40 bg-(--success-tint) text-(--success-text) [&_[data-slot=notification-description]]:text-current",
        warning:
          "border-(--primary-rim)/50 bg-(--warning-tint) text-(--warning-text) [&_[data-slot=notification-description]]:text-current",
        destructive:
          "border-(--destructive)/40 bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=notification-description]]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for Notification: its tone and an optional dismiss handler. */
export interface NotificationProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  onClose?: () => void;
}

/** A callout band; pass `onClose` to show a dismiss button. */
const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      role={variant === "destructive" ? "alert" : "status"}
      data-slot="notification"
      data-variant={variant ?? "default"}
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className={cn(
            "-me-1.5 -mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-current",
            "transition-colors duration-fast ease-out hover:bg-foreground/5 active:bg-foreground/10",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          <Icon icon="ph:x-bold" className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  ),
);
Notification.displayName = "Notification";

/** The bold one-line headline of a notification. */
const NotificationTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="notification-title"
    className={cn("text-sm font-bold leading-snug", className)}
    {...props}
  />
));
NotificationTitle.displayName = "NotificationTitle";

/** The supporting sentence under the title. */
const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="notification-description"
    className={cn(
      "mt-0.5 text-sm text-(--foreground-secondary) first:mt-0",
      className,
    )}
    {...props}
  />
));
NotificationDescription.displayName = "NotificationDescription";

export { Notification, NotificationTitle, NotificationDescription };
