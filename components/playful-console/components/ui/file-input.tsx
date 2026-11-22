"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/** Props for FileInput: a file input with a prompt label and an optional hint. */
export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

/** Names the picked files: one file by its name, several by their count. */
function describeFiles(files: FileList | null): string | null {
  if (!files || files.length === 0) return null;
  return files.length === 1 ? files[0].name : `${files.length} files`;
}

/**
 * Playful console FileInput: a white drop zone behind a dashed olive edge,
 * with the upload icon on a small orange key. Dragging a file over it washes
 * the zone in orange and turns the edge to the orange rim; the chosen file's
 * name replaces the prompt in mono type.
 */
const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      label = "Choose a file or drop it here",
      helperText,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [dragging, setDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // SAFETY: inputRef is attached to the input this component always renders,
    // so it is set by the time a parent can reach the handle.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDragging(false);
      const input = inputRef.current;
      if (disabled || !input || event.dataTransfer.files.length === 0) return;
      input.files = event.dataTransfer.files;
      // React listens for the native change event, so onChange runs as if
      // the person had picked the files from the dialog.
      input.dispatchEvent(new Event("change", { bubbles: true }));
    };

    return (
      <label
        data-slot="file-input"
        data-dragging={dragging || undefined}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "group flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 px-4 py-7 text-center",
          "rounded-lg border-[0.09375rem] border-dashed border-(--line-strong) bg-(--field)",
          "transition-[background-color,border-color] duration-fast ease-out",
          "hover:border-(--control) hover:bg-card",
          "data-[dragging]:border-(--primary-rim) data-[dragging]:bg-(--primary-wash)",
          "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-(--line-strong) has-[:disabled]:bg-secondary",
          className,
        )}
      >
        <span className="flex size-9 items-center justify-center rounded-[0.5rem] border-[0.09375rem] border-(--primary-rim) bg-primary text-primary-foreground shadow-(--shadow-control) group-has-[:disabled]:border-(--line-strong) group-has-[:disabled]:bg-secondary group-has-[:disabled]:text-(--foreground-disabled) group-has-[:disabled]:shadow-none">
          <Icon icon="ph:upload-simple-bold" className="size-4.5" aria-hidden="true" />
        </span>
        <span
          className={cn(
            "text-sm font-bold text-foreground group-has-[:disabled]:text-(--foreground-disabled)",
            fileName && "font-mono font-semibold",
          )}
        >
          {fileName ?? label}
        </span>
        {helperText && (
          <span className="text-[0.8125rem] text-muted-foreground group-has-[:disabled]:text-(--foreground-disabled)">
            {helperText}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          disabled={disabled}
          onChange={(event) => {
            setFileName(describeFiles(event.target.files));
            onChange?.(event);
          }}
          {...props}
        />
      </label>
    );
  },
);
FileInput.displayName = "FileInput";

export { FileInput };
