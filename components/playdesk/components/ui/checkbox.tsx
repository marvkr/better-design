"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

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
      <Minus
        className="hidden size-3 group-data-[state=indeterminate]:block"
        strokeWidth={3}
      />
      <Check
        className="size-3 group-data-[state=indeterminate]:hidden"
        strokeWidth={3}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
