"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { tbCardSurface } from "./_shared";

// Talentboard Notification: inbox row on the card surface; unread shows the
// orange dot.

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  variant?: "default" | "success" | "warning" | "destructive";
  unread?: boolean;
}

const iconVariant = {
  default: "text-primary",
  success: "text-[color:var(--tb-success)]",
  warning: "text-[color:var(--tb-gold)]",
  destructive: "text-destructive",
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
      className={cn(tbCardSurface, "relative flex items-start gap-3 rounded-xl p-4", className)}
      {...props}
    >
      {unread && (
        <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary" />
      )}
      {icon && (
        <span className={cn("mt-0.5 shrink-0 [&_svg]:size-4", iconVariant[variant])}>{icon}</span>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{title}</div>
        {description && <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export { Notification };
export type { NotificationProps };
