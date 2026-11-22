import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Typography: bold sans hierarchy with tight tracking.

const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-[-0.03em] lg:text-5xl",
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
        "scroll-m-20 text-3xl font-bold tracking-[-0.02em] first:mt-0",
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
      className={cn("scroll-m-20 text-2xl font-bold tracking-[-0.02em]", className)}
      {...props}
    />
  )
)
H3.displayName = "H3"

const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn("scroll-m-20 text-xl font-bold tracking-[-0.01em]", className)}
      {...props}
    />
  )
)
H4.displayName = "H4"

const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}
      {...props}
    />
  )
)
P.displayName = "P"

const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-lg font-bold tracking-[-0.01em]", className)}
      {...props}
    />
  )
)
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

const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
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
        "mt-4 border-l-2 border-[color:oklch(0.69_0.195_42/0.5)] pl-4 italic text-muted-foreground",
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
        "relative rounded-md px-[0.4rem] py-[0.2rem] font-mono text-sm",
        "bg-[var(--ag-well)] border border-[color:var(--ag-border)] text-primary",
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
        "relative rounded-md px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold",
        "bg-[var(--ag-fill)] border border-[color:var(--ag-border)]",
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
