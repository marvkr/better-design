"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism
import { formFieldBase } from "./_shared"

// Amber Glass InputCopy: read-only well with a copy affordance.

interface InputCopyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string
  label?: React.ReactNode
  /** ms before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number
}

const InputCopy = React.forwardRef<HTMLInputElement, InputCopyProps>(
  ({ className, value, label, copiedTimeoutMs = 1800, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), copiedTimeoutMs)
      } catch {
        // Clipboard unavailable; leave state unchanged.
      }
    }

    return (
      <div className={cn("flex w-full flex-col gap-1.5", className)}>
        {label && (
          <span className="text-sm font-semibold leading-none tracking-[-0.01em]">{label}</span>
        )}
        <div
          className={cn(
            "flex h-9 w-full items-stretch overflow-hidden rounded-lg",
            formFieldBase,
            "p-0"
          )}
        >
          <input
            ref={ref}
            readOnly
            value={value}
            className="w-full flex-1 bg-transparent px-3 py-2 font-mono text-xs outline-none"
            {...props}
          />
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            className="flex items-center gap-1.5 border-l border-[color:var(--ag-border)] px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <Icon
              icon={copied ? "tabler:check" : "tabler:copy"}
              className={cn("h-3.5 w-3.5", copied && "text-primary")}
            />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    )
  }
)
InputCopy.displayName = "InputCopy"

export { InputCopy }
export type { InputCopyProps }
