"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass InlineEdit: click-to-edit text that swaps into a recessed well.

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
  placeholder = "Enter a value",
  disabled,
  className,
  inputClassName,
  renderValue,
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

  const confirm = () => {
    setEditing(false)
    if (draft !== value) onConfirm(draft)
  }

  const cancel = () => {
    setEditing(false)
    setDraft(value)
    onCancel?.()
  }

  if (editing) {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <input
          ref={inputRef}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirm()
            if (e.key === "Escape") cancel()
          }}
          className={cn(
            "h-8 rounded-lg px-2.5 text-sm",
            formFieldBase,
            "w-auto min-w-[10rem]",
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={confirm}
          aria-label="Confirm"
          className="rounded-md p-1 text-primary transition-colors hover:bg-[var(--ag-fill)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Icon icon="tabler:check" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={cancel}
          aria-label="Cancel"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Icon icon="tabler:x" className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setEditing(true)}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium",
        "transition-colors hover:bg-[var(--ag-fill)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {renderValue ? renderValue(value) : value || (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
      <Icon
        icon="tabler:pencil"
        className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
      />
    </button>
  )
}

export { InlineEdit }
export type { InlineEditProps }
