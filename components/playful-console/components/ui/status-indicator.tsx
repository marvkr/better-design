import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Playful console StatusIndicator: a small square dot beside a plain label,
 * like a status light on a console panel.
 *
 * The label stays in the secondary ink, so it reads at full contrast, and
 * the dot alone carries the state: olive grey for idle, green for done,
 * orange for attention, red for failure and blue for something running.
 * Each variant sets the dot colour on the wrapper, so the exported variants
 * style any custom marker too.
 */
const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium text-(--foreground-secondary)",
  {
    variants: {
      variant: {
        default: "[--status-dot:var(--control)]",
        success: "[--status-dot:var(--success)]",
        warning: "[--status-dot:var(--primary)]",
        destructive: "[--status-dot:var(--destructive)]",
        info: "[--status-dot:var(--info)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for StatusIndicator: any span attribute plus the state. */
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
        className="size-2.5 shrink-0 rounded-[0.125rem] border border-(--ink)/20 bg-(--status-dot)"
      />
      {children}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };
