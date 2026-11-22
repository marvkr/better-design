"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel InlineEdit.
 *
 * At rest the value is plain text in a row, with a pencil that fades in on
 * hover, so a settings screen stays quiet until you reach for it. Tapping the
 * row swaps the text for the system's field, the same pressed well every other
 * input uses. Enter commits, Escape restores the value you started with, and
 * moving focus away commits as well.
 */

/** Props for `InlineEdit`; `displayClassName` styles the resting row only. */
export interface InlineEditProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
  displayClassName?: string
  disabled?: boolean
}

const InlineEdit = React.forwardRef<HTMLInputElement, InlineEditProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Tap to edit",
      className,
      displayClassName,
      disabled,
    },
    ref,
  ) => {
    const [editing, setEditing] = React.useState(false)
    const [draft, setDraft] = React.useState(value)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // SAFETY: the handle is read only after mount, when the element this
    // component renders is attached, so the ref is non-null.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    React.useEffect(() => {
      if (editing) inputRef.current?.focus()
    }, [editing])

    const commit = () => {
      onValueChange(draft)
      setEditing(false)
    }

    const cancel = () => {
      setDraft(value)
      setEditing(false)
    }

    if (editing) {
      return (
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit()
            else if (event.key === "Escape") cancel()
          }}
          placeholder={placeholder}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "text-[0.9063rem] tracking-[0.0188rem]",
            className,
          )}
        />
      )
    }

    return (
      <button
        type="button"
        onClick={() => !disabled && setEditing(true)}
        disabled={disabled}
        className={cn(
          "group inline-flex items-center gap-2 rounded-[0.75rem] px-3 py-2 text-left",
          "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-foreground",
          "transition-colors duration-fast ease-out",
          "hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          displayClassName,
        )}
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <Icon
          icon="solar:pen-2-linear"
          className="size-[0.9375rem] shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast ease-out group-hover:opacity-100"
        />
      </button>
    )
  },
)
InlineEdit.displayName = "InlineEdit"

export { InlineEdit }
