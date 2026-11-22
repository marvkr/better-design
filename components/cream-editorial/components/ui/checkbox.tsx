"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { controlChecked } from "./_shared";

/**
 * Cream editorial Checkbox: a 1rem box with a small corner and a warm grey
 * edge on pale paper. Checked, it fills with the same flat terracotta as the
 * primary button and a white tick sits on it. Indeterminate shows a dash on
 * the same fill.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-(--control) bg-(--field) text-primary-foreground",
      "transition-[background-color,border-color] duration-fast ease-out",
      "outline-none focus-visible:ring-3 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:border-(--line-strong) disabled:bg-secondary disabled:text-(--foreground-disabled)",
      controlChecked,
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      "disabled:data-[state=indeterminate]:border-(--line-strong) disabled:data-[state=indeterminate]:bg-muted disabled:data-[state=indeterminate]:text-(--foreground-disabled)",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      <Icon
        icon={props.checked === "indeterminate" ? "ph:minus" : "ph:check"}
        aria-hidden="true"
        className="size-3"
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
