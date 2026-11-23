"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

// Gauge Dark Checkbox.
// Unchecked: a tiny recessed well (same material as inputs).
// Checked: the machined gold button material scaled down: gradient fill,
// gold rim, top bevel + warm glow (--shadow-primary). One material system.

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-[var(--gauge-well-border)]",
      "bg-input shadow-[var(--shadow-well)]",
      "transition-all duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-[var(--gauge-rim)] data-[state=indeterminate]:border-[var(--gauge-rim)]",
      "data-[state=checked]:bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] data-[state=indeterminate]:bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))]",
      "data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      "data-[state=checked]:shadow-[var(--shadow-primary)] data-[state=indeterminate]:shadow-[var(--shadow-primary)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="h-3 w-3 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="h-3 w-3 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

// "carbon:checkmark" and "carbon:subtract" from Carbon Icons,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime.
// One unit of stroke keeps the thin Carbon tick readable at 12px. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/>
    </svg>
  );
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M8 15h16v2H8z"/>
    </svg>
  );
}
