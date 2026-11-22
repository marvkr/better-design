import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Gauge Dark Notification: a nested message panel with a status-hued border
// and an unread lamp in the gauge gold.

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  variant?: "default" | "success" | "warning" | "destructive";
  unread?: boolean;
}

const variantClasses = {
  default: "border-border",
  success: "border-[oklch(0.74_0.12_152/0.35)]",
  warning: "border-[oklch(0.76_0.14_70/0.35)]",
  destructive: "border-destructive/40",
};

function Notification({
  icon,
  title,
  description,
  action,
  onDismiss,
  variant = "default",
  unread,
  className,
  ...props
}: NotificationProps) {
  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border bg-[var(--gauge-nested)] p-4",
        "shadow-[var(--shadow-nested)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {unread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary shadow-[0_0_0.375rem_oklch(0.8_0.115_85/0.5)]" />
      )}
      {icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground shadow-[var(--shadow-raised)]">
          {icon}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      )}
    </div>
  );
}

export { Notification };
export type { NotificationProps };
