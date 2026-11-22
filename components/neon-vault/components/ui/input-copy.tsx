"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism
import { formFieldBase, formFieldSingleLine } from "./_shared"

// Neon Vault InputCopy: read-only recessed track with a copy chip, made for
// wallet addresses and API keys. Confirms in the mint chart hue.
//
// Usage:
//   <InputCopy value="0xBF3aE6D7..." />
//   <InputCopy label="Wallet address" value={address} />

interface InputCopyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string
  label?: React.ReactNode
  /** ms before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number
}

function InputCopy({
  value,
  label,
  copiedTimeoutMs = 1800,
  className,
  id: idProp,
  ...props
}: InputCopyProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard may be unavailable (insecure context, permissions).
      // Fail silently: the input remains selectable for manual copy.
    }
  }, [value])

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), copiedTimeoutMs)
    return () => clearTimeout(t)
  }, [copied, copiedTimeoutMs])

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-[0.75rem] font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          readOnly
          onFocus={(e) => e.currentTarget.select()}
          className={cn(formFieldBase, formFieldSingleLine, "pr-10 text-[0.8125rem]")}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full",
            "text-muted-foreground transition-colors",
            "hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          )}
        >
          {copied ? (
            <Icon icon="ph:check-bold" className="h-3.5 w-3.5 text-chart-5" aria-hidden />
          ) : (
            <Icon icon="ph:copy" className="h-3.5 w-3.5" aria-hidden />
          )}
        </button>
      </div>
    </div>
  )
}

export { InputCopy }
export type { InputCopyProps }
