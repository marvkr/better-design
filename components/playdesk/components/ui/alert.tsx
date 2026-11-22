import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Playdesk Alert — a tinted note card. Bordered on all four sides, never a
 * single accent stripe, so it reads as a panel rather than a margin mark.
 */

const alertVariants = cva(
  [
    "relative w-full rounded-xl px-4 py-3.5",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4",
    "[&>svg~*]:pl-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground [box-shadow:var(--shadow-window)]",
        info: "bg-[var(--pop-blue)] text-[var(--pop-blue-foreground)]",
        success: "bg-[var(--pop-green)] text-[var(--pop-green-foreground)]",
        warning: "bg-[var(--pop-yellow)] text-[var(--pop-yellow-foreground)]",
        destructive:
          "bg-destructive/10 text-destructive [box-shadow:inset_0_0_0_0.0625rem_var(--destructive)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 text-sm font-semibold leading-none", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
