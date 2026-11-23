"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing } from "./_shared";

/**
 * Mallow Checkbox: empty, a firm plum outline on the surface. Checked, it
 * takes the primary Button's finish, solid violet with a faint bottom shade,
 * and a white check, so a ticked box and the button read as one.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer relative grid size-5 shrink-0 place-items-center rounded-(--radius-sm) border-2 border-foreground/50",
      "transition-[background-color,border-color,box-shadow] duration-fast ease-(--ease-out)",
      "hover:border-foreground/70",
      controlChecked,
      "data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent",
      "data-[state=indeterminate]:bg-(image:--violet-face) data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:shadow-(--violet-edge)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-items-center">
      <CheckIcon className="size-3.5 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="size-3.5 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

// "iconoir:check" and "iconoir:minus" from Iconoir,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m5 13l4 4L19 7"/>
    </svg>
  );
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 12h12"/>
    </svg>
  );
}
