import * as React from "react"
import { cn } from "@/lib/utils"
import { emeraldSurfaceStyle } from "./_shared"

/*
 * Emerald Analytics Card — the dashboard data panel.
 * Carries the faint top-down sheen (emeraldSurfaceStyle) under a quiet ambient
 * shadow, so a card reads as one flat charcoal-green panel lifted off the canvas.
 * Interactive cards lift higher on hover.
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ ...emeraldSurfaceStyle, ...style }}
      className={cn(
        "rounded-xl bg-card text-card-foreground",
        "[box-shadow:var(--shadow-s)]",
        "transition-[box-shadow,transform] duration-base",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-l)]",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-base font-semibold text-foreground leading-snug", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 pb-5", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 px-5 pb-5", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
