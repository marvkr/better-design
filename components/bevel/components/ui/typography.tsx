import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel typography — the whole ramp in one file: a 26px greeting, 22px
 * titles, 19px section headings, 16px lead, 14.5px body and 12.5px labels.
 * Headings pull tracking in to -0.9px through -0.6px; body and labels push it
 * back out to +0.3px, which is what keeps small copy readable at this density.
 */

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-[1.625rem] leading-[1.875rem] font-semibold tracking-[-0.0563rem] text-foreground",
      className,
    )}
    {...props}
  />
))
H1.displayName = "H1"

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-[1.375rem] leading-7 font-semibold tracking-[-0.0438rem] text-foreground",
      className,
    )}
    {...props}
  />
))
H2.displayName = "H2"

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[1.1875rem] leading-6 font-semibold tracking-[-0.0375rem] text-foreground",
      className,
    )}
    {...props}
  />
))
H3.displayName = "H3"

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "text-[1rem] leading-[1.375rem] font-semibold tracking-[-0.025rem] text-foreground",
      className,
    )}
    {...props}
  />
))
H4.displayName = "H4"

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-foreground",
      className,
    )}
    {...props}
  />
))
P.displayName = "P"

const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[1rem] leading-[1.4375rem] tracking-[-0.0063rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
Lead.displayName = "Lead"

const Large = React.forwardRef<
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
Large.displayName = "Large"

const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn(
      "text-[0.7813rem] leading-4 font-medium tracking-[0.0188rem] text-foreground",
      className,
    )}
    {...props}
  />
))
Small.displayName = "Small"

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
Muted.displayName = "Muted"

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "rounded-[0.875rem] bg-[var(--inner)] px-4 py-3 text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-muted-foreground",
      "[box-shadow:var(--shadow-inset)]",
      className,
    )}
    {...props}
  />
))
Blockquote.displayName = "Blockquote"

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "rounded-[0.5rem] bg-[var(--inner)] px-1.5 py-0.5 font-mono text-[0.7813rem] text-[var(--strong)]",
      "[box-shadow:var(--shadow-ring)]",
      className,
    )}
    {...props}
  />
))
InlineCode.displayName = "InlineCode"

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode }
