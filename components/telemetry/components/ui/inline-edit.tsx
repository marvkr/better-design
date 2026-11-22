"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Control Room InlineEdit: setpoint field. Reads as plain text until
// engaged, then becomes a recessed instrument well with confirm/cancel
// keys in the console plate materials.

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
            "h-8 min-w-0 flex-1 px-2.5",
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground [box-shadow:var(--shadow-control)] transition-all hover:[box-shadow:var(--shadow-control-hover)]"
        >
          <Icon icon="tabler:check" className="size-3.5" />
          <span className="sr-only">Confirm</span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-secondary text-muted-foreground transition-colors hover:text-destructive"
        >
          <Icon icon="tabler:x" className="size-3.5" />
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
        "group flex items-center gap-1.5 rounded-xs px-1 py-0.5 text-sm",
        "text-foreground transition-colors hover:bg-accent/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        disabled && "cursor-not-allowed opacity-60",
        !value && "text-muted-foreground",
        className
      )}
    >
      <span className="min-w-0 truncate">
        {renderValue ? renderValue(value) : value || placeholder}
      </span>
      {!disabled && (
        <Icon
          icon="tabler:pencil"
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </button>
  )
}

export { InlineEdit }
export type { InlineEditProps }
