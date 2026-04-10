import * as React from "react"

import { cn } from "@/lib/utils"

// Linear Quality Card — two variants from linear.app/quality
//
// 1. Panel Card (bg-card, border, precise multi-layer shadow) — dashboard/settings use
// 2. Poster Card (transparent, no border) — media/episode listing (the primary card on /quality)
//    Structure: full-width aspect-video image → hgroup(label + large h2 title)

// ── Panel Card (general use) ──────────────────────────────────────────────────

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-border bg-card text-card-foreground",
      "shadow-[0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.03)]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// ── Poster Media Card (linear.app/quality style) ──────────────────────────────
// Transparent container — media sits full-bleed at top, hgroup below

const CardPoster = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group cursor-pointer transition-opacity duration-200",
      "hover:opacity-90",
      className
    )}
    {...props}
  />
))
CardPoster.displayName = "CardPoster"

// Full-width 16:9 image container — no margin, fills card width
const CardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative aspect-video w-full overflow-hidden rounded-sm bg-muted",
      "mb-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
CardMedia.displayName = "CardMedia"

// Small muted label above the title (e.g. "Episode 01", "Introduction")
const CardLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground mb-0.5", className)}
    {...props}
  />
))
CardLabel.displayName = "CardLabel"

// ── Standard subcomponents (panel card) ──────────────────────────────────────

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
      "text-lg font-semibold leading-tight tracking-tight text-foreground",
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

export {
  Card, CardPoster, CardMedia, CardLabel,
  CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
}
