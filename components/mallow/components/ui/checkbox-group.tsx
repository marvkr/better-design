"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { primaryFinish, swapSpring, optionTrack } from "./_shared";

/**
 * Mallow CheckboxGroup: options on one lilac option track. A chosen row
 * takes the light violet tint inside a violet ring, and its box takes the
 * solid violet primary finish while the tick draws in. The tick appears at once under
 * reduced motion.
 *
 * Usage:
 *   <CheckboxGroup
 *     value={selected}
 *     onValueChange={setSelected}
 *     options={[
 *       { value: "email", label: "Email" },
 *       { value: "sms", label: "Text message" },
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
  const reduceMotion = useReducedMotion() ?? false;

  const toggle = (v: string) => {
    if (value.includes(v)) onValueChange(value.filter((x) => x !== v));
    else onValueChange([...value, v]);
  };

  return (
    <div
      role="group"
      data-slot="checkbox-group"
      className={cn(
        "relative inline-flex gap-1 rounded-2xl p-1",
        optionTrack,
        orientation === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
      {...props}
    >
      {options.map((opt) => {
        const selected = value.includes(opt.value);
        return (
          <label
            key={opt.value}
            data-checked={selected || undefined}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 rounded-xl px-4 py-3 text-sm",
              "transition-[background-color,box-shadow] duration-fast ease-(--ease-out)",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
              selected ? "bg-(--option-face) shadow-(--option-edge)" : "hover:bg-(--tag)",
              opt.disabled && "cursor-not-allowed opacity-50",
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
              aria-hidden="true"
              className={cn(
                "relative mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm",
                selected ? primaryFinish : "border-2 border-foreground/50",
              )}
            >
              <AnimatePresence initial={false}>
                {selected && (
                  <motion.svg
                    key="check"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-3"
                    initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { pathLength: 0, opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : swapSpring}
                  >
                    <motion.path d="M2.5 6.5 L5 9 L9.5 3.5" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">{opt.label}</span>
              {opt.description && (
                <span className="text-sm text-muted-foreground">{opt.description}</span>
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
