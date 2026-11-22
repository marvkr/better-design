"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Collapsible: a section that folds under a quiet row.
 * The row is sans at medium weight in warm ink, and a caret placed inside it
 * turns over as the section opens. Hover settles an oat wash behind the row.
 * Pass `asChild` to use your own button as the row instead, unstyled.
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
          "flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-2 text-start text-sm font-medium text-foreground",
          "transition-colors duration-fast ease-out hover:bg-secondary",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:hover:bg-transparent",
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
        "overflow-hidden text-sm text-(--foreground-secondary)",
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className,
      )}
      {...props}
    />
  );
}
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
