"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: CheckboxGroupOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, options, value, onChange, ...props }, ref) => {
    // Scope the ids to this group so two groups sharing option values do not
    // produce duplicate ids, which would break every label association.
    const groupId = React.useId();
    const [internal, setInternal] = React.useState<string[]>(value ?? []);
    const selected = value ?? internal;

    const toggle = (next: string) => {
      const updated = selected.includes(next)
        ? selected.filter((item) => item !== next)
        : [...selected, next];
      setInternal(updated);
      onChange?.(updated);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {options.map((option) => {
          const id = `${groupId}-${option.value}`;
          return (
            <div key={option.value} className="flex items-start gap-2.5">
              <Checkbox
                id={id}
                checked={selected.includes(option.value)}
                disabled={option.disabled}
                onCheckedChange={() => toggle(option.value)}
                className="mt-0.5"
              />
              <div className="space-y-0.5">
                <label
                  htmlFor={id}
                  className={cn(
                    "text-[0.8125rem] font-medium leading-[1.25rem] text-foreground",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {option.label}
                </label>
                {option.description ? (
                  <p className="text-[0.7188rem] leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
