"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

/**
 * Bold retail Collapsible: a section that folds away under a plain row, the
 * way a product page hides Size and Fit or Shipping. The row reads at body
 * size in medium weight; a chevron placed inside it turns over as the
 * section opens. Pass `asChild` to use your own button as the row, unstyled.
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
          "flex w-full items-center justify-between gap-4 rounded-none py-3 text-start text-base font-medium text-foreground",
          "transition-colors duration-fast ease-out hover:text-(--foreground-secondary)",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
          "[&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-foreground [&_svg]:transition-transform [&_svg]:duration-fast [&_svg]:ease-out",
          "[&[data-state=open]_svg]:rotate-180 motion-reduce:[&_svg]:transition-none",
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
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
