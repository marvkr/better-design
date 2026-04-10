"use client"

import * as React from "react"
import { Check, X, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InlineEditProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  className?: string
  inputClassName?: string
}

function InlineEdit({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Click to edit…",
  disabled,
  readOnly,
  className,
  inputClassName,
}: InlineEditProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const displayValue = isControlled ? controlledValue : internalValue

  function startEdit() {
    if (disabled || readOnly) return
    setDraft(displayValue)
    setEditing(true)
    // Focus after render
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function confirm() {
    const trimmed = draft.trim()
    if (!isControlled) setInternalValue(trimmed)
    onValueChange?.(trimmed)
    setEditing(false)
  }

  function cancel() {
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "flex-1 min-w-0 rounded-[10px] border border-primary/60 bg-card px-3 py-1.5 text-sm text-foreground",
            "placeholder:text-muted-foreground/50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
            "transition-colors",
            inputClassName
          )}
          autoComplete="off"
        />
        <button
          type="button"
          aria-label="Confirm edit"
          onClick={confirm}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "transition-colors"
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Cancel edit"
          onClick={cancel}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
            "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "transition-colors"
          )}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div
      role={disabled || readOnly ? undefined : "button"}
      tabIndex={disabled || readOnly ? undefined : 0}
      aria-label={disabled || readOnly ? undefined : "Click to edit"}
      onClick={startEdit}
      onKeyDown={(e) => e.key === "Enter" && startEdit()}
      className={cn(
        "group inline-flex min-w-[120px] items-center gap-1.5 rounded-[10px] px-3 py-1.5",
        "border border-transparent transition-all duration-150",
        !disabled && !readOnly && [
          "cursor-pointer",
          "hover:border-border hover:bg-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        ],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span
        className={cn(
          "flex-1 text-sm min-w-0 truncate",
          displayValue ? "text-foreground" : "text-muted-foreground/50"
        )}
      >
        {displayValue || placeholder}
      </span>
      {!disabled && !readOnly && (
        <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

export { InlineEdit }
