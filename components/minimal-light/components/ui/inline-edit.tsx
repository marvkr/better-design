"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe InlineEdit: click-to-edit text — renders as readable text until clicked
// Confirm (Enter/checkmark) saves; Cancel (Escape/x) reverts
// Monochromatic: clean text-only view, secondary bg input on edit mode

export interface InlineEditProps {
  value: string
  onChange?: (value: string) => void
  onConfirm?: (value: string) => void
  onCancel?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  renderText?: (value: string) => React.ReactNode
}

function InlineEdit({
  value,
  onChange,
  onConfirm,
  onCancel,
  placeholder = "Click to edit…",
  disabled = false,
  className,
  inputClassName,
  renderText,
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  // Keep draft in sync if controlled value changes externally
  React.useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  const confirm = () => {
    setEditing(false)
    onChange?.(draft)
    onConfirm?.(draft)
  }

  const cancel = () => {
    setEditing(false)
    setDraft(value)
    onCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      confirm()
    } else if (e.key === "Escape") {
      e.preventDefault()
      cancel()
    }
  }

  if (editing) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={confirm}
          placeholder={placeholder}
          className={cn(
            "flex h-8 min-w-0 flex-1 rounded-lg border border-border bg-secondary px-3 py-1 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary/30",
            "transition-colors duration-200",
            inputClassName
          )}
        />
        {/* Confirm */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); confirm() }}
          aria-label="Confirm edit"
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            "bg-primary text-primary-foreground",
            "transition-all duration-200 hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "active:scale-[0.96]"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
        {/* Cancel */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); cancel() }}
          aria-label="Cancel edit"
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            "border border-border bg-secondary text-muted-foreground",
            "transition-all duration-200 hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "active:scale-[0.96]"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => !disabled && setEditing(true)}
      disabled={disabled}
      aria-label="Click to edit"
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg text-sm",
        "text-foreground tracking-wide transition-colors duration-200",
        "hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-lg",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      <span className={cn(!value && "text-muted-foreground")}>
        {renderText ? renderText(value) : (value || placeholder)}
      </span>
      {!disabled && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      )}
    </button>
  )
}

export { InlineEdit }
