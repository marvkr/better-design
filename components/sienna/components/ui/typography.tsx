import * as React from "react"

import { cn } from "@/lib/utils"

const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn("scroll-m-20 text-4xl font-medium leading-none tracking-[-0.025em] text-foreground", className)}
      {...props}
    />
  )
)
H1.displayName = "H1"

const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("scroll-m-20 text-2xl font-medium leading-8 tracking-[-0.0125em] text-foreground", className)}
      {...props}
    />
  )
)
H2.displayName = "H2"

const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("scroll-m-20 text-lg font-medium tracking-tight text-foreground", className)}
      {...props}
    />
  )
)
H3.displayName = "H3"

const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        "scroll-m-20 font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
H4.displayName = "H4"

const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm leading-6 text-foreground", className)} {...props} />
  )
)
P.displayName = "P"

const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("font-serif text-lg italic leading-7 text-foreground/80", className)}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-base font-semibold text-foreground", className)} {...props} />
  )
)
Large.displayName = "Large"

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
  )
)
Small.displayName = "Small"

const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
Muted.displayName = "Muted"

const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "border-y border-border py-4 font-serif italic text-foreground/80",
        className
      )}
      {...props}
    />
  )
)
Blockquote.displayName = "Blockquote"

const InlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "bg-muted rounded-lg px-1.5 py-0.5 font-mono text-xs text-foreground border border-border/50",
        className
      )}
      {...props}
    />
  )
)
InlineCode.displayName = "InlineCode"

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode }
