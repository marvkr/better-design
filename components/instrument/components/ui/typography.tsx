import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark Typography: dense data-UI type. Tight headings, relaxed body,
// mono code wells with the recessed treatment.

// --- Heading components ---

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 text-4xl font-semibold leading-[1.15] tracking-tight text-foreground",
      className
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
      "scroll-m-20 text-3xl font-semibold leading-[1.2] tracking-tight text-foreground",
      "mt-10 first:mt-0",
      className
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
      "scroll-m-20 text-2xl font-semibold leading-[1.25] tracking-tight text-foreground",
      className
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
      "scroll-m-20 text-xl font-semibold leading-[1.3] tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
H4.displayName = "H4";

// --- Body text ---

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm leading-relaxed text-foreground [&:not(:first-child)]:mt-4",
      className
    )}
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
    className={cn("text-base leading-relaxed text-muted-foreground", className)}
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
    className={cn("text-base font-medium text-foreground", className)}
    {...props}
  />
));
Large.displayName = "Large";

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn(
        "text-xs font-medium leading-none text-foreground",
        className
      )}
      {...props}
    />
  )
);
Small.displayName = "Small";

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
Muted.displayName = "Muted";

// --- Special elements ---

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "mt-6 border-l-2 border-[var(--gauge-line)] pl-6 text-sm italic leading-relaxed text-muted-foreground",
      className
    )}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";

const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "block w-full rounded-lg border border-[var(--gauge-well-border)] bg-input px-4 py-3",
        "font-mono text-sm leading-relaxed text-foreground",
        "shadow-[var(--shadow-well)]",
        "overflow-x-auto",
        className
      )}
      {...props}
    />
  )
);
Code.displayName = "Code";

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "relative rounded-md border border-[var(--gauge-well-border)] bg-input px-1.5 py-0.5",
      "font-mono text-xs font-medium text-primary",
      className
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

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
};

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
};
