"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

/*
 * CheckboxGroup — a contiguous carved strip; selected rows wash with the
 * accent and their boxes take the cobalt material.
 */

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
        "relative inline-flex overflow-hidden rounded-md border border-border bg-card",
        "[box-shadow:var(--shadow-panel)]",
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
              "relative flex cursor-pointer items-start gap-3 px-3 py-2.5 text-sm transition-colors",
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
                  className="absolute inset-0 bg-accent"
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
                  "flex h-4 w-4 items-center justify-center rounded-sm border transition-[background-color,box-shadow,border-color]",
                  selected
                    ? "border-transparent text-primary-foreground [background-image:var(--cobalt)] [box-shadow:var(--shadow-primary)]"
                    : "border-border bg-input [box-shadow:var(--shadow-inset)]"
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
                <span className="text-xs text-muted-foreground">
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
