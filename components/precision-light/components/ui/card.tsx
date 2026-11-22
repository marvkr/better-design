import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Sharp Light card: browser-extracted white surface button shadow pattern
      // Doubling radii (1→3→6→12→24→48px) at 4% opacity + 10% 1px outer ring + inset bottom highlight
      "rounded-[0.625rem] bg-card text-card-foreground shadow-[0_0.0625rem_0.0625rem_0.0313rem_oklch(0.3211_0_0/0.04),0_0.1875rem_0.1875rem_-0.0938rem_oklch(0.3211_0_0/0.02),0_0.375rem_0.375rem_-0.1875rem_oklch(0.3211_0_0/0.04),0_0.75rem_0.75rem_-0.375rem_oklch(0.3211_0_0/0.04),0_1.5rem_1.5rem_-0.75rem_oklch(0.3211_0_0/0.04),0_3rem_3rem_-1.5rem_oklch(0.3211_0_0/0.04),0_0_0_0.0625rem_oklch(0.3211_0_0/0.1),inset_0_-0.0625rem_0.0625rem_-0.0313rem_oklch(0.3211_0_0/0.06)]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
