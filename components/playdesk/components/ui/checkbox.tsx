"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

/*
 * Playdesk Checkbox — unchecked it is a recessed well; checked it becomes the
 * same moulded blue pill as the primary Button, scaled down to 18px.
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "size-[1.125rem] shrink-0 rounded-md",
      "border border-border bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "transition-[box-shadow,background-color,border-color] duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // background-origin defaults to the padding box, so with a transparent
      // border the gradient tile repeats and its darkest end shows as a hairline
      // along the top edge. Painting from the border box removes it.
      "data-[state=checked]:border-transparent data-[state=checked]:[background-origin:border-box]",
      "data-[state=checked]:[background-image:var(--fill-primary)]",
      "data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:[background-origin:border-box]",
      "data-[state=indeterminate]:[background-image:var(--fill-primary)]",
      "data-[state=indeterminate]:[box-shadow:var(--shadow-primary)]",
      className,
    )}
    {...props}
  >
    {/* The glyph follows data-state rather than the checked prop, so an
        uncontrolled defaultChecked="indeterminate" still shows the dash. */}
    <CheckboxPrimitive.Indicator className="group flex items-center justify-center text-primary-foreground">
      <MinusIcon
        className="hidden size-3 group-data-[state=indeterminate]:block"
      />
      <CheckIcon
        className="size-3 group-data-[state=indeterminate]:hidden"
      />
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
