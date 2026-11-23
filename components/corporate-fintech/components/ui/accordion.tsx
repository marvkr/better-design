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

// Ant Design Icons, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "ant-design:down-outlined"
// [BD-1029]
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2L227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7"/>
    </svg>
  )
}
