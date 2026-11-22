import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Margin Alert: a white sheet bounded by one hairline. The status variants
 * wash the sheet in a faint tint of their hue and colour the icon, so the
 * message reads at a glance without shouting.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-xl border p-3.5 text-sm",
    "[&>svg]:absolute [&>svg]:left-3.5 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg~*]:pl-6.5 [&>svg+div]:-translate-y-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground [&>svg]:text-muted-foreground",
        info: "border-info/20 bg-info/6 text-foreground [&>svg]:text-info",
        success: "border-success/20 bg-success/6 text-foreground [&>svg]:text-success",
        warning: "border-warning/25 bg-warning/8 text-foreground [&>svg]:text-warning",
        destructive: "border-destructive/20 bg-destructive/6 text-foreground [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for Alert: the HTML div props plus the status variant. */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/** A short inline message with an optional leading icon. */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

/** The alert's one-line heading. */
const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn("mb-0.5 font-medium leading-snug text-foreground", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

/** The grey body text under the alert's heading. */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn("text-sm leading-relaxed text-muted-foreground [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
