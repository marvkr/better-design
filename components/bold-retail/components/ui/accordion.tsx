"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

/**
 * Bold retail Accordion: the disclosure rows under a product, such as
 * Reviews, Shipping and Returns. There is no box around them: each row is
 * divided by the grey hairline and gives its medium label plenty of room.
 * The black chevron sits at the right end and turns over as the panel
 * opens; the answer reads in the muted grey.
 */
const Accordion = AccordionPrimitive.Root;

/** One row and its panel, closed off by a hairline under it. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-none border-b border-border", className)}
      {...props}
    />
  );
}
AccordionItem.displayName = "AccordionItem";

/** The full-width label row, with the chevron at the right end. */
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
          "flex flex-1 items-center justify-between gap-4 rounded-none py-6 text-start text-base font-medium text-foreground",
          "transition-colors duration-fast ease-out hover:text-(--foreground-secondary)",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-foreground transition-transform duration-fast ease-out motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/** The panel: opens and closes on its own height. */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-base text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
      {...props}
    >
      <div className={cn("pb-6 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// MingCute, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "mingcute:down-line"
// [BD-1029]
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m12 13.586l4.95-4.95c.481-.422 1.233-.381 1.573.207c.235.407.139.868-.159 1.207l-5.657 5.657c-.204.179-.429.293-.707.293s-.503-.114-.707-.293L5.636 10.05c-.179-.204-.293-.429-.293-.707c0-.927 1.053-1.281 1.707-.707Z"/>
    </svg>
  );
}
