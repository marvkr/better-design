import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Margin StatusIndicator: a small solid dot and a label, the way a presence
 * mark sits beside a name. The dot wears a thin ring in the card colour so
 * it stays crisp on any surface; `pulse` adds a soft ring that fades out.
 */
const dotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    status: {
      online: "bg-success",
      offline: "bg-muted-foreground/50",
      busy: "bg-destructive",
      away: "bg-warning",
      idle: "bg-input",
    },
  },
  defaultVariants: {
    status: "online",
  },
});

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
      className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground", className)}
      {...props}
    >
      <span className="relative inline-flex">
        <span className={cn(dotVariants({ status }), "ring-2 ring-card")} />
        {pulse && (
          <span
            aria-hidden
            className={cn(
              dotVariants({ status }),
              "absolute inset-0 animate-ping opacity-50 motion-reduce:hidden",
            )}
          />
        )}
      </span>
      {label && <span className="font-medium text-foreground">{label}</span>}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
