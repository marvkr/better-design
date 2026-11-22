import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard StatusIndicator: live-state dots like the portal's Live badge.

type StatusType = "online" | "offline" | "busy" | "away" | "idle";

const statusConfig = {
  online: { label: "Online", className: "bg-[oklch(0.66_0.15_152)]" },
  offline: { label: "Offline", className: "bg-muted-foreground/40" },
  busy: { label: "Busy", className: "bg-destructive" },
  away: { label: "Away", className: "bg-[oklch(0.8_0.13_78)]" },
  idle: { label: "Idle", className: "bg-[oklch(0.82_0.13_80)]" },
} satisfies Record<StatusType, { label: string; className: string }>;

const dotSize = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

function StatusIndicator({
  status,
  showLabel = false,
  size = "md",
  pulse = false,
  className,
  ...props
}: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <span className="relative inline-flex">
        <span className={cn("rounded-full", dotSize[size], config.className)} />
        {pulse && (
          <span
            className={cn(
              "absolute inset-0 animate-ping rounded-full opacity-60",
              config.className
            )}
          />
        )}
      </span>
      {showLabel && <span className="text-xs font-medium text-muted-foreground">{config.label}</span>}
    </div>
  );
}

interface AvatarStatusProps {
  status: StatusType;
  className?: string;
}

function AvatarStatus({ status, className }: AvatarStatusProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[color:var(--card)]",
        config.className,
        className
      )}
    />
  );
}

export { StatusIndicator, AvatarStatus };
export type { StatusIndicatorProps, AvatarStatusProps, StatusType };
