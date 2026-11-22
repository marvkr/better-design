"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel CodeBlock.
 *
 * Code sits in a well pressed into the card, the same inner surface a row or
 * a quote uses, so a snippet reads as part of the card rather than a second
 * card stacked on it. The filename strip is separated by one pixel of the
 * track token, and the copy control is a small chip that carries the button's
 * own shadow.
 */

/** Props for `CodeBlock`; `code` is the raw text the copy control writes out. */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
  filename?: string
  showCopy?: boolean
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, filename, showCopy = true, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Copy is best effort, so a blocked clipboard stays silent.
      }
    }

    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-[0.875rem]",
          "bg-[var(--inner)] text-[var(--inner-foreground)]",
          "[box-shadow:var(--shadow-inset)]",
          // The consumer's className lands on this wrapper, so CodeTabs can
          // flatten the well and avoid a second box inside its own panel.
          className,
        )}
      >
        {(filename || language) && (
          <>
            <div className="flex items-center justify-between px-3.5 py-2.5">
              <div className="flex items-center gap-2 text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
                {filename && <span className="font-mono">{filename}</span>}
                {language && !filename && (
                  <span className="font-mono uppercase">{language}</span>
                )}
              </div>
            </div>
            <div className="h-px w-full bg-[var(--track)]" aria-hidden />
          </>
        )}
        <div className="relative">
          <pre
            ref={ref}
            className={cn(
              "overflow-x-auto p-3.5 font-mono text-[0.7813rem] leading-[1.1875rem] text-foreground",
            )}
            {...props}
          >
            <code>{code}</code>
          </pre>
          {showCopy && (
            <button
              type="button"
              onClick={copy}
              className={cn(
                "absolute top-2.5 right-2.5 inline-flex size-[1.875rem] items-center justify-center rounded-[0.5rem]",
                "bg-card text-muted-foreground",
                "[box-shadow:var(--shadow-button)]",
                "transition-[opacity,color,box-shadow] duration-fast ease-out",
                "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                "hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={copied ? "Copied" : "Copy code"}
            >
              <Icon
                icon={copied ? "solar:check-read-linear" : "solar:copy-linear"}
                className="size-4"
              />
            </button>
          )}
        </div>
      </div>
    )
  },
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
