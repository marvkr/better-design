"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * InputCopy: a read-only value in a recessed well, set in Geist Mono like
 * the editor's readouts, with a copy button seated inside its right edge.
 *
 *   <InputCopy label="Share link" value="example.com/s/8f2k" />
 */

interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string
  label?: React.ReactNode
  /** ms before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number
}

function InputCopy({ value, label, copiedTimeoutMs = 1800, className, id: idProp, ...props }: InputCopyProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // The clipboard can be unavailable; the field stays selectable.
    }
  }, [value])

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), copiedTimeoutMs)
    return () => clearTimeout(t)
  }, [copied, copiedTimeoutMs])

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-[0.8125rem] font-medium text-secondary-foreground">
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
          className={cn(formFieldBase, formFieldSingleLine, "pr-11 font-mono text-[0.8125rem]")}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1 flex size-7 cursor-pointer items-center justify-center rounded-md",
            "[background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)]",
            "text-muted-foreground transition-colors duration-fast hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            copied && "text-success hover:text-success"
          )}
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
        </button>
      </div>
    </div>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

// feather:copy
function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </g>
    </svg>
  )
}

export { InputCopy }
export type { InputCopyProps }
