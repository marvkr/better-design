"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useDataState, springInteraction } from "@/lib/motion";

/*
 * Ops Sharp Tabs — a segmented selector pressed into a recessed grey track. The
 * active trigger lifts into a crisp white tile (bg-card + --shadow-s) with the
 * graphite ink emphasis, sliding between segments via a shared layoutId.
 */

const TabsContext = React.createContext<{ uid: string }>({ uid: "" });

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const uid = React.useId();
  return (
    <TabsContext.Provider value={{ uid }}>
      <TabsPrimitive.Root className={cn("", className)} {...props} />
    </TabsContext.Provider>
  );
}
Tabs.displayName = TabsPrimitive.Root.displayName;

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-border bg-muted p-1 text-muted-foreground",
        "[box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    />
  );
}
TabsList.displayName = TabsPrimitive.List.displayName;

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { uid } = React.useContext(TabsContext);
  const ref = React.useRef<HTMLButtonElement>(null);
  const dataState = useDataState(ref);
  const isActive = dataState === "active";

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50",
        "text-muted-foreground data-[state=active]:text-foreground",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={`tabs-indicator-${uid}`}
          className="absolute inset-0 rounded-sm border border-border bg-card [box-shadow:var(--shadow-s)]"
          transition={springInteraction}
        />
      )}
      <span className="relative z-10">{children}</span>
    </TabsPrimitive.Trigger>
  );
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    />
  );
}
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
