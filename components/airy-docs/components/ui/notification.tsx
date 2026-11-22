import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Notification: a docs callout, the Note, Tip, Warning and Danger
 * boxes a docs page drops between paragraphs.
 *
 * Each one is a rounded box edged on all four sides. The default is white
 * behind a hairline. Info, success, warning and danger each pair a pale tint
 * with a faint border in the same hue and their own darker text, so the
 * words pass contrast on the tint. The tone lives in the fill and the edge,
 * never in a stripe down one side.
 */
const notificationVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        info:
          "border-(--info-text)/20 bg-(--info-tint) text-(--info-text) [&_[data-slot=notification-description]]:text-current",
        success:
          "border-(--success-text)/20 bg-(--success-tint) text-(--success-text) [&_[data-slot=notification-description]]:text-current",
        warning:
          "border-(--warning-text)/20 bg-(--warning-tint) text-(--warning-text) [&_[data-slot=notification-description]]:text-current",
        destructive:
          "border-(--destructive-text)/20 bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=notification-description]]:text-current",
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
            "-me-1.5 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-current opacity-70",
            "outline-none transition-[opacity,background-color] duration-fast hover:bg-current/10 hover:opacity-100",
            "focus-visible:ring-3 focus-visible:ring-ring",
          )}
        >
          <Icon icon="feather:x" className="size-3.5" aria-hidden="true" />
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
    className={cn("text-sm font-semibold", className)}
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
      "mt-1 text-sm text-(--foreground-secondary) first:mt-0",
      className,
    )}
    {...props}
  />
));
NotificationDescription.displayName = "NotificationDescription";

export { Notification, NotificationTitle, NotificationDescription };
