import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Bold retail Badge: a small pill.
 *
 * The default is the black pill, the same ink as the primary button. The
 * outline badge is the white "Just in" promo tag on a product tile. Status
 * badges pair a light tint with its own darker text, and red appears only
 * for sale and error states.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "text-secondary-foreground bg-[color:oklch(0.925_0_191.3)] dark:bg-[color:oklch(0.56_0_181.4)]",
        outline: "border border-border bg-background text-foreground",
        success: "text-(--success-text) bg-[color:oklch(0.518_0.126_155.8/0.15)] dark:bg-[color:oklch(0.518_0.126_155.8/0.2)] dark:text-[color:oklch(0.875_0.15_150)]",
        warning: "text-(--warning-text) bg-[color:oklch(0.72_0.15_70/0.24)] dark:text-[color:oklch(0.875_0.119_80)]",
        destructive: "text-(--destructive-text) bg-[color:oklch(0.545_0.223_28.8/0.12)] dark:bg-[color:oklch(0.545_0.223_28.8/0.27)] dark:text-[color:oklch(0.875_0.066_25)]",
        solid: "bg-foreground text-background",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        default: "h-6 px-3 text-xs",
        lg: "h-7 px-3.5 text-sm",
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
