"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Neon Vault CheckboxGroup: a contiguous stack of selectable rows inside a
// rounded vault panel. Selected rows wash in the accent and the small check
// square takes the hero magenta material like the standalone Checkbox.
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
  )

  const toggle = (v: string) => {
    if (isSelected(v)) {
      onValueChange(value.filter((x) => x !== v))
    } else {
      onValueChange([...value, v])
    }
  }

  return (
    <div
      role="group"
      className={cn(
        "relative inline-flex overflow-hidden rounded-xl border border-border bg-card [box-shadow:var(--shadow-raised)]",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {options.map((opt, i) => {
        const selected = isSelected(opt.value)

        return (
          <label
            key={opt.value}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 px-3.5 py-2.5 text-[0.8125rem] transition-colors",
              "hover:bg-accent/50",
              selected && "bg-accent",
              opt.disabled && "cursor-not-allowed opacity-50",
              orientation === "vertical" && i > 0 && "border-t border-border",
              orientation === "horizontal" && i > 0 && "border-l border-border"
            )}
          >
            <span className="relative z-10 flex items-center pt-0.5">
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-xs border transition-all",
                  selected
                    ? "border-transparent bg-primary [background-image:var(--gradient-primary)] text-primary-foreground [box-shadow:var(--shadow-button)]"
                    : "border-border bg-input [box-shadow:var(--shadow-inset)]"
                )}
              >
                {selected && (
                  <Icon icon="ph:check-bold" className="h-2.5 w-2.5" aria-hidden />
                )}
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
        )
      })}
    </div>
  )
}

export { CheckboxGroup }
export type { CheckboxGroupProps, CheckboxGroupOption }
