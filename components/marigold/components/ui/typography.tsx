import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Typography: tight tracking, confident weights, quiet muted tones.

function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight text-foreground lg:text-5xl",
        className
      )}
      {...props}
    />
  );
}

function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b border-border/60 pb-2 text-3xl font-semibold tracking-tight text-foreground first:mt-0",
        className
      )}
      {...props}
    />
  );
}

function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7 text-foreground [&:not(:first-child)]:mt-4", className)} {...props} />
  );
}

function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xl text-muted-foreground", className)} {...props} />;
}

function Large({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

function Small({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <small className={cn("text-sm font-medium leading-none", className)} {...props} />;
}

function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function Blockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 border-primary/60 pl-6 italic text-muted-foreground", className)}
      {...props}
    />
  );
}

function Code({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded-md border border-border/70 bg-secondary px-[0.3rem] py-[0.2rem] font-mono text-sm text-secondary-foreground",
        className
      )}
      {...props}
    />
  );
}

const InlineCode = Code;

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {}

function Typography({ className, ...props }: TypographyProps) {
  return <div className={cn("max-w-prose space-y-4", className)} {...props} />;
}

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote, Code, InlineCode, Typography };
