import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/*
 * Ops Sharp Notification — a crisp white ops card with a status accent. The
 * variant tints come from the DS status tokens (success/warning/destructive)
 * via a low-alpha wash + matching border, never raw color names.
 */

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
  success: "border-success/30 bg-success/10",
  warning: "border-warning/40 bg-warning/10",
  destructive: "border-destructive/30 bg-destructive/5",
} satisfies Record<
  NonNullable<NotificationProps["variant"]>,
  string
>;

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
        "relative flex gap-3 rounded-lg border bg-card p-4",
        "[box-shadow:var(--shadow-s)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {unread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary" />
      )}
      {icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
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
