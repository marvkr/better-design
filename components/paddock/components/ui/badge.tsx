import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { primaryFace } from "./_shared";

/**
 * Paddock Badge: a small flat chip with a 0.375rem corner.
 *
 * The default is the quiet tag chip: cool grey fill with slate text. The
 * visit statuses each own a hue: `booked` is a teal outline, `arrived` sky
 * blue, `in-room` violet, `done` slate grey and `late` coral red, each a pale
 * tint of its hue with deep text in the same hue. `urgent` is the late tint.
 * `primary` and `solid` are the teal fill of the primary button.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-sm font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground/10 text-secondary-foreground",
        primary: primaryFace,
        solid: primaryFace,
        secondary: "bg-card text-foreground ring-1 ring-inset ring-border",
        outline: "border border-input bg-transparent text-muted-foreground",
        booked: "bg-transparent text-(--status-booked-text) ring-1 ring-inset ring-(--status-booked)/60",
        arrived: "bg-(--status-arrived)/26 text-(--status-arrived-text)",
        "in-room": "bg-(--status-in-room)/20 text-(--status-in-room-text)",
        done: "bg-(--status-done)/26 text-(--status-done-text)",
        late: "bg-(--status-late)/16 text-(--status-late-text)",
        urgent: "bg-(--status-late)/16 text-(--status-late-text)",
        info: "bg-info/16 text-info-text",
        success: "bg-success/18 text-success-text",
        warning: "bg-warning/36 text-warning-text",
        destructive: "bg-destructive/16 text-destructive-text",
        blue: "bg-info/16 text-info-text",
        green: "bg-success/18 text-success-text",
        orange: "bg-(--status-late)/16 text-(--status-late-text)",
        yellow: "bg-warning/36 text-warning-text",
        purple: "bg-(--status-in-room)/20 text-(--status-in-room-text)",
      },
      size: {
        sm: "h-4.5 px-1.5 text-xs",
        default: "h-5 px-1.5 text-xs",
        lg: "h-6 px-2 text-[0.8125rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
