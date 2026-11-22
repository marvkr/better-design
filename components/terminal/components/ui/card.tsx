import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * Terminal Card — a lit panel routed onto the CRT screen.
 *   - Brighter blue than the canvas (a panel closer to the front of the tube).
 *   - Hairline cyan rim + faint inner-top highlight via --shadow-s.
 *   - Sharp 2px corners; interactive panels lift with a soft cyan bloom.
 *   - The title reads like a screen header: mono, uppercase, tracked, phosphor glow.
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-sm bg-card text-card-foreground",
        "[box-shadow:var(--shadow-s)]",
        "transition-[background-color,box-shadow] duration-base",
        interactive &&
          "cursor-pointer hover:bg-accent/40 hover:[box-shadow:var(--shadow-m)]",
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
    <div
      ref={ref}
      className={cn(
        "font-mono text-sm font-semibold uppercase tracking-[0.08em] text-foreground leading-snug",
        "[text-shadow:var(--text-glow)]",
        className
      )}
      {...props}
    />
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
