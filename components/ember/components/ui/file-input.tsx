"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass FileInput: dashed glass drop zone that warms up on drag-over.

interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string
  multiple?: boolean
  onFileChange?: (files: File[]) => void
  disabled?: boolean
  maxSize?: number // in bytes
}

const FileInput = React.forwardRef<HTMLDivElement, FileInputProps>(
  (
    { className, accept, multiple, onFileChange, disabled, maxSize, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [dragging, setDragging] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])

    const handleFiles = (list: FileList | null) => {
      if (!list) return
      let next = Array.from(list)
      if (maxSize) next = next.filter((f) => f.size <= maxSize)
      setFiles(next)
      onFileChange?.(next)
    }

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled) handleFiles(e.dataTransfer.files)
        }}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl px-6 py-8 text-center",
          "border border-dashed border-[color:var(--ag-border-strong)]",
          "bg-[var(--ag-fill)] backdrop-blur-[var(--ag-blur)]",
          "transition-all duration-fast ease-out",
          "hover:bg-[var(--ag-fill-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          dragging &&
            "border-[color:oklch(0.69_0.195_42/0.6)] bg-[oklch(0.69_0.195_42/0.06)] shadow-[0_0_1.5rem_oklch(0.69_0.195_42/0.2)]",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ag-fill)] border border-[color:var(--ag-border)]">
          <Icon icon="tabler:upload" className="h-5 w-5 text-primary" />
        </span>
        <div className="text-sm font-semibold">
          {files.length > 0
            ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
            : "Drop files here or click to browse"}
        </div>
        <p className="text-xs text-muted-foreground">
          {accept ? `Accepts ${accept}` : "Any file type"}
          {maxSize ? `, up to ${Math.round(maxSize / 1024 / 1024)}MB` : ""}
        </p>
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
export type { FileInputProps }
