import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Airy docs Typography: prose set for long reading. Inter throughout, with
 * headings at medium weight and tight tracking, body copy at 1rem on a
 * 1.75rem line, and Geist Mono for code inside a sentence. Headings keep a
 * scroll margin so an anchor link lands below a sticky docs header.
 */

/** Page title: 2.25rem medium, tight tracking. */
const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    data-slot="h1"
    className={cn(
      "scroll-mt-20 text-balance text-4xl font-medium leading-tight tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H1.displayName = "H1";

/** Section title: 1.5rem medium. */
const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="h2"
    className={cn(
      "scroll-mt-20 text-balance text-2xl font-medium leading-snug tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H2.displayName = "H2";

/** Subsection title: 1.25rem semibold. */
const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="h3"
    className={cn(
      "scroll-mt-20 text-balance text-xl font-semibold leading-snug tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
H3.displayName = "H3";

/** Minor title: 1rem semibold. */
const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="h4"
    className={cn(
      "scroll-mt-20 text-base font-semibold leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
H4.displayName = "H4";

/** Body paragraph: 1rem on a 1.75rem line, spaced from the one before. */
const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="p"
    className={cn(
      "text-base leading-7 text-(--foreground-secondary) not-first:mt-5",
      className,
    )}
    {...props}
  />
));
P.displayName = "P";

/** The page summary under a title: 1.125rem in muted ink. */
const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="lead"
    className={cn("text-lg leading-8 text-muted-foreground", className)}
    {...props}
  />
));
Lead.displayName = "Lead";

/** A line with weight that is not a heading. */
const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="large"
    className={cn("text-lg font-semibold leading-snug text-foreground", className)}
    {...props}
  />
));
Large.displayName = "Large";

/** Fine print: 0.8125rem medium. */
const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      data-slot="small"
      className={cn("text-[0.8125rem] font-medium leading-5", className)}
      {...props}
    />
  ),
);
Small.displayName = "Small";

/** A supporting line in muted ink. */
const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="muted"
    className={cn("text-sm leading-6 text-muted-foreground", className)}
    {...props}
  />
));
Muted.displayName = "Muted";

/** Code inside a sentence: Geist Mono on a faint grey chip. */
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
