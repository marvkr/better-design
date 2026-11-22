"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { copperRim, surfacePlate, wellInset } from "./_shared";

/**
 * Burnished CheckboxGroup: a plate of options split by hairlines. A chosen
 * row warms to the accent, and its box fills with the primary's cream bevel
 * inside a copper rim while the tick draws in.
 *
 * Usage:
 *   <CheckboxGroup
 *     value={selected}
 *     onValueChange={setSelected}
 *     options={[
 *       { value: "a", label: "Apple" },
 *       { value: "b", label: "Banana" },
 *     ]}
 *   />
 */
interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
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
  const toggle = (v: string) => {
    if (value.includes(v)) onValueChange(value.filter((x) => x !== v));
    else onValueChange([...value, v]);
  };

  return (
    <div
      role="group"
      data-slot="checkbox-group"
      className={cn(
        "relative inline-flex overflow-hidden rounded-xl",
        surfacePlate,
        orientation === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
      {...props}
    >
      {options.map((opt, i) => {
        const selected = value.includes(opt.value);
        return (
          <label
            key={opt.value}
            data-checked={selected || undefined}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 px-4 py-3 text-sm",
              "transition-colors duration-fast",
              "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60",
              "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-ring",
              selected && "bg-accent/40",
              opt.disabled && "cursor-not-allowed opacity-50",
              orientation === "vertical" && i > 0 && "border-t border-border",
              orientation === "horizontal" && i > 0 && "border-l border-border",
            )}
          >
            <input
              type="checkbox"
              name={name}
              value={opt.value}
              checked={selected}
              disabled={opt.disabled}
              onChange={() => toggle(opt.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "relative mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[0.4375rem]",
                selected
                  ? cn(copperRim, "text-primary-foreground shadow-(--bevel-primary)")
                  : cn(wellInset, "border-2 border-transparent"),
              )}
            >
              <AnimatePresence>
                {selected && (
                  <motion.svg
                    key="check"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-2.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.path d="M2.5 6.5 L5 9 L9.5 3.5" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold text-foreground">{opt.label}</span>
              {opt.description && (
                <span className="text-[0.8125rem] text-muted-foreground">{opt.description}</span>
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
