"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { controlChecked, focusRing } from "./_shared";

/**
 * Bold retail Checkbox: a 1.25rem box with a small corner and a grey edge.
 * Checked or mixed, it turns flat black like the primary pill, with a white
 * mark inside. It never casts a shadow.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer inline-flex size-5 shrink-0 items-center justify-center rounded-[0.25rem] border border-(--control) bg-background text-primary-foreground",
      "transition-[background-color,border-color] duration-fast ease-out",
      "hover:border-foreground",
      focusRing,
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
        icon={props.checked === "indeterminate" ? "mingcute:minimize-line" : "mingcute:check-line"}
        aria-hidden="true"
        className="size-3.5"
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
