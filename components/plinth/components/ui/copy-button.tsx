"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string
  copiedLabel?: string
  label?: string
}

/* A graphite tool button that copies a value; the copy glyph turns into an
   ember check for two seconds once the value is on the clipboard. */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, copiedLabel = "Copied", label = "Copy", size = "icon", variant = "secondary", onClick, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
      if (!copied) return
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }, [copied])

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
      } catch {
        // The clipboard can refuse in an insecure context; the label stays as it was.
      }
    }

    const isIcon = size === "icon" || size === "icon-sm"

    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        onClick={(event) => {
          onClick?.(event)
          void copy()
        }}
        aria-label={copied ? copiedLabel : label}
        {...props}
      >
        {copied ? <CheckIcon className={cn("text-primary")} /> : <CopyIcon />}
        {!isIcon && <span aria-live="polite">{copied ? copiedLabel : label}</span>}
      </Button>
    )
  }
)
CopyButton.displayName = "CopyButton"

// feather:copy
function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="13" height="13" x="9" y="9" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></g>
    </svg>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export { CopyButton }
