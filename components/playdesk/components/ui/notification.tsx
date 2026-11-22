import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Notification — a floating window with an unread dot, the shape the
 * desk uses for anything that arrived rather than anything you opened.
 */

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  time?: string;
  unread?: boolean;
  onDismiss?: () => void;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    { className, title, description, time, unread, onDismiss, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative flex gap-3 rounded-xl bg-card p-4",
        "[box-shadow:var(--shadow-window)]",
        className,
      )}
      {...props}
    >
      {unread ? (
        <span
          aria-label="Unread"
          className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
        />
      ) : null}
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {time ? (
          <p className="pt-1 text-[0.6875rem] text-muted-foreground">{time}</p>
        ) : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  ),
);
Notification.displayName = "Notification";

export { Notification };
