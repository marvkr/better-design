import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

// Heyclicky Notification: a tinted card on the dotted desktop, bordered on
// all four sides like the DS's own Alert and Card. Severity is carried by the
// status color, not by a side stripe.

const notificationVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border p-4",
  {
    variants: {
      variant: {
        default: "bg-card border-border text-foreground",
        success: "bg-(--success)/10 border-(--success)/30 text-(--success)",
        warning: "bg-(--warning)/10 border-(--warning)/30 text-(--warning)",
        destructive:
          "bg-destructive/10 border-destructive/30 text-destructive",
        info: "bg-primary/10 border-primary/30 text-primary",
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
  ),
);
Notification.displayName = "Notification";

const NotificationTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 text-xs font-semibold uppercase tracking-widest leading-none",
      className,
    )}
    {...props}
  />
));
NotificationTitle.displayName = "NotificationTitle";

const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-xs opacity-80", className)} {...props} />
));
NotificationDescription.displayName = "NotificationDescription";

export { Notification, NotificationTitle, NotificationDescription };
