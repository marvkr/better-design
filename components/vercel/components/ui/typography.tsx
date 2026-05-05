import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel Typography: light theme, precise sizing
// Uses Inter font family, tight leading for headings, relaxed for body

// --- Heading components ---

const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight text-foreground leading-[1.15]",
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
        "scroll-m-20 text-3xl font-semibold tracking-tight text-foreground leading-[1.2]",
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
        "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground leading-[1.25]",
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
        "scroll-m-20 text-xl font-semibold tracking-tight text-foreground leading-[1.3]",
        className
      )}
      {...props}
    />
  )
)
H4.displayName = "H4"

// --- Body text ---

const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-foreground leading-relaxed [&:not(:first-child)]:mt-4",
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
      className={cn("text-base text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-base font-medium text-foreground", className)}
      {...props}
    />
  )
)
Large.displayName = "Large"

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("text-xs font-medium text-foreground leading-none", className)}
      {...props}
    />
  )
)
Small.displayName = "Small"

const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
)
Muted.displayName = "Muted"

// --- Special elements ---

const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground text-sm leading-relaxed",
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
        "block w-full rounded-[10px] border border-border bg-secondary px-4 py-3",
        "font-mono text-sm text-foreground leading-relaxed",
        "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
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
        "relative rounded-md border border-border bg-secondary px-1.5 py-0.5",
        "font-mono text-xs font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
)
InlineCode.displayName = "InlineCode"

// Default export object for convenience
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
