"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior TabsSubtle — the quiet sibling of the segmented control. No well,
 * no underline: the active tab is a row picked out of the list, an 8px
 * plateau carrying the row shadow. Everything else is just text.
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
        <div role="tablist" className="flex items-center gap-1">
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
        "rounded-[0.5rem] px-3 py-1.5 text-[0.8125rem] font-medium leading-[1.4]",
        "transition-[background-color,color,box-shadow] duration-fast",
        "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        active
          ? "bg-secondary text-foreground shadow-[var(--shadow-row)]"
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
