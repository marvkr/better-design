"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Midnight Glass File Input: glass drag-and-drop file upload

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
        onClick={() => !disabled && inputRef.current?.click()}
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
          "rounded-2xl border border-dashed border-white/[0.08] backdrop-blur-xl bg-white/[0.03]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
          "transition duration-300 cursor-pointer",
          isDragging && "border-primary bg-primary/[0.08]",
          !isDragging && "hover:bg-white/[0.05] hover:border-white/[0.12]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-md bg-white/[0.07] border border-white/[0.08]">
          <Icon icon="tabler:upload" className="h-5 w-5 text-white/50" />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-medium text-white/80">
            Click to upload or drag and drop
          </p>
          {accept && (
            <p className="mt-0.5 text-xs text-white/40">{accept}</p>
          )}
          {maxSize && (
            <p className="mt-0.5 text-xs text-white/40">
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
              className="flex items-center gap-3 rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05] px-5 py-2 shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]"
            >
              <Icon icon="tabler:file-text" className="h-4 w-4 shrink-0 text-white/40" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-[15px] text-white/90">{file.name}</p>
                <p className="text-xs text-white/40">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-white/40 hover:text-white/80"
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
