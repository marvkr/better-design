"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo File Input: translucent drag-and-drop file upload

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
          "flex flex-col items-center justify-center gap-3 p-8",
          "rounded-2xl border border-dashed border-border backdrop-blur-xl bg-foreground/[0.04]",
          "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
          "transition duration-base cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
          isDragging && "border-primary bg-primary/[0.08]",
          !isDragging && "hover:bg-foreground/[0.06] hover:border-foreground/[0.15]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md bg-foreground/[0.08] border border-border">
          <Icon icon="tabler:upload" className="h-5 w-5 text-foreground/50" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground/80">
            Click to upload or drag and drop
          </p>
          {accept && (
            <p className="mt-0.5 text-xs text-foreground/40">{accept}</p>
          )}
          {maxSize && (
            <p className="mt-0.5 text-xs text-foreground/40">
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
              className="flex items-center gap-3 rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06] px-3 py-2 shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]"
            >
              <Icon icon="tabler:file-text" className="h-4 w-4 shrink-0 text-foreground/40" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm text-foreground/90">{file.name}</p>
                <p className="text-xs text-foreground/40">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-foreground/40 hover:text-foreground/80"
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
