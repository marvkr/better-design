import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Gauge Dark Alert: a level-2 panel (panel inside a panel) carrying a status
// hue. The nested shadow keeps it physically above the card it sits on.

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 shadow-[var(--shadow-nested)] [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-0.1875rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default:
          "border-border bg-[var(--gauge-nested)] text-foreground [&>svg]:text-primary",
        destructive:
          "border-destructive/40 bg-[var(--gauge-nested)] text-[oklch(0.78_0.14_25)] [&>svg]:text-[oklch(0.72_0.16_25)]",
        success:
          "border-[oklch(0.74_0.12_152/0.35)] bg-[var(--gauge-nested)] text-[var(--gauge-ok)] [&>svg]:text-[var(--gauge-ok)]",
        warning:
          "border-[oklch(0.76_0.14_70/0.35)] bg-[var(--gauge-nested)] text-[var(--gauge-warn)] [&>svg]:text-[var(--gauge-warn)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
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
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
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
    className={cn("text-sm text-muted-foreground [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
