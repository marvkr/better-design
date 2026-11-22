import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Ink mail Notification: a tinted panel edged by the strong hairline on all
 * four sides.
 *
 * The default sits on the card step. Info (opened), success (delivered),
 * warning (queued) and destructive (bounced) each pair a faint status tint
 * with their own lighter text, so the words pass contrast on the black page.
 * Colour carries status only, and never runs as a stripe down one side.
 */
const notificationVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border border-(--line-strong) px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground",
        info: "bg-(--info-tint) text-(--info-text) [&_[data-slot=notification-description]]:text-current",
        success:
          "bg-(--success-tint) text-(--success-text) [&_[data-slot=notification-description]]:text-current",
        warning:
          "bg-(--warning-tint) text-(--warning-text) [&_[data-slot=notification-description]]:text-current",
        destructive:
          "bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=notification-description]]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface NotificationProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  onClose?: () => void;
}

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
            "outline-none transition-colors duration-fast ease-out hover:bg-(--wash)",
            "focus-visible:ring-3 focus-visible:ring-ring",
          )}
        >
          <Icon icon="ph:x" className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  ),
);
Notification.displayName = "Notification";

const NotificationTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="notification-title"
    className={cn("text-sm font-medium leading-snug", className)}
    {...props}
  />
));
NotificationTitle.displayName = "NotificationTitle";

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
