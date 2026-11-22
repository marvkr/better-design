"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

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
      {props.checked === "indeterminate" ? (
        <Icon icon="ph:minus-bold" className="size-3" />
      ) : (
        <Icon icon="ph:check-bold" className="size-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
