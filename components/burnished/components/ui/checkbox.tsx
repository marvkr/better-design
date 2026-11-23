"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { copperRim, focusRing, wellInset } from "./_shared";

/**
 * Burnished Checkbox: an empty box is a small well pressed into the page.
 * Checked, a cream bevel face inside a copper rim fills it, the same
 * material as the primary Button, so a ticked box and the button read as one.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer relative size-5 shrink-0 rounded-[0.4375rem] border-2 border-transparent",
      wellInset,
      "transition-[box-shadow,border-color] duration-fast ease-(--ease-out)",
      "[@media(hover:hover)_and_(pointer:fine)]:hover:border-input",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={cn(
        "absolute -inset-0.5 flex items-center justify-center rounded-[inherit] text-primary-foreground shadow-(--bevel-primary)",
        copperRim,
      )}
    >
      <CheckIcon className="size-3 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="size-3 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

// "ph:check-bold" and "ph:minus-bold" from Phosphor,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"/>
    </svg>
  );
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"/>
    </svg>
  );
}
