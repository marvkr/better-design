import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Airy docs StatusIndicator: the dot on a status page or an endpoint list.
 * The label stays in secondary ink at full contrast, and a small dot with a
 * soft halo of its own colour carries the state: grey idle, green
 * operational, amber degraded, red down, blue informational.
 */
const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 text-sm text-(--foreground-secondary)",
  {
    variants: {
      variant: {
        default: "[--status-dot:var(--control)]",
        success: "[--status-dot:var(--success)]",
        warning: "[--status-dot:var(--warning)]",
        destructive: "[--status-dot:var(--destructive)]",
        info: "[--status-dot:var(--info)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface StatusIndicatorProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, variant, children, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="status-indicator"
      data-variant={variant ?? "default"}
      className={cn(statusIndicatorVariants({ variant }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-(--status-dot) ring-3 ring-(--status-dot)/20"
      />
      {children}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };
