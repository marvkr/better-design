import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The status dot: a small flat dot, like the marker for a visit status. `pulse`
 * adds a soft ring that fades outward.
 */
const dotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    status: {
      online: "bg-success",
      offline: "bg-input",
      busy: "bg-destructive",
      away: "bg-warning",
      idle: "bg-muted-foreground",
    },
  },
  defaultVariants: {
    status: "online",
  },
});

/** Props for a status dot with an optional label. */
export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {
  label?: React.ReactNode;
  pulse?: boolean;
}

/** Paddock StatusIndicator: a flat coloured dot and a label, like the dot beside a visit status. */
const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, status, label, pulse, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="status-indicator"
      data-status={status ?? "online"}
      className={cn("inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground", className)}
      {...props}
    >
      <span className="relative inline-flex">
        <span className={cn(dotVariants({ status }))} />
        {pulse && (
          <span
            aria-hidden="true"
            className={cn(dotVariants({ status }), "absolute inset-0 animate-ping opacity-50 motion-reduce:hidden")}
          />
        )}
      </span>
      {label && <span className="font-medium text-foreground">{label}</span>}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
