import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { surfacePlate } from "./_shared";

/**
 * Burnished Alert: an umber plate set flat into the page. The status
 * variants tint a hairline inside the rim and colour the icon, so the plate
 * keeps its bevel and the message stays readable on the dark ground.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-xl p-4 text-sm",
    surfacePlate,
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 [&>svg~*]:pl-7 [&>svg+div]:-translate-y-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "[&>svg]:text-muted-foreground",
        info: "inset-ring-1 inset-ring-info/25 [&>svg]:text-info",
        success: "inset-ring-1 inset-ring-success/25 [&>svg]:text-success",
        warning: "inset-ring-1 inset-ring-warning/25 [&>svg]:text-warning",
        destructive: "inset-ring-1 inset-ring-destructive/30 [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

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

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn("mb-1 font-semibold leading-snug text-foreground", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

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
