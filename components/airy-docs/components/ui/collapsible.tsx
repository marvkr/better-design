"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

/**
 * Airy docs Collapsible: a "show more" section, such as the child
 * properties of an API field. The row reads in medium Inter and turns green
 * under the pointer; a chevron inside it turns as the section opens. Pass
 * `asChild` to use your own button as the row instead, unstyled.
 */
const Collapsible = CollapsiblePrimitive.Root;

/** The row that opens and closes the section. */
function CollapsibleTrigger({
  className,
  asChild,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      asChild={asChild}
      className={cn(
        !asChild && [
          "flex w-full items-center justify-between gap-3 rounded-md py-2 text-start text-sm font-medium text-foreground",
          "transition-colors duration-fast hover:text-(--primary-text)",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
          "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-fast",
          "[&[data-state=open]_svg]:rotate-180",
        ],
        className,
      )}
      {...props}
    />
  );
}
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

/** The section itself: opens and closes on its own height. */
function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className,
      )}
      {...props}
    />
  );
}
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
