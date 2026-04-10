"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function AnimatedTabs({
  tabs,
  value,
  onValueChange,
  className,
}: AnimatedTabsProps) {
  return (
    <div
      className={cn(
        "flex gap-1 p-1 rounded-lg border bg-secondary/50",
        className
      )}
    >
      {tabs.map((tab) => {
        const isSelected = value === tab.value;

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isSelected}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onValueChange(tab.value)}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              tab.disabled && "opacity-50 cursor-not-allowed",
              !tab.disabled && "cursor-pointer",
              isSelected
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-background border rounded-md shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
