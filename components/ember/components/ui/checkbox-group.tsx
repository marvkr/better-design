"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism
import { Checkbox } from "./checkbox"

// Amber Glass CheckboxGroup: stacked amber checkboxes with labels.

interface CheckboxGroupOption {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: CheckboxGroupOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  orientation?: "vertical" | "horizontal"
  name?: string
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    { className, options, value, onValueChange, orientation = "vertical", name, ...props },
    ref
  ) => {
    const toggle = (optionValue: string, checked: boolean) => {
      onValueChange(
        checked
          ? [...value, optionValue]
          : value.filter((v) => v !== optionValue)
      )
    }

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        )}
        {...props}
      >
        {options.map((option) => {
          const id = `${name ?? "checkbox-group"}-${option.value}`
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
                checked={value.includes(option.value)}
                disabled={option.disabled}
                onCheckedChange={(checked) => toggle(option.value, checked === true)}
                className="mt-0.5"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold leading-none tracking-[-0.01em]">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    )
  }
)
CheckboxGroup.displayName = "CheckboxGroup"

export { CheckboxGroup }
export type { CheckboxGroupProps, CheckboxGroupOption }
