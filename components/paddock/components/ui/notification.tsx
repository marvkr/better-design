import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing } from "./_shared";

/**
 * The banner shell: a flat white card. Status variants change only the
 * icon tile, a pale tint of the status hue, so the card itself stays calm.
 */
const notificationVariants = cva(["relative flex gap-3 rounded-xl p-3.5", cardSlab].join(" "), {
  variants: {
    variant: {
      default: "",
      info: "",
      success: "",
      warning: "",
      destructive: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconMap = {
  default: { icon: "mingcute:notification-line", tile: "bg-secondary text-secondary-foreground" },
  info: { icon: "mingcute:information-line", tile: "bg-info/10 text-info-text" },
  success: { icon: "mingcute:check-circle-line", tile: "bg-success/12 text-success-text" },
  warning: { icon: "mingcute:warning-line", tile: "bg-warning/18 text-warning-text" },
  destructive: { icon: "mingcute:close-circle-line", tile: "bg-destructive/10 text-destructive-text" },
} as const;

/** Props for a banner with a title, a description, actions and a dismiss control. */
export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof notificationVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}

/** Paddock Notification: a white card banner with a tinted icon tile and a round dismiss control. */
const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    { className, variant = "default", title, description, icon, onDismiss, actions, children, ...props },
    ref,
  ) => {
    const meta = iconMap[variant ?? "default"];
    return (
      <div
        ref={ref}
        data-slot="notification"
        data-variant={variant ?? "default"}
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className={cn("flex size-8 shrink-0 items-center justify-center rounded-md [&_svg]:size-4", meta.tile)}
        >
          {icon ?? <Icon icon={meta.icon} className="size-4" />}
        </div>
        <div className="min-w-0 flex-1 pt-1">
          {title && <div className="text-sm font-semibold text-foreground">{title}</div>}
          {description && (
            <div className={cn("text-[0.8125rem] text-muted-foreground", title && "mt-0.5")}>{description}</div>
          )}
          {children}
          {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground",
              "transition-colors duration-fast ease-out hover:bg-accent hover:text-foreground",
              focusRing,
            )}
          >
            <Icon icon="mingcute:close-line" aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
Notification.displayName = "Notification";

export { Notification };
