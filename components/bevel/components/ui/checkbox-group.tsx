"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

/*
 * Bevel CheckboxGroup.
 *
 * A contiguous run of choices reads as one card, not a stack of boxes. The
 * group is a borderless card and each option is a row inside it at the row
 * padding of 14px by 10px. One pixel of the track token separates the rows, so
 * two selected neighbours merge into a single tinted shape. The box itself is
 * the system Checkbox, so a checked option carries the same gradient and rim
 * as the primary Button.
 *
 * Usage:
 *   <CheckboxGroup
 *     value={selected}
 *     onValueChange={setSelected}
 *     options={[
 *       { value: "a", label: "Morning" },
 *       { value: "b", label: "Afternoon" },
 *     ]}
 *   />
 */

/** One choice in a `CheckboxGroup`. */
export interface CheckboxGroupOption {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

/** Props for `CheckboxGroup`; `value` holds every checked option value. */
export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: CheckboxGroupOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  orientation?: "vertical" | "horizontal"
  name?: string
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
  const groupId = React.useId()

  const isSelected = React.useCallback(
    (optionValue: string) => value.includes(optionValue),
    [value],
  )

  const toggle = (optionValue: string) => {
    if (isSelected(optionValue)) {
      onValueChange(value.filter((entry) => entry !== optionValue))
    } else {
      onValueChange([...value, optionValue])
    }
  }

  return (
    <div
      role="group"
      className={cn(
        "inline-flex overflow-hidden rounded-[0.875rem] bg-card text-card-foreground",
        "[box-shadow:var(--shadow-card)]",
        orientation === "vertical" ?
          "flex-col divide-y divide-[var(--track)]"
        : "flex-row divide-x divide-[var(--track)]",
        className,
      )}
      {...props}
    >
      {options.map((option) => {
        const selected = isSelected(option.value)
        const itemId = `${groupId}-${option.value}`

        return (
          <label
            key={option.value}
            htmlFor={itemId}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 px-3.5 py-2.5",
              "transition-colors duration-fast ease-out",
              selected ? "bg-accent" : "hover:bg-muted",
              option.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <Checkbox
              id={itemId}
              name={name}
              value={option.value}
              checked={selected}
              disabled={option.disabled}
              onCheckedChange={() => toggle(option.value)}
              className="mt-px"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-[0.9063rem] leading-[1.125rem] font-medium tracking-[0.0188rem] text-foreground">
                {option.label}
              </span>
              {option.description && (
                <span className="text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        )
      })}
    </div>
  )
}
CheckboxGroup.displayName = "CheckboxGroup"

export { CheckboxGroup }
