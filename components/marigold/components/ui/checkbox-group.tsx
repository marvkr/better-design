"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism
import { Checkbox } from "./checkbox";

// Talentboard CheckboxGroup: stacked options reusing the DS Checkbox material.

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
  const groupId = React.useId();

  const toggle = (optionValue: string, checked: boolean) => {
    const next = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onValueChange(next);
  };

  return (
    <div
      role="group"
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className
      )}
      {...props}
    >
      {options.map((option) => {
        const id = `${groupId}-${option.value}`;
        const checked = value.includes(option.value);
        return (
          <label
            key={option.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-2.5",
              option.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <Checkbox
              id={id}
              name={name}
              checked={checked}
              disabled={option.disabled}
              onCheckedChange={(next) => toggle(option.value, next === true)}
              className="mt-0.5"
            />
            <span className="grid gap-0.5">
              <span className="text-sm font-medium leading-none text-foreground">
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-muted-foreground">{option.description}</span>
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
