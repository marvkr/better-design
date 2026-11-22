"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

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
 * Cream editorial FileInput: a paper drop zone behind a dashed warm line,
 * with an oat disc holding the upload icon. Dragging a file over it washes
 * the zone in pale terracotta and turns the line terracotta; the chosen
 * file's name replaces the prompt.
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
          "group flex w-full cursor-pointer flex-col items-center justify-center gap-3 px-4 py-8 text-center",
          "rounded-xl border border-dashed border-(--line-strong) bg-(--field)",
          "transition-[background-color,border-color] duration-fast ease-out",
          "hover:border-(--control) hover:bg-secondary",
          "data-[dragging]:border-(--primary-line) data-[dragging]:bg-(--primary-wash)",
          "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-(--line-strong) has-[:disabled]:bg-secondary",
          className,
        )}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-muted text-(--foreground-secondary) group-has-[:disabled]:text-(--foreground-disabled)">
          <Icon icon="ph:upload-simple" className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-foreground group-has-[:disabled]:text-(--foreground-disabled)">
          {fileName ?? label}
        </span>
        {helperText && (
          <span className="text-sm text-muted-foreground group-has-[:disabled]:text-(--foreground-disabled)">
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
