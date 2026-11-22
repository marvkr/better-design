"use client"

import * as React from "react"
import { Check, Pencil, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/* InlineEdit — click-to-edit; editing swaps in a recessed well with keys. */

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
            "h-8 min-w-0 flex-1 rounded-sm px-2.5",
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-7 w-7 items-center justify-center rounded-sm text-primary-foreground [background-image:var(--cobalt)] [box-shadow:var(--shadow-primary)] transition-[background-image] hover:[background-image:var(--cobalt-hover)]"
        >
          <Check className="h-3.5 w-3.5" />
          <span className="sr-only">Confirm</span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-border text-muted-foreground [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)] transition-colors hover:text-foreground"
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
        "group flex items-center gap-1.5 rounded-sm px-1 py-0.5 text-sm text-foreground",
        "transition-colors hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        disabled && "cursor-not-allowed opacity-60",
        !value && "text-muted-foreground",
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
