"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { oxFace, focusRing } from "./_shared";

/**
 * Margin Checkbox: an empty box is a small paper tab with a hairline ring,
 * like a toolbar button. Checked, the oxblood face of the primary Button fills
 * it with a white tick, so a ticked box and the button read as one material.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer relative size-4.5 shrink-0 rounded-sm border border-transparent bg-card shadow-(--control-edge)",
      "transition duration-fast ease-(--ease-out) hover:shadow-(--control-edge-hover)",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={cn("absolute -inset-0.25 flex items-center justify-center rounded-sm", oxFace)}
    >
      {props.checked === "indeterminate" ? (
        <span className="h-0.5 w-2 rounded-full bg-current" />
      ) : (
        <Icon icon="solar:unread-linear" className="size-3.5 [&_path]:stroke-3" aria-hidden />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
