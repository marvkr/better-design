"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

/*
 * Drag-and-drop upload: a recessed velvet well with a dashed hairline;
 * the upload glyph sits on a small raised velour chip.
 */

interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string
  multiple?: boolean
  onFileChange?: (files: File[]) => void
  disabled?: boolean
  maxSize?: number // in bytes
}

function FileInput({
  accept,
  multiple,
  onFileChange,
  disabled,
  maxSize,
  className,
  ...props
}: FileInputProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: File[]) => {
    const filtered = maxSize
      ? newFiles.filter((f) => f.size <= maxSize)
      : newFiles
    const updated = multiple ? [...files, ...filtered] : filtered
    setFiles(updated)
    onFileChange?.(updated)
  }

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    onFileChange?.(updated)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label="Upload a file: click, or press Enter or Space, or drag and drop"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => { e.preventDefault(); !disabled && setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (!disabled) {
            handleFiles(Array.from(e.dataTransfer.files))
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 p-8",
          "rounded-xl border border-dashed border-border bg-input [box-shadow:var(--shadow-inset)]",
          "transition-[border-color,background-color] duration-base",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          isDragging && "border-ring/60 bg-primary/5",
          !isDragging && "hover:border-ring/30",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg [background-image:var(--velour-raised)] [box-shadow:var(--shadow-button)]">
          <Icon icon="tabler:upload" className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground/85">
            Click to upload or drag and drop
          </p>
          {accept && (
            <p className="mt-0.5 text-xs text-muted-foreground">{accept}</p>
          )}
          {maxSize && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Max {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg px-3 py-2 [background-image:var(--velour)] [box-shadow:var(--shadow-s)]"
            >
              <Icon icon="tabler:file-text" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-muted-foreground transition-colors duration-fast hover:text-foreground"
              >
                <Icon icon="tabler:x" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { FileInput }
export type { FileInputProps }
