import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Burnished StatusIndicator: a small lamp and a label. Each dot sits in the
 * same dark rim as the copper ring, like an indicator light set into the
 * panel; `pulse` adds a soft ring that fades outward.
 */
const dotVariants = cva(
  "size-2 shrink-0 rounded-full shadow-(--ring-rim)",
  {
    variants: {
      status: {
        online: "bg-success",
        offline: "bg-muted-foreground/60",
        busy: "bg-destructive",
        away: "bg-warning",
        idle: "bg-muted-foreground/40",
      },
    },
    defaultVariants: {
      status: "online",
    },
  },
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {
  label?: React.ReactNode;
  pulse?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, status, label, pulse, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="status-indicator"
      data-status={status ?? "online"}
      className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}
      {...props}
    >
      <span className="relative inline-flex">
        <span className={cn(dotVariants({ status }))} />
        {pulse && (
          <span
            aria-hidden
            className={cn(
              dotVariants({ status }),
              "absolute inset-0 animate-ping opacity-60 shadow-none motion-reduce:hidden",
            )}
          />
        )}
      </span>
      {label && <span className="font-semibold text-foreground">{label}</span>}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
