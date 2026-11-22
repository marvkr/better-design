"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// InputCopy: read-only input milled as a recessed channel with a copy-to-clipboard
// chip and animated success feedback.
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
            "h-9 w-full rounded-lg border border-white/10 bg-input px-3 pr-10 text-[0.8125rem]",
            "text-foreground placeholder:text-muted-foreground",
            "[box-shadow:var(--shadow-inset)]",
            "transition-[border-color,box-shadow] duration-fast",
            "hover:border-white/20",
            "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1 flex h-7 w-7 items-center justify-center rounded-md",
            "[background:var(--surface-silver)] text-foreground [box-shadow:var(--shadow-button)]",
            "transition-[box-shadow,transform] duration-fast",
            "hover:[box-shadow:var(--shadow-button-hover)] active:translate-y-px",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.svg
                key="check"
                width="14"
                height="14"
                viewBox="0 0 24 24"
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
                <path d="M5 12.5 L10 17.5 L19 6.5" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden
              >
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15 V5 a2 2 0 0 1 2 -2 H15" />
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
