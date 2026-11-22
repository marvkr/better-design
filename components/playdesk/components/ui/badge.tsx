import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Playdesk Badge — the small caption pill that labels a section on the desk.
 * Tiny, wide-tracked and bold, so it reads as a tag rather than a button.
 */

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full",
    "px-2.5 py-0.5 text-[0.6875rem] font-bold tracking-[0.08em]",
    "transition-colors duration-fast",
    "[&_svg]:size-3 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background-image:var(--fill-primary)] text-primary-foreground",
        secondary: "bg-[color:oklch(0.9_0_180)] text-[color:oklch(0.488_0_185.2)]",
        outline: "text-foreground [box-shadow:var(--shadow-rim)] bg-[color:oklch(0.9_0_191.3)]",
        destructive: "bg-destructive text-destructive-foreground",
        success: "text-[var(--pop-green-foreground)] bg-[color:oklch(0.895_0.045_163.2)]",
        warning: "bg-[color:oklch(0.896_0.06_95.1)] text-[color:oklch(0.492_0.102_78.4)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
