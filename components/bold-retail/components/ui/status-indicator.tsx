import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Bold retail StatusIndicator: a small dot beside a plain label, the way a
 * product page says "In stock" or "Only a few left".
 *
 * The label stays in secondary ink at full contrast, and the dot alone
 * carries the state: grey for idle, green for done, amber for attention,
 * red for failure and blue for information. Each variant sets the dot colour
 * on the wrapper, so the exported variants style any custom marker too.
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
        className="size-2 shrink-0 rounded-full bg-(--status-dot)"
      />
      {children}
    </span>
  ),
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };
