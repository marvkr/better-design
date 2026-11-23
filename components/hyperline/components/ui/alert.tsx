import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Alert: card-grade surface with a tinted hairline per intent.

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 text-sm shadow-[var(--hl-shadow-sm)] [&>svg+div]:translate-y-[-0.1875rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "border-border/60 bg-card text-card-foreground [&>svg]:text-muted-foreground",
        info: "border-[color:oklch(0.79_0.125_200/0.4)] bg-[oklch(0.79_0.125_200/0.08)] text-foreground [&>svg]:text-primary",
        success:
          "border-[color:oklch(0.74_0.17_155/0.4)] bg-[oklch(0.74_0.17_155/0.08)] text-foreground [&>svg]:text-[color:var(--hl-success)]",
        warning:
          "border-[color:oklch(0.82_0.12_85/0.4)] bg-[color:var(--hl-gold-soft)] text-foreground [&>svg]:text-[color:var(--hl-gold)]",
        destructive:
          "border-[color:oklch(0.6_0.21_22/0.4)] bg-[oklch(0.6_0.21_22/0.08)] text-foreground [&>svg]:text-destructive",
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
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
);
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
