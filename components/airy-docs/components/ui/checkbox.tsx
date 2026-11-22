"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { controlChecked } from "./_shared";

/**
 * Airy docs Checkbox: a 1rem box with a 0.3125rem corner behind a quiet grey
 * edge. Checked or mixed, it fills with the same flat green as the primary
 * button, and a white tick or dash sits on it.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-4 shrink-0 items-center justify-center rounded-[0.3125rem] border border-(--control) bg-background text-primary-foreground",
      "transition-[background-color,border-color] duration-fast ease-out",
      "outline-none focus-visible:ring-3 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:border-(--line-strong) disabled:bg-muted",
      controlChecked,
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
      "disabled:data-[state=indeterminate]:border-(--line-strong) disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:text-(--foreground-disabled)",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      {props.checked === "indeterminate" ? (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3">
          <path d="M3.5 8h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3">
          <path
            d="M3 8.5 6.25 11.5 13 4.5"
            stroke="currentColor"
            strokeWidth="2.25"
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
