"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

/**
 * Firefly Collapsible: a section that folds away under a plain text row.
 * The row reads at body size in medium weight and underlines under the
 * pointer; a chevron placed inside it turns over as the section opens.
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
          "flex w-full items-center justify-between gap-3 rounded-md py-2 text-start text-sm font-medium text-foreground",
          "underline-offset-4 hover:underline",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:no-underline",
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
