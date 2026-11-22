"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass InputGroup: recessed well with prefix / suffix add-ons.

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: "default" | "sm"
  disabled?: boolean
  error?: boolean
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, size = "default", disabled, error, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-lg",
        formFieldBase,
        "p-0",
        size === "sm" ? "h-8 text-xs" : "h-9 text-sm",
        "focus-within:border-[color:oklch(0.69_0.195_42/0.55)] focus-within:ring-2 focus-within:ring-ring/35",
        error &&
          "border-[color:oklch(0.6_0.21_27/0.5)] focus-within:border-[color:oklch(0.6_0.21_27/0.7)] focus-within:ring-[oklch(0.6_0.21_27/0.3)]",
        disabled && "pointer-events-none opacity-50",
        "[&>input]:h-full [&>input]:w-full [&>input]:flex-1 [&>input]:bg-transparent [&>input]:px-3 [&>input]:outline-none [&>input]:placeholder:text-muted-foreground",
        className
      )}
      {...props}
    >
      {prefix && (
        <span className="flex items-center border-r border-[color:var(--ag-border)] bg-[var(--ag-fill)] px-3 text-muted-foreground">
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span className="flex items-center border-l border-[color:var(--ag-border)] bg-[var(--ag-fill)] px-3 text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  )
)
InputGroup.displayName = "InputGroup"

export { InputGroup }
export type { InputGroupProps }
