import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Cream editorial Typography: a book page. The first three headings are the
 * serif at book weight, never bold, set a little tight and balanced across
 * their lines. Smaller headings, labels and body copy are the clean sans.
 * Body copy runs at 1rem with open leading; secondary and muted lines step
 * down in ink, not only in size.
 */

/** Page title: the serif at 2.75rem, medium weight. */
const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    data-slot="h1"
    className={cn(
      "scroll-mt-16 text-balance font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H1.displayName = "H1";

/** Section title: the serif at 2rem, medium weight. */
const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="h2"
    className={cn(
      "scroll-mt-16 text-balance font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H2.displayName = "H2";

/** Group title: the serif at 1.5rem, medium weight. */
const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="h3"
    className={cn(
      "scroll-mt-16 text-balance font-serif text-2xl font-medium leading-snug tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H3.displayName = "H3";

/** Small title: the sans at 1.125rem, medium weight. */
const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="h4"
    className={cn(
      "scroll-mt-16 text-balance text-lg font-medium leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
H4.displayName = "H4";

/** Body paragraph: 1rem with open leading, spaced from the one before. */
const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="p"
    className={cn(
      "text-base leading-relaxed text-foreground not-first:mt-4",
      className,
    )}
    {...props}
  />
));
P.displayName = "P";

/** The opening line under a title: 1.25rem in the secondary ink. */
const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="lead"
    className={cn(
      "text-xl leading-relaxed text-(--foreground-secondary)",
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
    className={cn("text-lg font-medium leading-snug", className)}
    {...props}
  />
));
Large.displayName = "Large";

/** Fine print and labels: 0.75rem medium. */
const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      data-slot="small"
      className={cn("text-xs font-medium leading-4", className)}
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

/** Code inside a sentence: mono on a soft oat chip. */
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
