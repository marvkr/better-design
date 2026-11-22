"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// InputCopy: read-only input with a copy-to-clipboard button and animated
// success feedback. Ported from fluid-functionalism (mickadesign).
//
// Usage:
//   <InputCopy value="sk_live_abc123" />
//   <InputCopy label="API key" value={apiKey} />

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
      // Fail silently — the input remains selectable for manual copy.
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
          className={cn(
            "h-9 w-full rounded-md border border-border bg-background px-3 pr-10 text-[0.8125rem]",
            "text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1 flex h-7 w-7 items-center justify-center rounded-sm",
            "text-muted-foreground transition-colors",
            "hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.svg
                key="check"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden
              >
                <path d="M3 8.5 L6.5 12 L13 4.5" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden
              >
                <rect x="5" y="5" width="9" height="9" rx="1.5" />
                <path d="M3 11 V3 a1.5 1.5 0 0 1 1.5 -1.5 H11" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

export { InputCopy }
export type { InputCopyProps }
