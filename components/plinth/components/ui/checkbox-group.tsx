"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * CheckboxGroup: a stack of options in one recessed well. Each row carries
 * a small checkbox well; a chosen row rises a step and its box takes the
 * ember Button material.
 *
 *   <CheckboxGroup
 *     value={selected}
 *     onValueChange={setSelected}
 *     options={[{ value: "png", label: "PNG" }, { value: "mp4", label: "MP4" }]}
 *   />
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
  const toggle = (v: string) =>
    onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])

  return (
    <div
      role="group"
      className={cn(
        "inline-flex gap-1 rounded-xl bg-input p-1 [box-shadow:var(--shadow-inset)]",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {options.map((opt) => {
        const selected = value.includes(opt.value)

        return (
          <label
            key={opt.value}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-[0.8125rem]",
              "transition-[background,box-shadow] duration-fast",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
              selected
                ? "[background:var(--segment-gradient)] [box-shadow:var(--shadow-segment)]"
                : "hover:bg-muted/60",
              opt.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <span className="flex items-center pt-0.5">
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-[0.3125rem] border transition-[background,border-color] duration-fast",
                  selected
                    ? "border-[oklch(0.5_0.16_39)] [background:var(--ember-gradient)] text-primary-foreground [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4)]"
                    : "border-[oklch(1_0_0/0.12)] bg-input [box-shadow:var(--shadow-inset)]"
                )}
              >
                {selected && <CheckIcon className="size-2.5" />}
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

            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">{opt.label}</span>
              {opt.description && <span className="text-xs text-muted-foreground">{opt.description}</span>}
            </span>
          </label>
        )
      })}
    </div>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export { CheckboxGroup }
export type { CheckboxGroupProps, CheckboxGroupOption }
