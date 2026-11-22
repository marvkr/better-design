"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Icon } from "@iconify/react";

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
        <Icon
          icon="mingcute:down-line"
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
