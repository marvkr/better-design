import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  filename?: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language, showLineNumbers = false, filename, className, ...props }, ref) => {
    const lines = code.split("\n")

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl border border-border bg-secondary overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Header */}
        {(filename || language) && (
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/80">
            <div className="flex items-center gap-2">
              {filename && (
                <span className="text-xs font-medium text-foreground">{filename}</span>
              )}
              {language && (
                <span className="text-xs text-muted-foreground">{language}</span>
              )}
            </div>
          </div>
        )}

        {/* Copy button */}
        <div className="absolute top-2.5 right-3 z-10">
          <CopyButton value={code} />
        </div>

        {/* Code */}
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm font-mono text-foreground leading-relaxed">
            {showLineNumbers ? (
              <code>
                {lines.map((line, i) => (
                  <span key={i} className="table-row">
                    <span className="table-cell pr-4 select-none text-muted-foreground text-right w-6">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </span>
                ))}
              </code>
            ) : (
              <code>{code}</code>
            )}
          </pre>
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
