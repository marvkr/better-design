"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { Button, type ButtonProps } from "./button"

/*
 * Bevel CopyButton.
 *
 * A Button that copies a string and reports it. It adds no surface of its
 * own, so it inherits whichever Button variant the caller picks and stays the
 * same material as the row it sits in. The confirmation is the glyph swapping
 * to a check for two seconds, and the accessible name swaps with it so a
 * screen reader hears the same confirmation.
 */

/** Props for `CopyButton`; `value` is the text placed on the clipboard. */
export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
  value: string
  copiedLabel?: string
  label?: string
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      value,
      copiedLabel = "Copied",
      label = "Copy",
      size = "icon",
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false)
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current)
      },
      [],
    )

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 2000)
      } catch {
        /* Copying is best effort: a blocked clipboard should not throw here. */
      }
    }

    return (
      <Button
        ref={ref}
        size={size}
        onClick={copy}
        aria-label={copied ? copiedLabel : label}
        className={className}
        {...props}
      >
        <Icon
          icon={copied ? "solar:check-read-linear" : "solar:copy-linear"}
          className="size-[1.125rem]"
        />
        {size !== "icon" && <span>{copied ? copiedLabel : label}</span>}
      </Button>
    )
  },
)
CopyButton.displayName = "CopyButton"

export { CopyButton }
