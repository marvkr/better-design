"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

/**
 * Heyclicky Checkbox — a shrunken install pill.
 *
 * Unchecked it is a white field with a hairline edge. Checked it takes the
 * button's exact material: the blue vertical gradient, the white gloss line
 * along the top, and a small blue throw underneath.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[1.125rem] w-[1.125rem] shrink-0 rounded-sm border border-border bg-input",
      "transition-[background,box-shadow,border-color] duration-base ease-out",
      "hover:border-ring/40",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-45",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-[image:var(--gradient-primary)] data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-[var(--shadow-control)]",
      "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-[image:var(--gradient-primary)] data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:shadow-[var(--shadow-control)]",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-3 w-3 in-data-[state=indeterminate]:hidden"
      >
        <path
          d="M3.5 8.5l3 3 6-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-3 w-3 hidden in-data-[state=indeterminate]:block"
      >
        <path
          d="M4 8h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
