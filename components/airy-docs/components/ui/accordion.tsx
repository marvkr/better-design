"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Accordion: the FAQ and "expandable" block of a docs page.
 *
 * Items stack inside one white panel with a 1rem corner and a hairline edge,
 * divided by hairlines. The question reads in medium Inter; a chevron on the
 * right turns as the answer opens, and the answer sits in the secondary ink.
 */
const Accordion = AccordionPrimitive.Root;

/** One question and its answer, divided from the next by a hairline. */
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

/** The full-width question row, with the chevron at the end. */
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
          "flex flex-1 items-center justify-between gap-3 rounded-md py-3.5 text-start text-sm font-medium text-foreground",
          "transition-colors duration-fast hover:text-(--primary-text)",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
          "[&[data-state=open]>svg]:rotate-90",
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          icon="feather:chevron-right"
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-out"
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
      <div className={cn("pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
