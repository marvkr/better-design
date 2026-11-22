/*
 * Copyright (c) 2025 Keenthemes Inc. MIT License, from https://github.com/keenthemes/reui
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Signature pad controls: clear, undo, redo and save buttons, and a preview of
// saved strokes, split from ix-signature-pad.tsx. They use the design system's
// own Button. Ported from the MIT-licensed source above.
"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { useSignaturePad, useSignaturePadConfig } from "./ix-signature-pad"
import {
  getSignaturePadStrokePath,
  resolveFrame,
  type SignaturePadExportOptions,
  type SignaturePadFormat,
  type SignaturePadStroke,
} from "./ix-signature-pad-ink"

/* -------------------------------------------------------------------------- */
/*                                  Controls                                  */
/* -------------------------------------------------------------------------- */

// The control glyphs are drawn here in currentColor, so the file installs on
// its own and each button's own colour inks them.
function ControlGlyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
      <path d={d} />
    </svg>
  )
}

const EraserGlyph = () => <ControlGlyph d="M6.5 13.5h7M2.75 9.25l5.5-5.5a1.5 1.5 0 0 1 2.12 0l2.38 2.38a1.5 1.5 0 0 1 0 2.12L8.5 12.5h-2.5l-3.25-3.25ZM5.5 6.5l4.5 4.5" />
const UndoGlyph = () => <ControlGlyph d="M5.5 3 2.5 6l3 3M2.5 6H10a3.5 3.5 0 0 1 0 7H7" />
const RedoGlyph = () => <ControlGlyph d="M10.5 3l3 3-3 3M13.5 6H6a3.5 3.5 0 0 0 0 7h3" />
const SaveGlyph = () => <ControlGlyph d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6L13 4.5v8A1.5 1.5 0 0 1 11.5 14h-7A1.5 1.5 0 0 1 3 12.5v-9ZM5.5 2v3h4V2M5 14v-4h6v4" />

type SignaturePadControlProps = ComponentProps<typeof Button>

/*
 * Each control defaults to an icon button and takes text as `children`. A
 * control that disables itself would strand keyboard focus on `<body>`, so
 * each one hands focus to the area when its own action empties it.
 */
function SignaturePadClear({
  children,
  onClick,
  disabled,
  variant = "outline",
  size = "icon",
  ...props
}: SignaturePadControlProps) {
  const api = useSignaturePad()

  return (
    <Button
      type="button"
      data-slot="signature-pad-clear"
      aria-label={children === undefined ? "Clear signature" : undefined}
      variant={variant}
      size={size}
      {...props}
      disabled={disabled || api.isEmpty || api.disabled || api.readOnly}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        api.clear()
        api.focus()
      }}
    >
      {children ?? (
        <EraserGlyph />
      )}
    </Button>
  )
}

function SignaturePadUndo({
  children,
  onClick,
  disabled,
  variant = "outline",
  size = "icon",
  ...props
}: SignaturePadControlProps) {
  const api = useSignaturePad()
  const { undoDepth } = useSignaturePadConfig("SignaturePadUndo")

  return (
    <Button
      type="button"
      data-slot="signature-pad-undo"
      aria-label={children === undefined ? "Undo" : undefined}
      variant={variant}
      size={size}
      {...props}
      disabled={disabled || !api.canUndo || api.disabled || api.readOnly}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        api.undo()
        if (undoDepth === 1) api.focus()
      }}
    >
      {children ?? (
        <UndoGlyph />
      )}
    </Button>
  )
}

function SignaturePadRedo({
  children,
  onClick,
  disabled,
  variant = "outline",
  size = "icon",
  ...props
}: SignaturePadControlProps) {
  const api = useSignaturePad()
  const { redoDepth } = useSignaturePadConfig("SignaturePadRedo")

  return (
    <Button
      type="button"
      data-slot="signature-pad-redo"
      aria-label={children === undefined ? "Redo" : undefined}
      variant={variant}
      size={size}
      {...props}
      disabled={disabled || !api.canRedo || api.disabled || api.readOnly}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        api.redo()
        if (redoDepth === 1) api.focus()
      }}
    >
      {children ?? (
        <RedoGlyph />
      )}
    </Button>
  )
}

/** Serializes the pad and hands the result to `onSave`. Disabled while the pad is empty. */
function SignaturePadSave({
  format = "png",
  options,
  onSave,
  children,
  onClick,
  disabled,
  variant = "outline",
  size = "icon",
  ...props
}: SignaturePadControlProps & {
  format?: SignaturePadFormat
  options?: SignaturePadExportOptions
  onSave?: (value: string, strokes: SignaturePadStroke[]) => void
}) {
  const api = useSignaturePad()

  return (
    <Button
      type="button"
      data-slot="signature-pad-save"
      aria-label={children === undefined ? "Save signature" : undefined}
      variant={variant}
      size={size}
      {...props}
      disabled={disabled || api.isEmpty || api.disabled}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        onSave?.(api.serialize(format, options), api.strokes)
      }}
    >
      {children ?? (
        <SaveGlyph />
      )}
    </Button>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Preview                                  */
/* -------------------------------------------------------------------------- */

/**
 * Saved strokes as an inline SVG cropped to the ink, for lists, receipts and
 * documents. Needs no `SignaturePad` around it, renders on the server, and
 * scales with CSS while the ink keeps following `currentColor`.
 */
function SignaturePadPreview({
  strokes,
  padding = 4,
  color,
  className,
  ...props
}: Omit<ComponentProps<"svg">, "color"> & {
  strokes: SignaturePadStroke[]
  padding?: number
  color?: string
}) {
  if (strokes.length === 0) return null
  const { x, y, width, height } = resolveFrame(strokes, { padding })

  return (
    <svg
      data-slot="signature-pad-preview"
      role="img"
      aria-label="Signature"
      viewBox={`${x} ${y} ${width} ${height}`}
      width={width}
      height={height}
      className={cn("text-foreground h-auto max-w-full", className)}
      {...props}
    >
      {strokes.map((stroke, index) => (
        <path
          key={index}
          d={getSignaturePadStrokePath(stroke)}
          fill={stroke.color ?? color ?? "currentColor"}
        />
      ))}
    </svg>
  )
}


export {
  SignaturePadClear,
  SignaturePadUndo,
  SignaturePadRedo,
  SignaturePadSave,
  SignaturePadPreview,
}
