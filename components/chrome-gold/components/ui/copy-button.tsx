"use client"

import * as React from "react"

import { Button, type ButtonProps } from "./button"

/*
 * Chrome Azure Copy Button — a raised metal chip that flips its glyph to an
 * azure check once the value lands on the clipboard.
 */

export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string
  copiedLabel?: string
  label?: string
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, copiedLabel = "Copied", label = "Copy", size = "icon", onClick, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Silent fail — copy is best-effort
      }
    }

    return (
      <Button
        ref={ref}
        size={size}
        onClick={(e) => { onClick?.(e); copy(); }}
        aria-label={copied ? copiedLabel : label}
        {...props}
      >
        {copied ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-primary"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
        {size !== "icon" && <span className="ml-2">{copied ? copiedLabel : label}</span>}
      </Button>
    )
  }
)
CopyButton.displayName = "CopyButton"

export { CopyButton }
