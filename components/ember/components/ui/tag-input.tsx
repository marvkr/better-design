"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass TagInput: recessed well that collects glass chips.

interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ className, value, onChange, placeholder = "Add tag...", maxTags, disabled, ...props }, ref) => {
    const [internal, setInternal] = React.useState<string[]>(value ?? [])
    const [draft, setDraft] = React.useState("")
    const tags = value ?? internal

    const commit = (next: string[]) => {
      setInternal(next)
      onChange?.(next)
    }

    const addTag = () => {
      const tag = draft.trim()
      if (!tag || tags.includes(tag)) return
      if (maxTags && tags.length >= maxTags) return
      commit([...tags, tag])
      setDraft("")
    }

    const removeTag = (tag: string) => {
      commit(tags.filter((t) => t !== tag))
    }

    return (
      <div
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg px-2 py-1.5",
          formFieldBase,
          "focus-within:border-[color:oklch(0.69_0.195_42/0.55)] focus-within:ring-2 focus-within:ring-ring/35",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-[var(--ag-fill-hover)] border border-[color:var(--ag-border)] px-2 py-0.5 text-xs font-semibold"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => removeTag(tag)}
              className="rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/60"
            >
              <Icon icon="tabler:x" className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={ref}
          className="min-w-[5rem] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          value={draft}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault()
              addTag()
            } else if (e.key === "Backspace" && !draft && tags.length > 0) {
              removeTag(tags[tags.length - 1])
            }
          }}
          {...props}
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

export { TagInput }
export type { TagInputProps }
