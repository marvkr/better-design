"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useDataState, springStateChange } from "@/lib/motion"

const Accordion = AccordionPrimitive.Root

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
  )
}
AccordionItem.displayName = "AccordionItem"

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-base ease-out" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const dataState = useDataState(contentRef)
  const isOpen = dataState === "open"

  return (
    <AccordionPrimitive.Content ref={contentRef} forceMount className="text-sm" {...props}>
      <motion.div
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={springStateChange}
        initial={false}
        className="overflow-hidden"
      >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

// MingCute, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "mingcute:down-line"
// [BD-1029]
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m12 13.586l4.95-4.95c.481-.422 1.233-.381 1.573.207c.235.407.139.868-.159 1.207l-5.657 5.657c-.204.179-.429.293-.707.293s-.503-.114-.707-.293L5.636 10.05c-.179-.204-.293-.429-.293-.707c0-.927 1.053-1.281 1.707-.707Z"/>
    </svg>
  )
}
