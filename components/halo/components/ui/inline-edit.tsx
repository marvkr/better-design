"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

// Halo Inline Edit: transparent by default, translucent on edit

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
            "h-8 min-w-0 flex-1 px-2.5 text-sm",
            "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
            "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
            "text-foreground/90 placeholder:text-foreground/40",
            "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-visible:border-primary/50",
            "transition duration-base",
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
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06] text-foreground/50 transition-colors hover:bg-foreground/[0.1] hover:text-foreground/80"
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
        "text-foreground/80 transition-colors hover:bg-foreground/[0.06]",
        "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)]",
        disabled && "cursor-not-allowed opacity-60",
        !value && "text-foreground/40",
        className
      )}
    >
      <span className="min-w-0 truncate">
        {renderValue ? renderValue(value) : value || placeholder}
      </span>
      {!disabled && (
        <Icon
          icon="tabler:pencil"
          className="h-3.5 w-3.5 shrink-0 text-foreground/40 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </button>
  )
}

export { InlineEdit }
export type { InlineEditProps }
