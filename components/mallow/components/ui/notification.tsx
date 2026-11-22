import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, optionTrack } from "./_shared";

/**
 * Mallow Notification: a banner on the white card with its icon on a small
 * lilac tile; the warning variant takes a soft orange tint.
 */
const notificationVariants = cva(["relative flex gap-3.5 rounded-2xl p-4", cardSlab].join(" "), {
  variants: {
    variant: {
      default: "",
      info: "inset-ring-1 inset-ring-info/20",
      success: "inset-ring-1 inset-ring-success/20",
      warning: "inset-ring-1 inset-ring-warning/30",
      destructive: "inset-ring-1 inset-ring-destructive/25",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconMap = {
  default: { icon: "iconoir:bell", color: "text-muted-foreground", tile: "" },
  info: { icon: "iconoir:info-circle", color: "text-info-text", tile: "" },
  success: { icon: "iconoir:check-circle", color: "text-success-text", tile: "" },
  warning: { icon: "iconoir:warning-triangle", color: "text-warning-text", tile: "bg-warning/15 shadow-none" },
  destructive: { icon: "iconoir:warning-circle", color: "text-destructive-text", tile: "" },
} as const;

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
        <div
          aria-hidden="true"
          className={cn(optionTrack, "flex size-9 shrink-0 items-center justify-center rounded-md", meta.color, meta.tile)}
        >
          {icon ?? <Icon icon={meta.icon} className="size-4.5" />}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          {title && <div className="text-sm font-medium leading-snug text-foreground">{title}</div>}
          {description && (
            <div className={cn("text-sm leading-relaxed text-muted-foreground", title && "mt-0.5")}>{description}</div>
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
              "-m-1 flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-fast ease-(--ease-out) hover:bg-accent hover:text-foreground",
              focusRing,
            )}
          >
            <Icon icon="iconoir:xmark" aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
Notification.displayName = "Notification";

export { Notification };
