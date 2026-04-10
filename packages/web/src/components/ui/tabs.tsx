"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useDataState, springInteraction } from "@/lib/motion"

type TabsVariant = "default" | "underline"

const TabsContext = React.createContext<{ uid: string; variant: TabsVariant }>({
  uid: "",
  variant: "default",
})

function Tabs({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }) {
  const uid = React.useId()
  return (
    <TabsContext.Provider value={{ uid, variant }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "text-muted-foreground inline-flex w-fit items-center justify-center",
        variant === "default" && "bg-muted h-9 rounded-lg p-1",
        variant === "underline" && "h-auto border-b border-border bg-transparent p-0 gap-4",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { uid, variant } = React.useContext(TabsContext)
  const ref = React.useRef<HTMLButtonElement>(null)
  const dataState = useDataState(ref)
  const isActive = dataState === "active"

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring relative inline-flex items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "default" &&
          "text-muted-foreground data-[state=active]:text-foreground h-[calc(100%-1px)] flex-1 rounded-md border border-transparent px-3 py-1.5",
        variant === "underline" &&
          "text-muted-foreground border-0 bg-transparent px-1 pb-2 pt-1 text-xs data-[state=active]:text-foreground",
        className
      )}
      {...props}
    >
      {isActive && variant === "default" && (
        <motion.div
          layoutId={`tabs-indicator-${uid}`}
          className="absolute inset-0 rounded-md bg-background shadow-sm"
          transition={springInteraction}
        />
      )}
      {isActive && variant === "underline" && (
        <motion.div
          layoutId={`tabs-indicator-${uid}`}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          transition={springInteraction}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
