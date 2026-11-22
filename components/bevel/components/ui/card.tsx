import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Card.
 *
 * The card has no border. An inset highlight along the top edge, a 1px ring
 * and a soft drop shadow do the separating, which is what keeps a screen of
 * stacked cards quiet. Padding is 18px, inside the spec's 16-22px band.
 */

/** Props for `Card`; `interactive` adds the lift a tappable card needs. */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[1.25rem] bg-card text-card-foreground",
        "[box-shadow:var(--shadow-card)]",
        "transition-[box-shadow,transform] duration-base ease-out",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-card-hover)]",
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-[1.125rem]", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[1.1875rem] leading-6 font-semibold tracking-[-0.0375rem] text-foreground",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-[1.125rem] pb-[1.125rem]", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2.5 px-[1.125rem] pb-[1.125rem]", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
