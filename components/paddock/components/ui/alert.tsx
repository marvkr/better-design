import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { cardSlab } from "./_shared";

/**
 * Paddock Alert: a white card holding a short message. The status
 * variants colour only the icon and give the card a pale tint of their hue,
 * so the message stays in dark slate and the card keeps its 1px border.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-xl p-4 text-sm",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 [&>svg~*]:pl-7 [&>svg+div]:-translate-y-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(cardSlab, "[&>svg]:text-muted-foreground"),
        info: "bg-info/8 text-foreground shadow-(--plate-ring) [&>svg]:text-info",
        success: "bg-success/8 text-foreground shadow-(--plate-ring) [&>svg]:text-success",
        warning: "bg-warning/14 text-foreground shadow-(--plate-ring) [&>svg]:text-warning-text",
        destructive: "bg-destructive/8 text-foreground shadow-(--plate-ring) [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for Alert, with its status variant. */
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

/** The alert's one-line heading. */
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

/** The alert's supporting text in muted slate. */
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
