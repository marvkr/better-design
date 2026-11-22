"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";

interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

interface CheckboxGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  options: CheckboxGroupOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  orientation?: "vertical" | "horizontal";
  name?: string;
}

/**
 * Firefly CheckboxGroup: a list of Firefly checkboxes, each with its label
 * in medium ink and an optional muted line under it. A checked box lights up
 * in the primary material; a disabled option fades to the disabled ink.
 */
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
    onValueChange(
      checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue),
    );
  };

  return (
    <div
      role="group"
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-x-6 gap-y-3",
        className,
      )}
      {...props}
    >
      {options.map((option) => {
        const id = `${groupId}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={id}
            data-slot="checkbox-group-item"
            data-disabled={option.disabled || undefined}
            className="group flex cursor-pointer items-start gap-3 data-[disabled]:cursor-not-allowed"
          >
            <Checkbox
              id={id}
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              disabled={option.disabled}
              onCheckedChange={(next) => toggle(option.value, next === true)}
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium leading-5 text-foreground group-data-[disabled]:text-(--foreground-disabled)">
                {option.label}
              </span>
              {option.description && (
                <span className="text-sm text-muted-foreground group-data-[disabled]:text-(--foreground-disabled)">
                  {option.description}
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
