"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

/**
 * Ink mail Accordion: rows divided by hairlines on the black page, with no
 * box around them. The question sits in off-white Inter at medium weight; the
 * answer drops into the secondary ink. A muted caret turns as the row opens.
 */
const Accordion = AccordionPrimitive.Root;

/** One row, closed off by a hairline under it. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}
AccordionItem.displayName = "AccordionItem";

/** The full-width question row; the caret brightens with the text on hover. */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-start text-sm font-medium text-foreground",
          "transition-colors duration-fast ease-out hover:text-(--foreground-secondary)",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-out group-hover:text-foreground"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/** The answer: secondary ink, opening and closing on its own height. */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm leading-relaxed text-(--foreground-secondary) data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// Phosphor, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "ph:caret-down"
// [BD-1029]
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"/>
    </svg>
  );
}
