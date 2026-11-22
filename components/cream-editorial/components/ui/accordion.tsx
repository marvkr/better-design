"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Accordion: questions set like the entries of a printed
 * FAQ, divided by warm hairlines with no box around them. A question reads
 * in ink at medium weight, the caret turns over as the answer opens, and the
 * answer sits in the softer reading ink.
 */
const Accordion = AccordionPrimitive.Root;

/** One question and its answer, ruled off by a hairline underneath. */
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

/** The full-width question row, with the caret at the end. */
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
          "flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-start text-[0.9375rem] font-medium text-foreground",
          "transition-colors duration-fast ease-out hover:text-(--foreground-secondary)",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          icon="ph:caret-down"
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-out motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/** The answer: opens and closes on its own height. */
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
      <div className={cn("pb-5 pe-8", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
