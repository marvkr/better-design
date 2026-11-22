"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel InputCopy.
 *
 * A read-only field for a key or a link, with one raised button parked in
 * its right gutter. The button uses the secondary button surface, so a
 * raised control sits inside a pressed well. Copying crossfades the glyph to
 * a check for a moment, which is the only feedback a one-tap action needs.
 */

/** Props for `InputCopy`; the value is read-only and selected on focus. */
interface InputCopyProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
  > {
  value: string
  label?: React.ReactNode
  /** How long the copied check stays up, in milliseconds. Default 1800. */
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
      // The clipboard can be unavailable on an insecure page or without
      // permission. Stay quiet: the value is still selectable by hand.
    }
  }, [value])

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), copiedTimeoutMs)
    return () => clearTimeout(t)
  }, [copied, copiedTimeoutMs])

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] text-[var(--strong)]"
        >
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
            formFieldBase,
            formFieldSingleLine,
            "pr-11 text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1.5 flex size-7 items-center justify-center rounded-[0.5rem]",
            "bg-card text-[var(--strong)] [box-shadow:var(--shadow-button)]",
            "transition-[box-shadow,transform,color] duration-fast ease-out",
            "hover:[box-shadow:var(--shadow-button-hover)]",
            "active:translate-y-px",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <span className="relative flex size-4 items-center justify-center">
            <Icon
              icon="solar:copy-linear"
              aria-hidden
              className={cn(
                "absolute size-4 transition-[opacity,transform] duration-fast ease-out",
                copied ? "scale-75 opacity-0" : "scale-100 opacity-100",
              )}
            />
            <Icon
              icon="solar:check-read-linear"
              aria-hidden
              className={cn(
                "absolute size-4 text-primary transition-[opacity,transform] duration-fast ease-out",
                copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
              )}
            />
          </span>
        </button>
      </div>
    </div>
  )
}

export { InputCopy }
export type { InputCopyProps }
