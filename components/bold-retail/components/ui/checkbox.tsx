"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing } from "./_shared";

/**
 * Bold retail Checkbox: a 1.25rem box with a small corner and a grey edge.
 * Checked or mixed, it turns flat black like the primary pill, with a white
 * mark inside. It never casts a shadow.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-5 shrink-0 items-center justify-center rounded-[0.25rem] border border-(--control) bg-background text-primary-foreground",
      "transition-[background-color,border-color] duration-fast ease-out",
      "hover:border-foreground",
      focusRing,
      "disabled:cursor-not-allowed disabled:border-(--line-strong) disabled:bg-secondary disabled:text-(--foreground-disabled)",
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
      <CheckIcon aria-hidden="true" className="size-3.5 in-data-[state=indeterminate]:hidden" />
      <MinusIcon aria-hidden="true" className="size-3.5 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

// "mingcute:check-line" and "mingcute:minimize-line" from MingCute,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.171 16.072L19.778 5.465c.409-.359 1.01-.404 1.414 0c.404.405.359 1.005 0 1.415L9.878 18.193c-.204.179-.429.293-.707.293s-.503-.114-.707-.293l-5.657-5.657c-.297-.339-.393-.8-.159-1.207c.34-.588 1.092-.629 1.574-.207Z"/>
    </svg>
  );
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M4.741 12.966C3.643 12.672 3.796 11.079 5 11h14c.543.036 1 .428 1 1s-.457.964-1 1H5Z"/>
    </svg>
  );
}
