"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { glowControlChecked } from "./_shared";

/**
 * Firefly Checkbox: a 1.25rem box with a 0.375rem corner and a warm grey
 * edge. Checked, it fills with the primary button's lit material, scaled
 * down, and the near-black tick sits on the glow.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-5 shrink-0 items-center justify-center rounded-sm border border-(--control) bg-background text-primary-foreground",
      "transition-[background-color,border-color,box-shadow] duration-fast ease-out",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "disabled:cursor-not-allowed disabled:border-(--line-strong) disabled:bg-secondary disabled:text-(--foreground-disabled)",
      glowControlChecked,
      "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-primary data-[state=indeterminate]:bg-(image:--gradient-primary) data-[state=indeterminate]:shadow-(--shadow-control)",
      "disabled:data-[state=indeterminate]:bg-secondary disabled:data-[state=indeterminate]:bg-none disabled:data-[state=indeterminate]:shadow-none disabled:data-[state=indeterminate]:text-(--foreground-disabled)",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      {props.checked === "indeterminate" ? (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
          <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
          <path
            d="M3.75 8.25 6.5 11l5.75-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
