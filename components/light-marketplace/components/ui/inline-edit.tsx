"use client"

import * as React from "react"
import { Check, X, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InlineEditProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  as?: "input" | "textarea"
}

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  (
    {
      value: controlledValue,
      onValueChange,
      placeholder = "Click to edit…",
      disabled = false,
      className,
      inputClassName,
      as = "input",
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(controlledValue ?? "")
    const [draft, setDraft] = React.useState(controlledValue ?? "")
    const inputRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null)

    const value = controlledValue ?? internalValue

    React.useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }, [isEditing])

    const handleEdit = () => {
      if (disabled) return
      setDraft(value)
      setIsEditing(true)
    }

    const handleConfirm = () => {
      setInternalValue(draft)
      onValueChange?.(draft)
      setIsEditing(false)
    }

    const handleCancel = () => {
      setDraft(value)
      setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && as === "input") {
        e.preventDefault()
        handleConfirm()
      } else if (e.key === "Escape") {
        e.preventDefault()
        handleCancel()
      }
    }

    const sharedInputClass = cn(
      "w-full rounded-xl border-2 border-ring bg-background px-3 py-2 text-sm text-foreground",
      "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-0 transition-colors",
      "placeholder:text-muted-foreground",
      inputClassName
    )

    if (isEditing) {
      return (
        <div ref={ref} className={cn("flex items-start gap-1.5", className)}>
          {as === "textarea" ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={3}
              className={cn(sharedInputClass, "resize-none")}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(sharedInputClass, "h-9")}
            />
          )}
          <div className="flex shrink-0 flex-col gap-1 pt-0.5">
            <button
              type="button"
              onClick={handleConfirm}
              aria-label="Confirm"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              )}
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              aria-label="Cancel"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg bg-secondary border border-border text-muted-foreground",
                "hover:bg-accent hover:text-foreground transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              )}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("group inline-flex items-center gap-1.5", className)}>
        <button
          type="button"
          onClick={handleEdit}
          disabled={disabled}
          aria-label="Edit"
          className={cn(
            "text-sm text-left text-foreground rounded-lg px-1 -mx-1 py-0.5",
            "hover:bg-secondary transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-muted-foreground",
          )}
        >
          {value || placeholder}
        </button>
        {!disabled && (
          <Pencil
            className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-hidden="true"
            onClick={handleEdit}
          />
        )}
      </div>
    )
  }
)
InlineEdit.displayName = "InlineEdit"

export { InlineEdit }
