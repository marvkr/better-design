"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

// Glassmorphic Dark Inline Edit: transparent by default, glass on edit

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
            "h-8 min-w-0 flex-1 px-2.5 text-sm",
            "rounded-full border border-white/10 backdrop-blur-xl bg-white/[0.06]",
            "shadow-[inset_0_0_6px_rgba(255,255,255,0.06)]",
            "text-white/90 placeholder:text-white/40",
            "focus-visible:outline-none focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.06),0_0_0_3px_oklch(0.65_0.19_250/0.2)] focus-visible:border-primary/50",
            "transition duration-200",
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={handleConfirm}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
        >
          <Icon icon="tabler:check" className="h-3.5 w-3.5" />
          <span className="sr-only">Confirm</span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 backdrop-blur-xl bg-white/[0.06] text-white/50 transition-colors hover:bg-white/[0.1] hover:text-white/80"
        >
          <Icon icon="tabler:x" className="h-3.5 w-3.5" />
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
        "group flex items-center gap-1.5 rounded-full px-1 py-0.5 text-sm",
        "text-white/80 transition-colors hover:bg-white/[0.06]",
        "focus-visible:outline-none focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.06),0_0_0_3px_oklch(0.65_0.19_250/0.2)]",
        disabled && "cursor-not-allowed opacity-60",
        !value && "text-white/40",
        className
      )}
    >
      <span className="min-w-0 truncate">
        {renderValue ? renderValue(value) : value || placeholder}
      </span>
      {!disabled && (
        <Icon
          icon="tabler:pencil"
          className="h-3.5 w-3.5 shrink-0 text-white/40 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </button>
  )
}

export { InlineEdit }
export type { InlineEditProps }
