"use client"

import * as React from "react"
import { Check, Pencil, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Leather Luxe Inline Edit: flat text at rest; editing opens a recessed
// well with leather confirm and raised cancel coins.

interface InlineEditProps {
  value: string
  onConfirm: (value: string) => void
  onCancel?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  renderValue?: (value: string) => React.ReactNode
}

function InlineEdit({
  value,
  onConfirm,
  onCancel,
  placeholder = "Click to edit",
  disabled,
  className,
  inputClassName,
  renderValue,
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  React.useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const handleEdit = () => {
    if (disabled) return
    setDraft(value)
    setEditing(true)
  }

  const handleConfirm = () => {
    onConfirm(draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(value)
    setEditing(false)
    onCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConfirm()
    if (e.key === "Escape") handleCancel()
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
            formFieldBase,
            "h-8 min-w-0 flex-1 px-2.5 py-1 text-sm",
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={handleConfirm}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full",
            "[background-image:var(--gradient-leather)] text-primary-foreground",
            "border border-[oklch(0.68_0.115_58/0.55)]",
            "[box-shadow:var(--shadow-leather-sm)]",
            "transition-[filter] hover:brightness-110"
          )}
        >
          <Check className="h-3.5 w-3.5" />
          <span className="sr-only">Confirm</span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full",
            "[background-image:var(--gradient-raised)] border border-highlight",
            "[box-shadow:var(--shadow-raised-sm)]",
            "text-muted-foreground transition-[filter,color]",
            "hover:brightness-125 hover:text-foreground"
          )}
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Cancel</span>
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleEdit}
      disabled={disabled}
      className={cn(
        "group flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-sm",
        "text-foreground/90 transition-colors hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        disabled && "cursor-not-allowed opacity-60",
        !value && "text-muted-foreground/70",
        className
      )}
    >
      <span className="min-w-0 truncate">
        {renderValue ? renderValue(value) : value || placeholder}
      </span>
      {!disabled && (
        <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  )
}

export { InlineEdit }
export type { InlineEditProps }
