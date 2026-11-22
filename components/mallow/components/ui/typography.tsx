import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Mallow Typography: Manrope in plum ink on the pale lilac page. Headings run
 * at medium weight with the tracking pulled in, body text stays at a
 * comfortable measure, and inline code sits on a lilac chip.
 */
const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-medium leading-tight tracking-tight text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
H1.displayName = "H1";

const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-medium leading-tight tracking-tight text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
H2.displayName = "H2";

const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("scroll-m-20 text-lg font-medium leading-snug text-foreground", className)}
      {...props}
    />
  ),
);
H3.displayName = "H3";

const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn("scroll-m-20 text-base font-medium leading-snug text-foreground", className)}
      {...props}
    />
  ),
);
H4.displayName = "H4";

const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-base leading-relaxed text-foreground not-first:mt-4", className)}
      {...props}
    />
  ),
);
P.displayName = "P";

const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-lg leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  ),
);
Lead.displayName = "Lead";

const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-medium text-foreground", className)} {...props} />
  ),
);
Large.displayName = "Large";

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

const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
Muted.displayName = "Muted";

const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "border-s-2 border-input ps-5 text-lg leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Blockquote.displayName = "Blockquote";

const InlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "rounded-sm bg-(--option-track) px-1.5 py-0.5 font-mono text-sm text-foreground shadow-(--option-track-edge)",
        className,
      )}
      {...props}
    />
  ),
);
InlineCode.displayName = "InlineCode";

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode };
