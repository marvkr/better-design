"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

/**
 * Ink mail Collapsible: a section that folds away under a quiet row.
 * The row reads in Inter medium and brightens from the secondary ink to
 * full ink under the pointer; a caret inside it turns over as the section
 * opens. Pass `asChild` to use your own button as the row, unstyled.
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
          "flex w-full items-center justify-between gap-3 rounded-md py-2 text-start text-sm font-medium text-(--foreground-secondary)",
          "transition-colors duration-fast ease-out hover:text-foreground data-[state=open]:text-foreground",
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
        "overflow-hidden text-sm text-(--foreground-secondary) data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className,
      )}
      {...props}
    />
  );
}
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
