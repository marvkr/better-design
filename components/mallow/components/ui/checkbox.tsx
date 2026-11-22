"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

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
      {props.checked === "indeterminate" ? (
        <Icon icon="iconoir:minus" className="size-3.5" />
      ) : (
        <Icon icon="iconoir:check" className="size-3.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
