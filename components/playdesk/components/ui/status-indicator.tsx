import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk StatusIndicator — a dot plus a label. AvatarStatus pins the same
 * dot to the corner of an avatar, ringed in the surface colour.
 */

export type StatusType = "online" | "away" | "busy" | "offline";

const dotStyles = {
  online: "bg-[var(--success)]",
  away: "bg-[var(--warning)]",
  busy: "bg-destructive",
  offline: "bg-muted-foreground",
} satisfies Record<StatusType, string>;

const labels = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
} satisfies Record<StatusType, string>;

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  showLabel?: boolean;
}

const StatusIndicator = React.forwardRef<
  HTMLSpanElement,
  StatusIndicatorProps
>(({ className, status, showLabel = true, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1.5 text-sm text-muted-foreground",
      className,
    )}
    {...props}
  >
    <span className={cn("size-2 rounded-full", dotStyles[status])} />
    {showLabel ? labels[status] : <span className="sr-only">{labels[status]}</span>}
  </span>
));
StatusIndicator.displayName = "StatusIndicator";

export interface AvatarStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
}

const AvatarStatus = React.forwardRef<HTMLDivElement, AvatarStatusProps>(
  ({ className, status, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative inline-flex", className)} {...props}>
      {children}
      <span
        aria-label={labels[status]}
        className={cn(
          "absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-card",
          dotStyles[status],
        )}
      />
    </div>
  ),
);
AvatarStatus.displayName = "AvatarStatus";

export { StatusIndicator, AvatarStatus };
