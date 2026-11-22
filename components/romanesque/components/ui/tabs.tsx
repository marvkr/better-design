"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useDataState, springInteraction } from "@/lib/motion"

const TabsContext = React.createContext<{ uid: string }>({ uid: "" })

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const uid = React.useId()
  return (
    <TabsContext.Provider value={{ uid }}>
      <TabsPrimitive.Root className={cn("", className)} {...props} />
    </TabsContext.Provider>
  )
}
Tabs.displayName = TabsPrimitive.Root.displayName

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
TabsList.displayName = TabsPrimitive.List.displayName

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { uid } = React.useContext(TabsContext)
  const ref = React.useRef<HTMLButtonElement>(null)
  const dataState = useDataState(ref)
  const isActive = dataState === "active"

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={`tabs-indicator-${uid}`}
          className="absolute inset-0 rounded-sm bg-background shadow-sm"
          transition={springInteraction}
        />
      )}
      <span className="relative z-10">{children}</span>
    </TabsPrimitive.Trigger>
  )
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
