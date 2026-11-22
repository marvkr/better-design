import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Ink mail Typography: two voices. Page and section titles, and the lead
 * line under them, set in the editorial serif at regular weight, solid and
 * slightly tightened. Everything below runs in Inter: medium-weight group
 * titles, body copy at 0.875rem with open leading. Secondary and muted lines
 * step down in ink, never in size alone.
 */

/** Page title: the serif display face at 3rem, set solid. */
const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    data-slot="h1"
    className={cn(
      "scroll-mt-16 text-balance font-serif text-5xl font-normal leading-none tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H1.displayName = "H1";

/** Section title: the serif display face at 2.25rem, set solid. */
const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="h2"
    className={cn(
      "scroll-mt-16 text-balance font-serif text-4xl font-normal leading-none tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H2.displayName = "H2";

/** Group title: Inter 1.25rem medium. */
const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="h3"
    className={cn(
      "scroll-mt-16 text-balance font-sans text-xl font-medium leading-snug tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H3.displayName = "H3";

/** Small title: Inter 1rem medium. */
const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="h4"
    className={cn(
      "scroll-mt-16 text-balance font-sans text-base font-medium leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
H4.displayName = "H4";

/** Body paragraph: 0.875rem in the secondary ink, spaced from the one before. */
const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="p"
    className={cn(
      "text-sm leading-relaxed text-(--foreground-secondary) not-first:mt-4",
      className,
    )}
    {...props}
  />
));
P.displayName = "P";

/** The opening line under a title: the serif display face at 1.5rem. */
const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="lead"
    className={cn(
      "font-serif text-2xl font-normal leading-tight tracking-tight text-(--foreground-secondary)",
      className,
    )}
    {...props}
  />
));
Lead.displayName = "Lead";

/** A line that needs weight without being a heading. */
const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="large"
    className={cn("text-base font-medium leading-snug text-foreground", className)}
    {...props}
  />
));
Large.displayName = "Large";

/** Fine print and labels: 0.75rem medium in the muted ink. */
const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      data-slot="small"
      className={cn("text-xs font-medium leading-4 text-muted-foreground", className)}
      {...props}
    />
  ),
);
Small.displayName = "Small";

/** A supporting line in the muted ink. */
const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="muted"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
Muted.displayName = "Muted";

/** Code inside a sentence: mono on a faint white chip. */
const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    data-slot="inline-code"
    className={cn(
      "rounded-sm bg-(--code-inline) px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground",
      className,
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode };
