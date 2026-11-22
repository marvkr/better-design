import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Bold retail Alert: a square notice box edged by the hairline on all four
 * sides. The default is white with ink text. Info, success, warning and
 * destructive each fill with a light tint and set their text in the matching
 * darker tone, so the message reads on its own colour. Red stays reserved for
 * errors.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-none border border-border px-4 py-3 text-sm",
    "[&>svg]:absolute [&>svg]:start-4 [&>svg]:top-3.5 [&>svg]:size-5",
    "[&>svg~*]:ps-8",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground [&>svg]:text-foreground [&_[data-slot=alert-description]]:text-muted-foreground",
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

/** The headline, in medium weight on the icon's first line. */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn("mb-0.5 text-sm font-medium leading-6", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/** The body text: muted on the white notice, the tone's text on a tint. */
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
