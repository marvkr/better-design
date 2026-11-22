import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Playful console Alert: a callout edged on all four sides, never a stripe
 * down one. The default is a white card behind the hairline. Info is a pale
 * blue panel, success green, warning orange and destructive red; each tint
 * carries its own darker text and a matching edge, like the tip boxes in a
 * friendly engineering handbook.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm",
    "[&>svg]:absolute [&>svg]:start-4 [&>svg]:top-3.5 [&>svg]:size-5",
    "[&>svg~*]:ps-8",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-border bg-card text-foreground [&>svg]:text-foreground [&_[data-slot=alert-description]]:text-(--foreground-secondary)",
        info:
          "border-(--info)/40 bg-(--info-tint) text-(--info-text) [&>svg]:text-(--info)",
        success:
          "border-(--success)/40 bg-(--success-tint) text-(--success-text) [&>svg]:text-(--success)",
        warning:
          "border-(--primary-rim)/50 bg-(--warning-tint) text-(--warning-text) [&>svg]:text-(--primary-text)",
        destructive:
          "border-(--destructive)/40 bg-(--destructive-tint) text-(--destructive-text) [&>svg]:text-(--destructive)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** A callout that announces itself to assistive technology. */
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

/** The alert's bold one-line headline, set on the icon's first line. */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn("mb-0.5 text-sm font-bold leading-5", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/** The body text: secondary ink on the default alert, the tone's text on tints. */
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
