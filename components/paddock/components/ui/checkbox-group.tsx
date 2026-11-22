"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, primaryFace } from "./_shared";

/**
 * Paddock CheckboxGroup: a white card of options split by 1px cool borders,
 * like the rows of a visit list. A chosen row turns light grey, and its box
 * fills with the primary Button's teal while the tick scales in.
 *
 * Usage:
 *   <CheckboxGroup
 *     value={selected}
 *     onValueChange={setSelected}
 *     options={[
 *       { value: "design", label: "Design" },
 *       { value: "research", label: "Research" },
 *     ]}
 *   />
 */
interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

/** Props for `CheckboxGroup`: a controlled list of chosen option values. */
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
        "relative inline-flex overflow-hidden rounded-lg",
        cardSlab,
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
              "relative flex cursor-pointer items-start gap-3 px-3.5 py-3 text-sm",
              "transition-colors duration-fast ease-out hover:bg-accent/60",
              "has-focus-visible:ring-2 has-focus-visible:ring-inset has-focus-visible:ring-ring",
              selected && "bg-accent",
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
                "relative mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-xs border border-transparent",
                "transition-[box-shadow,background-color] duration-fast ease-out",
                selected ? primaryFace : "bg-(--field) shadow-(--control-ring)",
              )}
            >
              <Icon
                icon="mingcute:check-line"
                className={cn(
                  "size-3 transition-[scale,opacity] duration-fast ease-out motion-reduce:transition-none",
                  selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
                )}
              />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">{opt.label}</span>
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
