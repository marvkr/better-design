"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { siennaGrainStyle } from "./_shared"

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
        // Silent fail — copy is best-effort
      }
    }

    return (
      <div
        style={siennaGrainStyle}
        className={cn(
          "relative group rounded-xl overflow-hidden",
          "bg-card border border-border [box-shadow:var(--shadow-s)]",
          // Consumer className targets the wrapper so CodeTabs can strip the
          // inner border/radius (rounded-none border-0) and avoid a nested
          // "box in a box" double border.
          className
        )}
      >
        {(filename || language) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {filename && <span className="font-mono">{filename}</span>}
              {language && !filename && (
                <span className="font-mono uppercase tracking-wider">{language}</span>
              )}
            </div>
          </div>
        )}
        <div className="relative">
          <pre
            ref={ref}
            className={cn(
              "overflow-x-auto p-4 text-xs leading-relaxed font-mono text-foreground"
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
                "absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-lg",
                "bg-popover text-muted-foreground border border-border",
                "transition-[opacity,background-color,color,box-shadow] duration-fast",
                "opacity-0 group-hover:opacity-100",
                "[box-shadow:var(--shadow-s)]",
                "hover:text-foreground hover:bg-accent hover:[box-shadow:var(--shadow-m)]",
                "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/40"
              )}
              aria-label={copied ? "Copied" : "Copy code"}
            >
              <Icon icon={copied ? "ph:check-bold" : "ph:copy"} className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
