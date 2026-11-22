import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior StatusIndicator — a small 2px-radius square mark plus a label,
 * never a round dot and never a pulse: a status is a fact, not an animation.
 * Presence is a genuine multi-verdict scale, so warning amber is allowed for
 * away. AvatarStatus seats the same mark on the corner of an avatar tile,
 * punched out in the card colour.
 */

export type StatusType = "online" | "away" | "busy" | "offline";

const markStyles = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-muted-foreground/40",
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
      "inline-flex items-center gap-1.5 text-[0.7813rem] text-muted-foreground",
      className,
    )}
    {...props}
  >
    <span className={cn("size-[0.4375rem] rounded-[0.125rem]", markStyles[status])} />
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
          "absolute bottom-0 right-0 size-[0.4375rem] rounded-[0.125rem] shadow-[0_0_0_0.125rem_var(--card)]",
          markStyles[status],
        )}
      />
    </div>
  ),
);
AvatarStatus.displayName = "AvatarStatus";

export { StatusIndicator, AvatarStatus };
