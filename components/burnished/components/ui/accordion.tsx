"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";
import { focusRing, raisedBevel } from "./_shared";

/**
 * Burnished Accordion: rows ruled by a hairline. Each trigger carries its
 * caret inside a small graphite bevel that turns when the row opens, so the
 * open state reads from the material, not only the arrow.
 */
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b border-border last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "group/accordion flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-[0.9375rem] font-semibold tracking-[0.016em] text-foreground",
        "transition-colors duration-fast ease-(--ease-out)",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:text-primary-text",
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          raisedBevel,
          "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground",
        )}
      >
        <ChevronDownIcon
          className="size-3.5 transition-transform duration-base ease-(--ease-out) group-data-[state=open]/accordion:rotate-180 motion-reduce:transition-none"
        />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-5 pt-0 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
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
