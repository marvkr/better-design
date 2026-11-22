"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

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
      {props.checked === "indeterminate" ? (
        <Icon icon="ph:minus-bold" aria-hidden="true" className="size-3" />
      ) : (
        <Icon icon="ph:check-bold" aria-hidden="true" className="size-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
