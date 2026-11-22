"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk TabsSubtle — the quieter sibling of the segmented control. No
 * track: the active tab is marked by a short sky-blue underline instead.
 */

export interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsSubtleContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({ value: "", onValueChange: () => {} });

const TabsSubtle = React.forwardRef<HTMLDivElement, TabsSubtleProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => (
    <TabsSubtleContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div
          role="tablist"
          className="flex items-center gap-6 border-b border-border"
        >
          {children}
        </div>
      </div>
    </TabsSubtleContext.Provider>
  ),
);
TabsSubtle.displayName = "TabsSubtle";

export interface TabsSubtleItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsSubtleItem = React.forwardRef<
  HTMLButtonElement,
  TabsSubtleItemProps
>(({ className, value, children, ...props }, ref) => {
  const ctx = React.useContext(TabsSubtleContext);
  const active = ctx.value === value;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "relative -mb-px py-2.5 text-sm font-medium",
        "transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
        active
          ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
TabsSubtleItem.displayName = "TabsSubtleItem";

export interface TabsSubtlePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsSubtlePanel = React.forwardRef<HTMLDivElement, TabsSubtlePanelProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = React.useContext(TabsSubtleContext);
    if (ctx.value !== value) return null;

    return (
      <div ref={ref} role="tabpanel" className={cn("pt-4", className)} {...props}>
        {children}
      </div>
    );
  },
);
TabsSubtlePanel.displayName = "TabsSubtlePanel";

export { TabsSubtle, TabsSubtleItem, TabsSubtlePanel };
