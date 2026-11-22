import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Interior Alert — a note set into the page as a bordered card, edged on all
 * four sides; a single accent stripe is banned. The verdict is carried by the
 * border tint and the title ink, not by a flooded background: the body stays
 * muted so the message reads calmly.
 */

const alertVariants = cva(
  [
    "relative w-full rounded-[0.6875rem] border bg-card px-4 py-3.5",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4",
    "[&>svg~*]:pl-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border text-foreground",
        info: "border-accent-foreground/30 text-accent-foreground",
        success: "border-success/40 text-success",
        warning: "border-warning/40 text-warning",
        destructive: "border-destructive/40 text-destructive",
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
    className={cn(
      "mb-1 text-[0.8125rem] font-medium leading-snug tracking-[-0.01em]",
      className,
    )}
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
    className={cn(
      "text-[0.7813rem] leading-relaxed text-muted-foreground",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
