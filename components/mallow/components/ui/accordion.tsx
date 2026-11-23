"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";
import { focusRing, softPanel } from "./_shared";

/**
 * Mallow Accordion: rows ruled by a hairline. Each trigger holds its chevron
 * in a small violet-ringed tile that turns when the row opens. The row opens at
 * once under reduced motion.
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
        "group/accordion flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-start text-base font-medium text-foreground",
        "transition-colors duration-fast ease-(--ease-out)",
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          softPanel,
          "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground",
          "transition-shadow duration-fast group-hover/accordion:text-foreground group-hover/accordion:shadow-(--option-edge-hover)",
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
    className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
    {...props}
  >
    <div className={cn("pb-5 pt-0 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// Iconoir, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "iconoir:nav-arrow-down"
// [BD-1029]
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 9l6 6l6-6"/>
    </svg>
  );
}
