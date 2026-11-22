import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Ink mail Alert: a callout edged on all four sides by the strong hairline,
 * never a stripe down one. The default sits on the card step. Each status
 * variant lays its tint under the matching text token, so colour only ever
 * reads as status: delivered green, queued yellow, bounced red, opened blue.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-lg border border-(--line-strong) px-4 py-3 text-sm",
    "[&>svg]:absolute [&>svg]:start-4 [&>svg]:top-3.5 [&>svg]:size-4",
    "[&>svg~*]:ps-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-card text-foreground [&>svg]:text-muted-foreground [&_[data-slot=alert-description]]:text-(--foreground-secondary)",
        info: "bg-(--info-tint) text-(--info-text)",
        success: "bg-(--success-tint) text-(--success-text)",
        warning: "bg-(--warning-tint) text-(--warning-text)",
        destructive: "bg-(--destructive-tint) text-(--destructive-text)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    data-slot="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/** The one-line headline, set level with the icon. */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn("mb-0.5 text-sm font-medium leading-5", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/** The body: secondary ink on the default, the status text on a tint. */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn("text-sm leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
