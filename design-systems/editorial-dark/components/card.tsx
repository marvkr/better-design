import * as React from "react"

import { cn } from "@/lib/utils"

// Library of Minds Card — glassmorphism media card
// Source: libraryofminds.com
// bg-amber-50/12 backdrop-blur-[20px] rounded-[28px]
// Inset highlight shadow: top white glow + bottom subtle shadow
// Media inset: m-2 mb-0 rounded-[20px] aspect-video
// Hover: scale-[1.01] + bg-amber-50/18

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "cursor-default bg-amber-50/[0.12] backdrop-blur-[20px]",
      "rounded-[28px] overflow-hidden",
      "transition-all duration-200",
      "shadow-[0_1px_0.908px_0_rgba(255,255,255,0.15)_inset,0_-1px_0.908px_0_rgba(255,255,255,0.05)_inset]",
      "hover:scale-[1.01] hover:bg-amber-50/[0.18]",
      "text-card-foreground",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// Inset media container — the video/image area sits inside with its own margin + radius
const CardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative aspect-video bg-black m-2 mb-0 rounded-[20px] overflow-hidden",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
CardMedia.displayName = "CardMedia"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 pb-0", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// Uses Forum/serif for the editorial heading feel
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-serif text-2xl leading-tight tracking-normal text-foreground",
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
    className={cn("text-sm text-foreground/80 line-clamp-3", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 pt-2.5", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-3 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardMedia, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
