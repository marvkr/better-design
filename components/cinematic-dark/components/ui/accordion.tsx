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
        <ChevronDownIcon
          className="h-4 w-4 shrink-0 transition-transform duration-base ease-out"
        />
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

// Solar, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "solar:alt-arrow-down-bold"
// [BD-1029]
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.0549 12.1573 16.0549 12.3704 15.8351Z"/>
    </svg>
  )
}
