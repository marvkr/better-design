import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Airy docs Alert: the docs callout, as in Note, Tip, Warning and Danger.
 * A rounded box edged on all four sides, never a stripe down one. Each tone
 * pairs a tint with a faint line and its own darker text, so the message
 * passes contrast on its colour. The default is a plain hairline box.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-xl border px-4 py-3 text-sm",
    "[&>svg]:absolute [&>svg]:start-4 [&>svg]:top-3.5 [&>svg]:size-4",
    "[&>svg~*]:ps-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground [&>svg]:text-muted-foreground [&_[data-slot=alert-description]]:text-(--foreground-secondary)",
        info: "border-(--info-text)/20 bg-(--info-tint) text-(--info-text)",
        success: "border-(--success-text)/20 bg-(--success-tint) text-(--success-text)",
        warning: "border-(--warning-text)/20 bg-(--warning-tint) text-(--warning-text)",
        destructive:
          "border-(--destructive-text)/20 bg-(--destructive-tint) text-(--destructive-text)",
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

/** The callout's headline, level with the icon. */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn("mb-0.5 text-sm font-semibold leading-6", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/** The callout body, on the docs body line height. */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn("text-sm leading-6", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
