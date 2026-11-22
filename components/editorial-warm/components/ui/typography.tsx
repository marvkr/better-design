import * as React from "react"
import { cn } from "@/lib/utils"

// Editorial Warm Typography
// Headings: Fraunces serif (publication voice).
// Body: Inter sans.
// Mono reserved for Code / InlineCode and labels/data.

const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "font-serif scroll-m-20 text-5xl font-medium tracking-[-0.018em] text-foreground leading-[1.05]",
        className
      )}
      {...props}
    />
  )
)
H1.displayName = "H1"

const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "font-serif scroll-m-20 text-3xl font-medium tracking-[-0.014em] text-foreground leading-[1.15]",
        "first:mt-0 mt-10",
        className
      )}
      {...props}
    />
  )
)
H2.displayName = "H2"

const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "font-serif scroll-m-20 text-2xl font-medium tracking-[-0.012em] text-foreground leading-[1.2]",
        className
      )}
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
        "font-serif scroll-m-20 text-xl font-medium tracking-[-0.008em] text-foreground leading-[1.3]",
        className
      )}
      {...props}
    />
  )
)
H4.displayName = "H4"

const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "font-sans text-[0.9375rem] text-foreground leading-relaxed [&:not(:first-child)]:mt-4",
        className
      )}
      {...props}
    />
  )
)
P.displayName = "P"

const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("font-serif text-lg text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-sans text-base font-medium text-foreground", className)}
      {...props}
    />
  )
)
Large.displayName = "Large"

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground leading-none", className)}
      {...props}
    />
  )
)
Small.displayName = "Small"

const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("font-sans text-sm text-muted-foreground/80 leading-relaxed", className)}
      {...props}
    />
  )
)
Muted.displayName = "Muted"

const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "mt-6 border-l-2 border-primary/60 pl-6",
        "font-serif italic text-base text-foreground/80 leading-relaxed",
        className
      )}
      {...props}
    />
  )
)
Blockquote.displayName = "Blockquote"

const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "block w-full rounded-lg border border-border bg-muted px-4 py-3",
        "font-mono text-[0.8125rem] text-foreground/85 leading-relaxed",
        "overflow-x-auto",
        className
      )}
      {...props}
    />
  )
)
Code.displayName = "Code"

const InlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "relative rounded-md border border-border bg-muted px-1.5 py-0.5",
        "font-mono text-[0.75rem] text-foreground/85",
        className
      )}
      {...props}
    />
  )
)
InlineCode.displayName = "InlineCode"

const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  Code,
  InlineCode,
}

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  Code,
  InlineCode,
  Typography,
}
