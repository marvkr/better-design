"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe FileInput: drag-drop upload with dashed border, card bg file list
// Monochromatic: dashed border is subtle, file chips are secondary bg

export interface FileInputProps {
  accept?: string
  multiple?: boolean
  value?: File[]
  onChange?: (files: File[]) => void
  maxSize?: number // bytes
  className?: string
  disabled?: boolean
}

function FileInput({
  accept,
  multiple = false,
  value,
  onChange,
  maxSize,
  className,
  disabled = false,
}: FileInputProps) {
  const [files, setFiles] = React.useState<File[]>(value ?? [])
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const controlled = value !== undefined
  const current = controlled ? value : files

  const processFiles = (incoming: FileList | null) => {
    if (!incoming) return
    let list = Array.from(incoming)
    if (maxSize) {
      list = list.filter((f) => f.size <= maxSize)
    }
    const next = multiple ? [...current, ...list] : list.slice(0, 1)
    if (!controlled) setFiles(next)
    onChange?.(next)
  }

  const removeFile = (index: number) => {
    const next = current.filter((_, i) => i !== index)
    if (!controlled) setFiles(next)
    onChange?.(next)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Drop zone */}
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled) processFiles(e.dataTransfer.files)
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl",
          "border border-dashed border-border bg-card px-6 py-10",
          "text-center transition-colors duration-200 cursor-pointer",
          dragging && "border-primary/40 bg-primary/5",
          disabled && "cursor-not-allowed opacity-40",
          !disabled && "hover:border-border/80 hover:bg-muted"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground tracking-wide">
            Drop files here or{" "}
            <span className="underline underline-offset-2">browse</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {accept ? `Accepts: ${accept}` : "Any file type"}
            {maxSize && ` · Max ${formatSize(maxSize)}`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => processFiles(e.target.files)}
          className="sr-only"
        />
      </div>

      {/* File list */}
      {current.length > 0 && (
        <ul className="flex flex-col gap-2">
          {current.map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary px-4 py-2.5"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-muted-foreground"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
                <span className="truncate text-sm text-foreground tracking-wide">
                  {file.name}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatSize(file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${file.name}`}
                  className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileInput }
