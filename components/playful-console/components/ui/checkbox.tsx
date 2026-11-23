"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { controlChecked, controlUnchecked } from "./_shared";

/**
 * Playful console Checkbox: a small white key with a firm olive edge and a
 * thin slab under it. Checked, it becomes the orange key in miniature, with
 * the darker rim and slab of the primary button, and a bold ink tick.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-[1.125rem] shrink-0 items-center justify-center rounded-md text-primary-foreground",
      controlUnchecked,
      "transition-[background-color,border-color,box-shadow] duration-fast ease-out",
      "hover:border-(--control)",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:shadow-none",
      controlChecked,
      "data-[state=indeterminate]:border-(--primary-rim) data-[state=indeterminate]:bg-primary data-[state=indeterminate]:shadow-(--shadow-control)",
      "disabled:data-[state=indeterminate]:border-(--line-strong) disabled:data-[state=indeterminate]:bg-secondary disabled:data-[state=indeterminate]:shadow-none",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      <CheckIcon aria-hidden="true" className="size-3 in-data-[state=indeterminate]:hidden" />
      <MinusIcon aria-hidden="true" className="size-3 hidden in-data-[state=indeterminate]:block" />
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
