import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Margin Notification: a white sheet bounded by one hairline with a soft
 * floating shadow. Status variants tint the hairline and colour the icon,
 * and the dismiss control is a small ghost square.
 */
const notificationVariants = cva(
  "relative flex gap-2.5 rounded-xl border bg-card p-3.5 text-card-foreground shadow-md",
  {
    variants: {
      variant: {
        default: "border-border",
        info: "border-info/30",
        success: "border-success/30",
        warning: "border-warning/40",
        destructive: "border-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconMap = {
  default: { icon: "solar:bell-bold", color: "text-muted-foreground" },
  info: { icon: "solar:info-circle-bold", color: "text-info-text" },
  success: { icon: "solar:check-circle-bold", color: "text-success-text" },
  warning: { icon: "solar:danger-triangle-bold", color: "text-warning-text" },
  destructive: { icon: "solar:danger-circle-bold", color: "text-destructive-text" },
} as const;

/** Props for a banner: a title, a description, an optional icon, actions and a dismiss handler. */
export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof notificationVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant = "default", title, description, icon, onDismiss, actions, children, ...props }, ref) => {
    const meta = iconMap[variant ?? "default"];
    return (
      <div
        ref={ref}
        data-slot="notification"
        role={variant === "destructive" || variant === "warning" ? "alert" : "status"}
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <div className={cn("mt-px flex size-4.5 shrink-0 items-center justify-center", meta.color)}>
          {icon ?? <Icon icon={meta.icon} className="size-4.5" aria-hidden />}
        </div>
        <div className="min-w-0 flex-1">
          {title && <div className="text-sm font-semibold leading-snug text-foreground">{title}</div>}
          {description && (
            <div className={cn("text-sm leading-snug text-muted-foreground", title && "mt-0.5")}>{description}</div>
          )}
          {children}
          {actions && <div className="mt-2.5 flex items-center gap-1.5">{actions}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "-m-1 flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground",
              "transition-colors duration-fast ease-(--ease-out) pointer-fine:hover:bg-accent pointer-fine:hover:text-foreground",
              focusRing,
            )}
          >
            <Icon icon="solar:close-circle-linear" className="size-4" aria-hidden />
          </button>
        )}
      </div>
    );
  },
);
Notification.displayName = "Notification";

export { Notification };
