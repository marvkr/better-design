"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// CheckboxGroup: a group wrapper for a contiguous set of checkboxes that
// merges their backgrounds so adjacent selected items read as one shape.
// Ported from fluid-functionalism (mickadesign), simplified to use semantic
// tokens and standard hover.
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
        "relative inline-flex overflow-hidden rounded-lg border border-border bg-background",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {options.map((opt, i) => {
        const selected = isSelected(opt.value)
        const prevSelected = i > 0 ? isSelected(options[i - 1].value) : false
        const nextSelected =
          i < options.length - 1 ? isSelected(options[i + 1].value) : false

        return (
          <label
            key={opt.value}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 px-3 py-2.5 text-[0.8125rem] transition-colors",
              "hover:bg-accent/50",
              opt.disabled && "cursor-not-allowed opacity-50",
              orientation === "vertical" && i > 0 && "border-t border-border",
              orientation === "horizontal" && i > 0 && "border-l border-border"
            )}
          >
            <AnimatePresence>
              {selected && (
                <motion.span
                  key="bg"
                  className={cn(
                    "absolute inset-0 bg-accent",
                    orientation === "vertical" && prevSelected && "border-t-transparent",
                    orientation === "vertical" && nextSelected && "border-b-transparent"
                  )}
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
                  "flex h-4 w-4 items-center justify-center rounded-md border transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)]"
                    : "border-border bg-background"
                )}
              >
                <AnimatePresence>
                  {selected && (
                    <motion.svg
                      key="check"
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      aria-hidden
                    >
                      <motion.path d="M2.5 6.5 L5 9 L9.5 3.5" />
                    </motion.svg>
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
        )
      })}
    </div>
  )
}

export { CheckboxGroup }
export type { CheckboxGroupProps, CheckboxGroupOption }
