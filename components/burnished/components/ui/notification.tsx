import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing } from "./_shared";

/**
 * Burnished Notification: a banner cut as an umber slab, with the long soft
 * drop of a card so it sits above the page. Status variants tint a hairline
 * inside the rim and colour the icon; the dismiss control is a round ghost.
 */
const notificationVariants = cva(
  ["relative flex gap-3 rounded-2xl p-4", cardSlab].join(" "),
  {
    variants: {
      variant: {
        default: "",
        info: "inset-ring-1 inset-ring-info/25",
        success: "inset-ring-1 inset-ring-success/25",
        warning: "inset-ring-1 inset-ring-warning/25",
        destructive: "inset-ring-1 inset-ring-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconMap = {
  default: { icon: "ph:bell", color: "text-muted-foreground" },
  info: { icon: "ph:info", color: "text-info" },
  success: { icon: "ph:check-circle", color: "text-success" },
  warning: { icon: "ph:warning", color: "text-warning" },
  destructive: { icon: "ph:warning-circle", color: "text-destructive" },
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
  (
    { className, variant = "default", title, description, icon, onDismiss, actions, children, ...props },
    ref,
  ) => {
    const meta = iconMap[variant ?? "default"];
    return (
      <div
        ref={ref}
        data-slot="notification"
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <div className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center", meta.color)}>
          {icon ?? <Icon icon={meta.icon} className="size-5" />}
        </div>
        <div className="min-w-0 flex-1">
          {title && <div className="text-sm font-semibold leading-snug text-foreground">{title}</div>}
          {description && (
            <div className={cn("text-sm leading-relaxed text-muted-foreground", title && "mt-1")}>
              {description}
            </div>
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
              "transition-colors duration-fast ease-(--ease-out)",
              "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
              focusRing,
            )}
          >
            <Icon icon="ph:x" className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
Notification.displayName = "Notification";

export { Notification };
