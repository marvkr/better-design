import * as React from "react"
import { cn } from "@/lib/utils"

import { BorderBeam } from "./border-beam"

/*
 * Beam Custom Card — surface wrapped with the rainbow border-beam.
 * The wrap is opt-in (default true) so non-featured cards stay quiet.
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  beam?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, beam = true, children, ...props }, ref) => {
    const card = (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-card text-card-foreground",
          "[box-shadow:var(--shadow-m)]",
          "transition-[background-color,box-shadow] duration-200",
          interactive && "cursor-pointer hover:bg-accent/40 hover:[box-shadow:var(--shadow-l)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (!beam) return card

    return (
      <BorderBeam size="md" variant="colorful" borderRadius={20} className="block">
        {card}
      </BorderBeam>
    )
  },
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-base font-semibold text-foreground leading-snug", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 pb-5", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 px-5 pb-5", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
