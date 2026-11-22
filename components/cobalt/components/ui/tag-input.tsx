"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/* TagInput — tags are tiny raised bezel chips floating inside the well. */

interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}

function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  maxTags,
  className,
  disabled,
  ...props
}: TagInputProps) {
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !value.includes(trimmed) && (!maxTags || value.length < maxTags)) {
      onChange?.([...value, trimmed])
      setInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div
      className={cn(
        formFieldBase,
        "flex min-h-9 cursor-text flex-wrap items-center gap-1.5 rounded-md py-1.5",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium text-foreground",
            "border border-border [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]"
          )}
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              aria-label={`Remove ${tag}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 ? placeholder : undefined}
        disabled={disabled || (maxTags !== undefined && value.length >= maxTags)}
        className="min-w-28 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  )
}

export { TagInput }
export type { TagInputProps }
