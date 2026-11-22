import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior typography — headings are medium with negative tracking, never
 * bold: the size carries the hierarchy, the tracking keeps a big heading from
 * spreading. Body runs at 13.5px with relaxed leading. Inline code and
 * blockquotes are small wells, not decorated boxes.
 */

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-4xl font-medium leading-tight tracking-[-0.03em] text-foreground",
      className,
    )}
    {...props}
  />
));
H1.displayName = "H1";

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-2xl font-medium leading-tight tracking-[-0.03em] text-foreground",
      className,
    )}
    {...props}
  />
));
H2.displayName = "H2";

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-medium leading-snug tracking-[-0.025em] text-foreground",
      className,
    )}
    {...props}
  />
));
H3.displayName = "H3";

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "text-[0.9375rem] font-medium leading-snug tracking-[-0.02em] text-foreground",
      className,
    )}
    {...props}
  />
));
H4.displayName = "H4";

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[0.8438rem] leading-relaxed text-foreground", className)}
    {...props}
  />
));
P.displayName = "P";

const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.9375rem] leading-relaxed text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Lead.displayName = "Lead";

const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[0.9375rem] font-medium tracking-[-0.02em] text-foreground",
      className,
    )}
    {...props}
  />
));
Large.displayName = "Large";

const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn(
      "text-[0.7813rem] font-medium leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
Small.displayName = "Small";

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[0.7813rem] text-muted-foreground", className)}
    {...props}
  />
));
Muted.displayName = "Muted";

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "rounded-[0.6875rem] bg-secondary px-4 py-3 shadow-[var(--shadow-well)]",
      "text-[0.8438rem] italic leading-relaxed text-foreground",
      className,
    )}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "rounded-[0.3125rem] bg-secondary px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",
      className,
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, InlineCode };
