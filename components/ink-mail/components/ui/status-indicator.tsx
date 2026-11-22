import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Ink mail StatusIndicator: a delivery-status dot beside a plain label.
 *
 * The label stays in body ink at full contrast, and the dot alone carries
 * the state: grey for idle, green for delivered, yellow for queued, red for
 * bounced or failed, blue for opened. Each variant sets the dot colour on
 * the wrapper, so the exported variants style any custom marker too.
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
        className="size-1.5 shrink-0 rounded-full bg-(--status-dot)"
      />
      {children}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };
