import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playful console Typography: Figtree on a friendly engineering-blog scale.
 * Headings run heavy (800 for page and section titles, 700 below) with a
 * tight track and balanced lines; body copy sits at 0.9375rem in the
 * secondary ink with open leading. Secondary lines step down in ink, and
 * inline code sits on a small cream chip in Source Code Pro.
 */

/** Page title: 2.25rem extra bold. */
const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    data-slot="h1"
    className={cn(
      "scroll-mt-16 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H1.displayName = "H1";

/** Section title: 1.5rem extra bold. */
const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="h2"
    className={cn(
      "scroll-mt-16 text-balance text-2xl font-extrabold leading-snug tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H2.displayName = "H2";

/** Group title: 1.25rem bold. */
const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="h3"
    className={cn(
      "scroll-mt-16 text-balance text-xl font-bold leading-snug tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H3.displayName = "H3";

/** Small title: 1.125rem bold. */
const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="h4"
    className={cn(
      "scroll-mt-16 text-balance text-lg font-bold leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
H4.displayName = "H4";

/** Body paragraph: 0.9375rem in the secondary ink, spaced from the one before. */
const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="p"
    className={cn(
      "text-[0.9375rem] leading-relaxed text-(--foreground-secondary) not-first:mt-4",
      className,
    )}
    {...props}
  />
));
P.displayName = "P";

/** The opening line under a title: 1.125rem medium in the secondary ink. */
const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="lead"
    className={cn(
      "text-lg font-medium leading-relaxed text-(--foreground-secondary)",
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
    className={cn("text-base font-bold leading-snug text-foreground", className)}
    {...props}
  />
));
Large.displayName = "Large";

/** Fine print and labels: 0.75rem semibold. */
const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      data-slot="small"
      className={cn("text-xs font-semibold leading-4", className)}
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

/** Code inside a sentence: mono on a small cream chip. */
const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    data-slot="inline-code"
    className={cn(
      "rounded-sm bg-(--code-inline) px-1.5 py-0.5 font-mono text-[0.8125rem] font-medium text-foreground",
      className,
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode };
