import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Typography: terminal-flavored type scale.
// Headings are tight, bold and tracked like console captions; InlineCode
// sits in a recessed chip.

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      className
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
      "scroll-m-20 text-3xl font-semibold tracking-tight",
      className
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
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
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
      "scroll-m-20 text-xl font-semibold uppercase tracking-wide",
      className
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
    className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
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
    className={cn("text-xl text-muted-foreground", className)}
    {...props}
  />
))
Lead.displayName = "Lead"

const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
Large.displayName = "Large"

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
)
Small.displayName = "Small"

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
Muted.displayName = "Muted"

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "relative rounded-xs px-[0.3rem] py-[0.2rem] text-sm font-semibold",
      "bg-secondary border border-border text-primary",
      className
    )}
    {...props}
  />
))
InlineCode.displayName = "InlineCode"

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode }
