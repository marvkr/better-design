"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { controlChecked } from "./_shared";

/**
 * Ink mail Checkbox: a 1rem box with a 0.375rem corner, a grey control edge
 * and a transparent face on the black page. Checked, it takes the flat
 * off-white fill of the primary button with a black tick.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-(--control) bg-transparent text-primary-foreground",
      "transition-[background-color,border-color] duration-fast ease-out",
      "hover:border-muted-foreground",
      "outline-none focus-visible:ring-3 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:border-(--line-strong) disabled:bg-muted disabled:text-(--foreground-disabled)",
      controlChecked,
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      "disabled:data-[state=indeterminate]:border-(--line-strong) disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:text-(--foreground-disabled)",
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

// "ph:check" and "ph:minus" from Phosphor,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m229.66 77.66l-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69L218.34 66.34a8 8 0 0 1 11.32 11.32"/>
    </svg>
  );
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8"/>
    </svg>
  );
}
