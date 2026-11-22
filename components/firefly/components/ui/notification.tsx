import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Firefly Notification: a soft tinted panel, edged on all four sides.
 *
 * The default sits on the white page behind a warm hairline. Info takes the
 * pale yellow-green wash behind a faint olive line, and success, warning
 * and danger each pair a tint with their own darker text, so the words pass
 * contrast on the tint. The tone is carried by the fill, never by a stripe
 * down one side. Nothing here glows.
 */
const notificationVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        info: "border-(--accent-line)/40 bg-(--accent-wash) text-foreground",
        success:
          "border-transparent bg-(--success-tint) text-(--success-text) [&_[data-slot=notification-description]]:text-current",
        warning:
          "border-transparent bg-(--warning-tint) text-(--warning-text) [&_[data-slot=notification-description]]:text-current",
        destructive:
          "border-transparent bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=notification-description]]:text-current",
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
            "-me-1.5 -mt-1.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-current",
            "transition-colors duration-fast ease-out hover:bg-foreground/5 active:bg-foreground/10",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          <Icon icon="carbon:close" className="size-4" aria-hidden="true" />
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
    className={cn("text-sm font-semibold leading-snug", className)}
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
