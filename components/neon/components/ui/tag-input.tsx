"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// neon Tag Input: dark well for adding/removing tags. The outer well
// reuses the shared form-field surface (inset shadow + neon focus-within glow);
// tags render as secondary pills with a lucide remove button.

interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
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
        "flex min-h-9 w-full flex-wrap gap-1.5 rounded-[0.625rem] px-3 py-2",
        "bg-input border border-border",
        "[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]",
        "transition-[border-color,box-shadow] duration-fast",
        "focus-within:border-[oklch(0.86_0.22_145_/_0.6)]",
        "focus-within:[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4),0_0_0_0.1875rem_oklch(0.86_0.22_145_/_0.18),0_0.25rem_0.875rem_-0.25rem_oklch(0.86_0.22_145_/_0.22)]",
        "cursor-text",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
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
        className="flex-1 min-w-[7.5rem] bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  )
}

export { TagInput }
export type { TagInputProps }
