"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

/**
 * Playful console Accordion: questions stacked as rows inside one white
 * card with the olive hairline, split by soft rules. Each question reads in
 * bold ink and turns cream under the pointer. A plus turns into a cross as
 * the answer opens, and the answer sits in the secondary ink.
 */
const Accordion = AccordionPrimitive.Root;

/** One question and its answer, split from the next by a soft rule. */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border border-border bg-card first:rounded-t-lg last:rounded-b-lg not-first:-mt-[0.0625rem] not-first:border-t-(--line-soft)",
        className,
      )}
      {...props}
    />
  );
}
AccordionItem.displayName = "AccordionItem";

/** The full-width question row, with the plus at the end. */
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
          "flex flex-1 items-center justify-between gap-3 px-4 py-3.5 text-start text-[0.9375rem] font-bold text-foreground",
          "transition-colors duration-fast ease-out hover:bg-secondary",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
          "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:hover:bg-transparent",
          "[&[data-state=open]>svg]:rotate-45",
          className,
        )}
        {...props}
      >
        {children}
        <PlusIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-(--primary-text) transition-transform duration-fast ease-out"
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
      <div className={cn("px-4 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// Phosphor, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "ph:plus-bold"
// [BD-1029]
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"/>
    </svg>
  );
}
