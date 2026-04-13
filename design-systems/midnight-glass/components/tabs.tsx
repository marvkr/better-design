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
        "inline-flex h-12 items-center justify-center gap-1 rounded-full p-1",
        "backdrop-blur-xl bg-white/[0.04]",
        "border border-white/[0.08]",
        "text-muted-foreground",
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
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium",
        "ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-foreground",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={`tabs-indicator-${uid}`}
          className="absolute inset-0 rounded-full bg-white/[0.1] shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] border border-white/[0.1]"
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
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
