import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Playful console Card: a white card on the cream page.
 *
 * The default card is white behind the thin olive hairline at the 0.375rem
 * card corner, with no shadow, so cards stack flat like index cards on a
 * desk. An outline card stays on the page colour, a raised card takes a
 * retro hard offset shadow for the one panel that should pop, and the
 * highlight card carries the one number a screen is about in the orange.
 */
const cardVariants = cva(
  "flex flex-col rounded-lg border text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        outline: "border-(--line-strong) bg-background",
        raised: "border-(--ink) bg-card shadow-(--shadow-offset)",
        highlight:
          "border-(--primary-rim) bg-primary text-primary-foreground " +
          "[&_[data-slot=card-description]]:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for Card: any div attribute plus the surface variant. */
export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/** The top block of a card: title and description, stacked. */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn("flex flex-col gap-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/** The card's bold title. */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="card-title"
    className={cn("text-lg font-bold leading-snug tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/** The supporting line under the title, in the muted ink. */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="card-description"
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/** The card body, aligned with the header padding. */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/** A row of actions at the bottom of the card. */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-footer"
    className={cn("flex items-center gap-3 p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
