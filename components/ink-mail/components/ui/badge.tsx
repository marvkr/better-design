import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Ink mail Badge: a small pill in Inter medium.
 *
 * The default is the secondary step behind the strong hairline. Solid and
 * primary take the off-white fill with black ink. Status badges lay a tint
 * under the matching text and lead with a dot in the full status colour:
 * delivered green, queued yellow, bounced red, opened blue.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-(--line-strong) bg-secondary text-(--foreground-secondary)",
        primary: "bg-primary text-primary-foreground",
        secondary: "text-secondary-foreground bg-[color:oklch(0.235_0.004_286)]",
        outline: "border border-(--line-strong) bg-transparent text-foreground",
        success:
          "bg-(--success-tint) text-(--success-text) before:size-1.5 before:shrink-0 before:rounded-full before:bg-success",
        warning:
          "bg-(--warning-tint) text-(--warning-text) before:size-1.5 before:shrink-0 before:rounded-full before:bg-warning",
        destructive:
          "before:size-1.5 before:shrink-0 before:rounded-full before:bg-destructive bg-[color:oklch(0.641_0.245_20.6/0.21)] text-[color:oklch(0.875_0.066_20.6)]",
        info:
          "bg-(--info-tint) before:size-1.5 before:shrink-0 before:rounded-full before:bg-info text-[color:oklch(0.875_0.063_251.4)]",
        solid: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        default: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
