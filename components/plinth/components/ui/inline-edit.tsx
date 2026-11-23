"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * Plinth Inline Edit: a value that turns into a recessed field when
 * clicked, with an ember confirm and a graphite cancel beside it.
 */

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

  const startEditing = () => {
    if (disabled) return
    setDraft(value)
    setEditing(true)
  }

  const confirm = () => {
    onConfirm(draft)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
    onCancel?.()
  }

  if (editing) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirm()
            if (e.key === "Escape") cancel()
          }}
          placeholder={placeholder}
          aria-label={placeholder}
          className={cn(formFieldBase, "h-8 min-w-0 flex-1 rounded-md px-2.5", inputClassName)}
        />
        <button
          type="button"
          onClick={confirm}
          aria-label="Save"
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-primary-foreground [background:var(--ember-gradient)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4),0_0_0_0.0625rem_var(--ember-rim)] transition-[filter] duration-fast hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <CheckIcon className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={cancel}
          aria-label="Cancel"
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-secondary-foreground [background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)] transition-[box-shadow] duration-fast hover:[box-shadow:var(--shadow-button-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      disabled={disabled}
      className={cn(
        "group flex items-center gap-2 rounded-md px-1.5 py-1 text-sm text-foreground",
        "transition-colors duration-fast hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "cursor-not-allowed opacity-50",
        !value && "text-muted-foreground",
        className
      )}
    >
      <span className="min-w-0 truncate">{renderValue ? renderValue(value) : value || placeholder}</span>
      {!disabled && (
        <EditIcon className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100" />
      )}
    </button>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

// feather:x
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

// feather:edit-2
function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5z" />
    </svg>
  )
}

export { InlineEdit }
export type { InlineEditProps }
