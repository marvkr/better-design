import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Firefly Alert: a note edged on all four sides, never a stripe down one.
 * The default is a white card behind a hairline. Info takes the pale
 * yellow-green wash under a soft olive line, and success, warning and
 * destructive each pair a tint with its own darker text, so the message
 * passes contrast on its own colour. Alerts never glow.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-xl border p-4 text-sm",
    "[&>svg]:absolute [&>svg]:start-4 [&>svg]:top-4 [&>svg]:size-5",
    "[&>svg~*]:ps-8",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground [&>svg]:text-foreground [&_[data-slot=alert-description]]:text-(--foreground-secondary)",
        info:
          "border-(--accent-line)/40 bg-(--accent-wash) text-foreground [&>svg]:text-(--accent-line) [&_[data-slot=alert-description]]:text-(--foreground-secondary)",
        success: "border-transparent bg-(--success-tint) text-(--success-text)",
        warning: "border-transparent bg-(--warning-tint) text-(--warning-text)",
        destructive:
          "border-transparent bg-(--destructive-tint) text-(--destructive-text)",
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

/** The alert's one-line headline, set on the icon's first line. */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn("mb-1 text-sm font-semibold leading-5", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/** The body text: secondary ink on neutral alerts, the tone's text on tints. */
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
