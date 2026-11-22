"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Ops Sharp CheckboxGroup - a contiguous set of checkboxes inside one bordered
// well; adjacent selected rows merge their tint so the selection reads as one
// shape. The checked box reuses the primary graphite material (bg-primary +
// --shadow-primary) so it matches the standalone Checkbox + filled controls.
//
// Usage:
//   <CheckboxGroup
//     value={selected}
//     onValueChange={setSelected}
//     options={[
//       { value: "a", label: "Apple" },
//       { value: "b", label: "Banana" },
//       { value: "c", label: "Cherry" },
//     ]}
//   />

interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: CheckboxGroupOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  orientation?: "vertical" | "horizontal";
  name?: string;
}

function CheckboxGroup({
  options,
  value,
  onValueChange,
  orientation = "vertical",
  name,
  className,
  ...props
}: CheckboxGroupProps) {
  const isSelected = React.useCallback(
    (v: string) => value.includes(v),
    [value]
  );

  const toggle = (v: string) => {
    if (isSelected(v)) {
      onValueChange(value.filter((x) => x !== v));
    } else {
      onValueChange([...value, v]);
    }
  };

  return (
    <div
      role="group"
      className={cn(
        "relative inline-flex overflow-hidden rounded-md border border-border bg-card",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {options.map((opt, i) => {
        const selected = isSelected(opt.value);

        return (
          <label
            key={opt.value}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 px-3 py-2.5 text-[0.8125rem] transition-colors",
              "hover:bg-secondary/60",
              opt.disabled && "cursor-not-allowed opacity-50",
              orientation === "vertical" && i > 0 && "border-t border-border",
              orientation === "horizontal" && i > 0 && "border-l border-border"
            )}
          >
            <AnimatePresence>
              {selected && (
                <motion.span
                  key="bg"
                  className="absolute inset-0 bg-secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  aria-hidden
                />
              )}
            </AnimatePresence>

            <span className="relative z-10 flex items-center pt-0.5">
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-sm border transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)]"
                    : "border-border bg-card [box-shadow:var(--shadow-inset)]"
                )}
              >
                <AnimatePresence>
                  {selected && (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.14 }}
                      aria-hidden
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </span>

            <input
              type="checkbox"
              name={name}
              value={opt.value}
              checked={selected}
              disabled={opt.disabled}
              onChange={() => toggle(opt.value)}
              className="sr-only"
            />

            <span className="relative z-10 flex flex-col gap-0.5">
              <span className="font-medium text-foreground">{opt.label}</span>
              {opt.description && (
                <span className="text-[0.75rem] text-muted-foreground">
                  {opt.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export { CheckboxGroup };
export type { CheckboxGroupProps, CheckboxGroupOption };
