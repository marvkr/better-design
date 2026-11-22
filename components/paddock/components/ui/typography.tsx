import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock Typography: Figtree in cool slate. Headings are semibold and
 * pulled tight; body text sits at the compact product
 * size, and inline code is a flat grey chip in the mono face.
 */
const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-semibold leading-tight tracking-tight text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
H1.displayName = "H1";

/** A section heading. */
const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-semibold leading-tight tracking-tight text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
H2.displayName = "H2";

/** A subsection heading. */
const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("scroll-m-20 text-lg font-semibold leading-snug text-foreground", className)}
      {...props}
    />
  ),
);
H3.displayName = "H3";

/** A small heading, the size of a card title. */
const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn("scroll-m-20 text-[0.9375rem] font-semibold text-foreground", className)}
      {...props}
    />
  ),
);
H4.displayName = "H4";

/** A body paragraph. */
const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-[0.9375rem] leading-relaxed text-foreground not-first:mt-4", className)}
      {...props}
    />
  ),
);
P.displayName = "P";

/** An opening paragraph, a step larger and muted. */
const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-lg leading-relaxed text-muted-foreground", className)} {...props} />
  ),
);
Lead.displayName = "Lead";

/** Larger emphasised text. */
const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  ),
);
Large.displayName = "Large";

/** Small print, like a card's date line. */
const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("text-xs font-medium leading-none text-muted-foreground", className)}
      {...props}
    />
  ),
);
Small.displayName = "Small";

/** Muted note text. */
const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[0.8125rem] text-muted-foreground", className)} {...props} />
  ),
);
Muted.displayName = "Muted";

/** A quotation set off by a 1px rule. */
const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn("border-l-2 border-border pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  ),
);
Blockquote.displayName = "Blockquote";

/** Inline code on a flat grey chip. */
const InlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "rounded-xs bg-secondary px-1.5 py-0.5 font-mono text-[0.8125rem] text-secondary-foreground",
        className,
      )}
      {...props}
    />
  ),
);
InlineCode.displayName = "InlineCode";

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode };
