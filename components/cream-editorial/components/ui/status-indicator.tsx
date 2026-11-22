import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Cream editorial StatusIndicator: a small round dot set before a plain
 * sans label.
 *
 * The label stays in secondary ink so it always reads, and the dot alone
 * carries the state: warm grey when idle, green when done, amber for
 * attention, red for failure, and blue for information. Each variant sets
 * the dot colour on the wrapper, so a custom marker can read it too.
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
