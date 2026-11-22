"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing, panelSpring, selectedOption, optionTrack } from "./_shared";

/** What a trigger needs from its Tabs to draw the sliding panel. */
interface TabsState {
  value: string | undefined;
  panelId: string;
  reduceMotion: boolean;
}

const TabsContext = React.createContext<TabsState | null>(null);

/**
 * Mallow Tabs: a segmented control on a lilac option track. The active
 * trigger takes the violet tint and ring, which slides to the next tab on a critically
 * damped spring and never overshoots. Tabs tracks its own value, so it works
 * controlled or not. Under reduced motion the panel moves at once.
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, defaultValue, onValueChange, ...props }, ref) => {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const current = value ?? uncontrolled;
  const panelId = React.useId();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <TabsContext.Provider value={{ value: current, panelId, reduceMotion }}>
      <TabsPrimitive.Root
        ref={ref}
        data-slot="tabs"
        value={current}
        onValueChange={(next) => {
          if (value === undefined) setUncontrolled(next);
          onValueChange?.(next);
        }}
        {...props}
      />
    </TabsContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      "isolate inline-flex h-11 items-center justify-center gap-1 rounded-xl p-1 text-muted-foreground",
      optionTrack,
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => {
  const tabs = React.useContext(TabsContext);
  const active = tabs?.value === value;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-full items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium",
        "text-muted-foreground transition-colors duration-fast ease-(--ease-out) hover:text-foreground",
        "data-[state=active]:text-foreground",
        // Outside a Mallow Tabs there is no shared tint to slide, so the trigger tints itself.
        !tabs && "data-[state=active]:bg-(--option-face) data-[state=active]:shadow-(--option-edge)",
        focusRing,
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {active && (
        <motion.span
          layoutId={`${tabs?.panelId}-panel`}
          aria-hidden="true"
          data-slot="tabs-panel"
          className={cn(selectedOption, "absolute inset-0 z-0 rounded-lg")}
          transition={tabs?.reduceMotion ? { duration: 0 } : panelSpring}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0">
        {children}
      </span>
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("mt-4 rounded-lg", focusRing, className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
