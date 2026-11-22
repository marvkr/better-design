import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Bold retail Typography: the heavy condensed display face for the two big
 * headline levels, set tight and large like a campaign banner, and Inter for
 * everything below them. Body copy sits at 1rem with open leading, and
 * secondary lines step down to the muted grey.
 */

/** Campaign headline: the display face at 3rem, 3.75rem on wide screens. */
const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    data-slot="h1"
    className={cn(
      "scroll-mt-16 text-balance font-display text-5xl font-normal leading-none text-foreground md:text-6xl",
      className,
    )}
    {...props}
  />
));
H1.displayName = "H1";

/** Section headline: the display face at 2.25rem. */
const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="h2"
    className={cn(
      "scroll-mt-16 text-balance font-display text-4xl font-normal leading-none text-foreground",
      className,
    )}
    {...props}
  />
));
H2.displayName = "H2";

/** Group title: Inter at 1.5rem, medium. */
const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="h3"
    className={cn(
      "scroll-mt-16 text-balance text-2xl font-medium leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
H3.displayName = "H3";

/** Small title: Inter at 1rem, medium, the product name size. */
const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="h4"
    className={cn(
      "scroll-mt-16 text-balance text-base font-medium leading-snug text-foreground",
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

/** The opening line under a headline: 1.125rem in the muted grey. */
const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="lead"
    className={cn("text-lg leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
Lead.displayName = "Lead";

/** A line that needs weight without being a heading, such as a price. */
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

/** A supporting line in the muted grey, such as a colourway count. */
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

/** Code inside a sentence: mono on a small soft grey chip. */
const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    data-slot="inline-code"
    className={cn(
      "rounded-sm bg-(--code-inline) px-1.5 py-0.5 font-mono text-sm text-foreground",
      className,
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode };
