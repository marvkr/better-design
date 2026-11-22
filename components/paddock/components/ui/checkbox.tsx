"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing } from "./_shared";

/**
 * Paddock Checkbox: an empty box is a small white tile with a 1px cool
 * border, the card finish at the size of a tick. Checked, it fills with the
 * primary Button's teal and its top highlight, so a ticked box and the button
 * read as one material.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer relative grid size-4.5 shrink-0 place-items-center rounded-xs border border-transparent",
      "bg-(--field) text-primary-foreground shadow-(--control-ring)",
      controlChecked,
      "transition-[box-shadow,background-color] duration-fast ease-out",
      "data-[state=unchecked]:hover:shadow-(--control-lift)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      {props.checked === "indeterminate" ? (
        <Icon icon="mingcute:minimize-line" className="size-3" />
      ) : (
        <Icon icon="mingcute:check-line" className="size-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
