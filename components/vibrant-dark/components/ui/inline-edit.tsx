"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, X, Pencil } from "lucide-react"

// Dynamic Inline Edit: click-to-edit with Dynamic-styled inputs and buttons

interface InlineEditProps {
  value: string
  onConfirm: (value: string) => void
  onCancel?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  renderValue?: (value: string) => React.ReactNode
}

function InlineEdit({ value, onConfirm, onCancel, placeholder = "Click to edit", disabled, className, renderValue }: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const handleConfirm = () => { onConfirm(draft); setEditing(false) }
  const handleCancel = () => { setDraft(value); setEditing(false); onCancel?.() }

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
            "h-9 min-w-0 flex-1 rounded-xl bg-secondary px-3 text-sm text-foreground",
            "placeholder:text-muted-foreground outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring",
            "transition-[background,box-shadow] duration-150"
          )}
        />
        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all active:scale-[0.97] hover:bg-primary/90"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all active:scale-[0.97] hover:bg-secondary/80 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => { if (!disabled) { setDraft(value); setEditing(true) } }}
      disabled={disabled}
      className={cn(
        "group flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm transition-all duration-150",
        "hover:bg-secondary active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "cursor-not-allowed opacity-60",
        !value && "text-muted-foreground",
        className
      )}
    >
      <span className="min-w-0 truncate">{renderValue ? renderValue(value) : value || placeholder}</span>
      {!disabled && (
        <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  )
}

export { InlineEdit }
export type { InlineEditProps }
