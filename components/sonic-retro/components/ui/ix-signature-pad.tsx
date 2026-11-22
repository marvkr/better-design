/*
 * Copyright (c) 2025 Keenthemes Inc. MIT License, from https://github.com/keenthemes/reui
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Signature pad: pressure and speed-weighted ink, touch and stylus input, undo
// and redo, a hidden form field, and PNG, JPEG, SVG or JSON export, ported from
// the MIT-licensed source above. Its classes are layout and state only, and its
// controls are the design system's own Button, so each system's tokens theme it.
"use client"

import {
  createContext,
  memo,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import type {
  ComponentProps,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  Ref,
} from "react"
import { cn } from "@/lib/utils"

import {
  getSignaturePadStrokePath,
  round,
  serializeSignaturePad,
  signaturePadToBlob,
  signaturePadToDataURL,
  signaturePadToSVG,
  type SignaturePadExportOptions,
  type SignaturePadFormat,
  type SignaturePadPoint,
  type SignaturePadPointerType,
  type SignaturePadSizing,
  type SignaturePadStroke,
} from "./ix-signature-pad-ink"

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

/** The pad's state and actions, read with useSignaturePad or through apiRef. */
export type SignaturePadApi = {
  strokes: SignaturePadStroke[]
  isEmpty: boolean
  isDrawing: boolean
  canUndo: boolean
  canRedo: boolean
  disabled: boolean
  readOnly: boolean
  clear: () => void
  undo: () => void
  redo: () => void
  /** Focuses the drawing area. */
  focus: () => void
  /** With `crop: false` and no size, these four frame the whole area as rendered. */
  toSVG: (options?: SignaturePadExportOptions) => string
  toDataURL: (options?: SignaturePadExportOptions) => string
  toBlob: (options?: SignaturePadExportOptions) => Promise<Blob | null>
  serialize: (
    format?: SignaturePadFormat,
    options?: SignaturePadExportOptions
  ) => string
}

const API_KEYS = [
  "strokes",
  "isEmpty",
  "isDrawing",
  "canUndo",
  "canRedo",
  "disabled",
  "readOnly",
  "clear",
  "undo",
  "redo",
  "focus",
  "toSVG",
  "toDataURL",
  "toBlob",
  "serialize",
] as const satisfies readonly (keyof SignaturePadApi)[]

type SignaturePadConfig = {
  color?: string
  minWidth: number
  maxWidth: number
  smoothing: number
  sizing: SignaturePadSizing
  pointerTypes?: SignaturePadPointerType[]
  name?: string
  form?: string
  required: boolean
  format: SignaturePadFormat
  interactive: boolean
  undoDepth: number
  redoDepth: number
  setArea: (node: HTMLDivElement | null) => void
  setDrawing: (drawing: boolean) => void
  commitStroke: (stroke: SignaturePadStroke) => void
  resetToDefault: () => void
  onStrokeStart?: (details: { pointerType: SignaturePadPointerType }) => void
}

const SignaturePadContext = createContext<SignaturePadApi | null>(null)
const SignaturePadConfigContext = createContext<SignaturePadConfig | null>(null)

function useSignaturePad(): SignaturePadApi {
  const context = useContext(SignaturePadContext)
  if (!context) {
    throw new Error("useSignaturePad must be used within a SignaturePad")
  }
  return context
}

/** The pad's internal settings, for its own controls in ix-signature-pad-controls. */
function useSignaturePadConfig(part: string) {
  const context = useContext(SignaturePadConfigContext)
  if (!context) throw new Error(`${part} must be used within a SignaturePad`)
  return context
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

const HISTORY_LIMIT = 100

/* Structural, not identity: react-hook-form and other stores hand back a
   deep copy of the value, and identity alone read every copy as an outside
   change and voided undo. First and last point are enough to tell a copy from
   a real edit. */
function sameStrokes(a: SignaturePadStroke[], b: SignaturePadStroke[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  return a.every((stroke, index) => {
    const other = b[index]
    if (stroke === other) return true
    const { points } = stroke
    const last = points.length - 1
    return (
      stroke.color === other.color &&
      points.length === other.points.length &&
      (last < 0 ||
        (points[0].join() === other.points[0].join() &&
          points[last].join() === other.points[last].join()))
    )
  })
}


type History = {
  past: SignaturePadStroke[][]
  future: SignaturePadStroke[][]
  /** The value this history leads to. A value it does not match came from outside, and the history is void. */
  present: SignaturePadStroke[]
}

/** Props for the pad root, which holds the strokes, the history and the form field. */
export type SignaturePadProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  /** Strokes are compared by content, so a copy of the same value keeps undo; a different value from outside clears it. */
  value?: SignaturePadStroke[]
  defaultValue?: SignaturePadStroke[]
  /** Fires once per finished stroke, and on clear, undo and redo. Never per pointer move. */
  onValueChange?: (value: SignaturePadStroke[]) => void
  onStrokeStart?: (details: { pointerType: SignaturePadPointerType }) => void
  onStrokeEnd?: (stroke: SignaturePadStroke) => void
  /** The pad's API, for code outside the tree (a form library, a toolbar elsewhere). */
  apiRef?: Ref<SignaturePadApi>
  /** Any CSS color. Unset, the ink follows the area's text color, so it tracks the theme. */
  color?: string
  /** Ink diameter range in CSS pixels. Equal values draw a constant line. */
  minWidth?: number
  maxWidth?: number
  /** 0 is raw input; higher trades a little lag for smoother curves. */
  smoothing?: number
  sizing?: SignaturePadSizing
  /** Accept only these pointers, e.g. `["pen"]` to ignore a resting palm. */
  pointerTypes?: SignaturePadPointerType[]
  disabled?: boolean
  readOnly?: boolean
  /** Submits the signature with a native form under this name. */
  name?: string
  form?: string
  required?: boolean
  /** What the form field carries. `png` and `jpeg` rasterize on every stroke; `svg` is a string build. */
  format?: SignaturePadFormat
}

function SignaturePad({
  value,
  defaultValue,
  onValueChange,
  onStrokeStart,
  onStrokeEnd,
  apiRef,
  color,
  minWidth = 0.8,
  maxWidth = 3.2,
  smoothing = 0.5,
  sizing = "auto",
  pointerTypes,
  disabled = false,
  readOnly = false,
  name,
  form,
  required = false,
  format = "svg",
  className,
  children,
  ...props
}: SignaturePadProps) {
  const [uncontrolled, setUncontrolled] = useState<SignaturePadStroke[]>(
    () => defaultValue ?? []
  )
  const strokes = value ?? uncontrolled
  /* What a form reset restores, as a native field returns to its default. */
  const [initialValue] = useState<SignaturePadStroke[]>(
    () => defaultValue ?? []
  )
  const [history, setHistory] = useState<History>(() => ({
    past: [],
    future: [],
    present: strokes,
  }))
  const [isDrawing, setDrawing] = useState(false)
  const areaRef = useRef<HTMLDivElement | null>(null)

  const synced = sameStrokes(history.present, strokes)
  const past = synced ? history.past : []
  const future = synced ? history.future : []

  const setStrokes = (next: SignaturePadStroke[], nextHistory: History) => {
    setHistory(nextHistory)
    if (value === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  const commit = (next: SignaturePadStroke[]) =>
    setStrokes(next, {
      past: [...past, strokes].slice(-HISTORY_LIMIT),
      future: [],
      present: next,
    })

  /* With `crop: false` and no size, an export frames the area as rendered. */
  const withAreaFrame = (options: SignaturePadExportOptions = {}) => {
    const area = areaRef.current
    if (options.crop !== false || !area) return options
    return {
      ...options,
      width: options.width ?? area.clientWidth,
      height: options.height ?? area.clientHeight,
    }
  }

  const api: SignaturePadApi = {
    strokes,
    isEmpty: strokes.length === 0,
    isDrawing,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    disabled,
    readOnly,
    clear: () => {
      if (strokes.length > 0) commit([])
    },
    undo: () => {
      const previous = past[past.length - 1]
      if (!previous) return
      setStrokes(previous, {
        past: past.slice(0, -1),
        future: [strokes, ...future],
        present: previous,
      })
    },
    redo: () => {
      const next = future[0]
      if (!next) return
      setStrokes(next, {
        past: [...past, strokes],
        future: future.slice(1),
        present: next,
      })
    },
    focus: () => areaRef.current?.focus({ preventScroll: true }),
    toSVG: (options) => signaturePadToSVG(strokes, withAreaFrame(options)),
    toDataURL: (options) =>
      signaturePadToDataURL(strokes, withAreaFrame(options)),
    toBlob: (options) => signaturePadToBlob(strokes, withAreaFrame(options)),
    serialize: (format, options) =>
      serializeSignaturePad(strokes, format, withAreaFrame(options)),
  }

  /* Members read the latest render through getters, and the object is
     rebuilt only when the pad's state changes. A handle rebuilt on every
     render made a state-setter `apiRef` loop until React threw, including the
     inline `(h) => setApi(h)` form React re-attaches each render; a handle
     that never changed left such a consumer frozen at its mount state. */
  const latestApi = useRef<SignaturePadApi>(null)
  const handleRef = useRef<{ key: unknown[]; handle: SignaturePadApi }>(null)
  useLayoutEffect(() => {
    latestApi.current = api
  })
  useImperativeHandle(apiRef, () => {
    const key = [strokes, history, isDrawing, disabled, readOnly]
    const cached = handleRef.current
    if (cached && cached.key.every((item, i) => Object.is(item, key[i]))) {
      return cached.handle
    }
    // SAFETY: the loop below defines a getter for every key of SignaturePadApi before the handle escapes.
    const handle = {} as SignaturePadApi
    for (const name of API_KEYS) {
      Object.defineProperty(handle, name, {
        enumerable: true,
        get: () => latestApi.current![name],
      })
    }
    handleRef.current = { key, handle }
    return handle
  }, [strokes, history, isDrawing, disabled, readOnly])

  const config: SignaturePadConfig = {
    color,
    minWidth,
    maxWidth: Math.max(minWidth, maxWidth),
    smoothing: Math.min(Math.max(smoothing, 0), 1),
    sizing,
    pointerTypes,
    name,
    form,
    required,
    format,
    interactive: !disabled && !readOnly,
    undoDepth: past.length,
    redoDepth: future.length,
    setArea: (node) => {
      areaRef.current = node
    },
    setDrawing,
    commitStroke: (stroke) => {
      commit([...strokes, stroke])
      onStrokeEnd?.(stroke)
    },
    resetToDefault: () => {
      if (!sameStrokes(strokes, initialValue)) commit(initialValue)
    },
    onStrokeStart,
  }

  return (
    <SignaturePadContext.Provider value={api}>
      <SignaturePadConfigContext.Provider value={config}>
        <div
          data-slot="signature-pad"
          data-empty={strokes.length === 0 || undefined}
          data-drawing={isDrawing || undefined}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
          className={cn("flex w-full flex-col gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </SignaturePadConfigContext.Provider>
    </SignaturePadContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Area                                    */
/* -------------------------------------------------------------------------- */

const AREA_BASE_CLASS =
  "relative h-40 w-full overflow-hidden border text-foreground outline-none touch-none select-none [-webkit-touch-callout:none] cursor-crosshair data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default"

/* Radius, focus and invalid rings, the same tokens a design system's text
   area uses, so the pad reads as the same kind of control. Every variant
   takes these. */
const AREA_STATE_CLASS =
  "rounded-md transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"

/* Kept apart from the rings so a variant's fill never fights them. The
   disabled fill is `data-disabled:`, since a div never matches `:disabled`. */
const AREA_VARIANT_CLASS = {
  default: "border-input bg-transparent shadow-xs data-disabled:bg-muted/50",
  muted: "border-border bg-muted/50",
  ghost: "border-transparent bg-transparent",
}

type LiveStroke = {
  pointerId: number
  pointerType: string
  points: SignaturePadPoint[]
  left: number
  top: number
  scaleX: number
  scaleY: number
  time: number
  velocity: number
  size: number
  /* The unsmoothed last position. Streamline trails the pointer, so without
     it a stroke lifted in motion ended short (12px on a fast 200px line). */
  rawX: number
  rawY: number
}

const StrokePath = memo(function StrokePath({
  stroke,
}: {
  stroke: SignaturePadStroke
}) {
  return (
    <path
      data-slot="signature-pad-stroke"
      d={getSignaturePadStrokePath(stroke)}
      fill={stroke.color ?? "currentColor"}
    />
  )
})

/** Props for the drawing area, the part a person signs in. */
export type SignaturePadAreaProps = ComponentProps<"div"> & {
  /** `muted` is a filled surface; `ghost` drops the chrome for a card or document that has its own. */
  variant?: keyof typeof AREA_VARIANT_CLASS
}

/**
 * The drawing surface. Children are overlays (a guide, a placeholder, pinned
 * controls) and must be `pointer-events-none` unless they are controls: a
 * stroke only starts on the area itself, never on something inside it.
 */
function SignaturePadArea({
  ref,
  variant = "default",
  className,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  onKeyDown,
  onContextMenu,
  "aria-describedby": describedBy,
  ...props
}: SignaturePadAreaProps) {
  const api = useSignaturePad()
  const config = useSignaturePadConfig("SignaturePadArea")
  const liveRef = useRef<LiveStroke | null>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const frameRef = useRef(0)
  const resetRef = useRef(config.resetToDefault)

  useEffect(() => {
    resetRef.current = config.resetToDefault
  })

  /* Set imperatively: a PNG needs a canvas, which only exists in the browser,
     and a controlled `value` would then differ between server and client. */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = serializeSignaturePad(api.strokes, config.format)
    }
  }, [api.strokes, config.format, config.name])

  /* Listens on the input's own root (the document, or a shadow root) and asks
     for its form at reset time, so a `form` attribute or an owner that
     changes later is still honoured. The restore waits a task, like a native
     reset's default action, because any listener may still cancel it. */
  useEffect(() => {
    const root = inputRef.current?.getRootNode()
    if (!root) return
    let pending = 0
    const onReset = (event: Event) => {
      if (event.target !== inputRef.current?.form) return
      pending = window.setTimeout(() => {
        if (!event.defaultPrevented) resetRef.current()
      })
    }
    root.addEventListener("reset", onReset, true)
    return () => {
      root.removeEventListener("reset", onReset, true)
      window.clearTimeout(pending)
    }
  }, [config.name])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const paint = () => {
    frameRef.current = 0
    const live = liveRef.current
    pathRef.current?.setAttribute(
      "d",
      live ? getSignaturePadStrokePath({ points: live.points }) : ""
    )
  }

  const schedulePaint = () => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(paint)
  }

  const addSample = (
    live: LiveStroke,
    clientX: number,
    clientY: number,
    pressure: number,
    time: number
  ) => {
    const x = (clientX - live.left) * live.scaleX
    const y = (clientY - live.top) * live.scaleY
    live.rawX = x
    live.rawY = y
    const { minWidth, maxWidth, sizing, smoothing } = config
    const usePressure =
      sizing === "pressure" || (sizing === "auto" && live.pointerType === "pen")
    const pressed = minWidth + (maxWidth - minWidth) * Math.min(pressure, 1)
    const previous = live.points[live.points.length - 1]

    if (!previous) {
      /* A pen at rest is slow, so it starts near full width; at the midpoint
         a tap left a dot a third the weight of the line beside it. */
      live.size = usePressure ? pressed : minWidth + (maxWidth - minWidth) * 0.8
      live.time = time
      live.points.push([round(x), round(y), round(live.size)])
      return
    }

    /* Streamline: each point moves only part of the way toward the pointer. */
    const follow = 1 - smoothing * 0.85
    const sx = previous[0] + (x - previous[0]) * follow
    const sy = previous[1] + (y - previous[1]) * follow
    const distance = Math.hypot(sx - previous[0], sy - previous[1])
    if (distance < 0.75) return

    const speed = distance / Math.max(time - live.time, 1)
    live.velocity = live.velocity * 0.3 + speed * 0.7
    live.time = time
    const target = usePressure
      ? pressed
      : Math.max(maxWidth / (live.velocity + 1), minWidth)
    live.size += (target - live.size) * 0.35
    live.points.push([round(sx), round(sy), round(live.size)])
  }

  /** `commit: false` discards: a pointercancel is the platform taking the pointer back, often a rejected palm. */
  const finish = (pointerId: number, commit = true) => {
    const live = liveRef.current
    if (!live || live.pointerId !== pointerId) return
    liveRef.current = null
    cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    /* Cleared in the same discrete event that commits the stroke, so React
       paints the committed path in this frame and the ink never blinks. */
    pathRef.current?.setAttribute("d", "")
    config.setDrawing(false)
    if (!commit) return
    const last = live.points[live.points.length - 1]
    if (last && Math.hypot(live.rawX - last[0], live.rawY - last[1]) >= 0.5) {
      live.points.push([round(live.rawX), round(live.rawY), round(live.size)])
    }
    config.commitStroke(
      config.color === undefined
        ? { points: live.points }
        : { points: live.points, color: config.color }
    )
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event)
    const area = event.currentTarget
    // SAFETY: React pointer events report only "mouse", "pen" or "touch", the three members of SignaturePadPointerType.
    const pointerType = event.pointerType as SignaturePadPointerType
    if (
      event.defaultPrevented ||
      !config.interactive ||
      event.target !== area ||
      !event.isPrimary ||
      (pointerType === "mouse" && event.button !== 0) ||
      (config.pointerTypes && !config.pointerTypes.includes(pointerType))
    ) {
      return
    }

    /* A pen landing mid-stroke means the touch stroke was a resting palm. */
    const live = liveRef.current
    if (live) {
      if (live.pointerType !== "touch" || pointerType !== "pen") return
      liveRef.current = null
    }

    /* No preventDefault: the native mousedown focuses the area without
       `:focus-visible`, where a scripted focus() lit the keyboard ring on
       every mouse stroke. Touch scrolling and text selection are already off
       through `touch-none` and `select-none`. */
    try {
      area.setPointerCapture(event.pointerId)
    } catch {
      /* Only a pointer that is no longer active refuses capture. */
    }

    const rect = area.getBoundingClientRect()
    const next: LiveStroke = {
      pointerId: event.pointerId,
      pointerType,
      points: [],
      /* The ink layer starts inside the border, and a transformed ancestor
         (a zooming dialog) scales the rect but not the coordinate space. */
      left: rect.left + area.clientLeft * (rect.width / area.offsetWidth || 1),
      top: rect.top + area.clientTop * (rect.height / area.offsetHeight || 1),
      scaleX: rect.width ? area.offsetWidth / rect.width : 1,
      scaleY: rect.height ? area.offsetHeight / rect.height : 1,
      time: event.timeStamp,
      velocity: 0,
      size: 0,
      rawX: 0,
      rawY: 0,
    }
    liveRef.current = next
    addSample(
      next,
      event.clientX,
      event.clientY,
      event.pressure,
      event.timeStamp
    )
    schedulePaint()
    config.setDrawing(true)
    config.onStrokeStart?.({ pointerType })
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event)
    const live = liveRef.current
    if (!live || live.pointerId !== event.pointerId) return
    /* A fast pen reports several samples per frame; the coalesced list keeps
       curves round instead of cutting across them. */
    const samples = event.nativeEvent.getCoalescedEvents?.() ?? []
    for (const sample of samples.length ? samples : [event.nativeEvent]) {
      addSample(
        live,
        sample.clientX,
        sample.clientY,
        sample.pressure,
        sample.timeStamp
      )
    }
    schedulePaint()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || !config.interactive) return
    if (!(event.metaKey || event.ctrlKey) || event.altKey) return
    /* The physical key when the layout types no Latin letter (Cyrillic,
       Greek, Hebrew), so the shortcut survives a layout switch. */
    const typed = event.key.toLowerCase()
    const key = /^[a-z]$/.test(typed)
      ? typed
      : event.code.replace(/^Key/, "").toLowerCase()
    /* Pressed on a pinned control, the action may disable that control
       (Undo at the start of history, Clear or Save on an emptied pad), and
       focus would fall to <body>; it moves to the area instead. */
    const fromControl = event.target !== event.currentTarget
    if (key === "z" && !event.shiftKey && api.canUndo) {
      event.preventDefault()
      api.undo()
      if (fromControl) api.focus()
    } else if (
      (key === "y" || (key === "z" && event.shiftKey)) &&
      api.canRedo
    ) {
      event.preventDefault()
      api.redo()
      if (fromControl) api.focus()
    }
  }

  const labelled = props["aria-label"] ?? props["aria-labelledby"]
  const statusId = useId()

  return (
    <div
      ref={(node) => {
        config.setArea(node)
        if (ref instanceof Function) ref(node)
        else if (ref) ref.current = node
      }}
      role="application"
      aria-roledescription="signature pad"
      aria-label={labelled ? undefined : "Signature pad"}
      aria-disabled={api.disabled || undefined}
      aria-describedby={describedBy ? `${describedBy} ${statusId}` : statusId}
      tabIndex={config.interactive ? 0 : -1}
      data-slot="signature-pad-area"
      data-variant={variant}
      data-empty={api.isEmpty || undefined}
      data-drawing={api.isDrawing || undefined}
      data-disabled={api.disabled || undefined}
      data-readonly={api.readOnly || undefined}
      className={cn(
        AREA_BASE_CLASS,
        AREA_STATE_CLASS,
        AREA_VARIANT_CLASS[variant],
        className
      )}
      {...props}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        finish(event.pointerId)
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event)
        finish(event.pointerId, false)
      }}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event)
        finish(event.pointerId)
      }}
      onKeyDown={handleKeyDown}
      onContextMenu={(event) => {
        onContextMenu?.(event)
        /* A long press on touch opens the context menu mid-stroke. */
        if (liveRef.current) event.preventDefault()
      }}
    >
      {children}
      {/* The ink is invisible to assistive tech, so its state is spoken here. */}
      <span id={statusId} className="sr-only">
        {api.isEmpty ? "Empty" : "Signed"}
        {api.readOnly ? ", read only" : ""}
      </span>
      <svg
        data-slot="signature-pad-canvas"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        {api.strokes.map((stroke, index) => (
          <StrokePath key={index} stroke={stroke} />
        ))}
        <path ref={pathRef} fill={config.color ?? "currentColor"} />
      </svg>
      {config.name && (
        <input
          ref={inputRef}
          type="text"
          name={config.name}
          form={config.form}
          required={config.required}
          disabled={api.disabled}
          defaultValue=""
          tabIndex={-1}
          aria-hidden="true"
          /* A failed `required` check focuses this input; hand that to the pad. */
          onFocus={() => api.focus()}
          className="pointer-events-none absolute bottom-0 left-1/2 size-px opacity-0"
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Overlays                                  */
/* -------------------------------------------------------------------------- */

/** A dashed signing line with a cross at its start. Replace the cross with `children`. */
function SignaturePadGuide({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="signature-pad-guide"
      aria-hidden="true"
      className={cn(
        "text-muted-foreground border-muted-foreground/40 pointer-events-none absolute inset-x-6 bottom-8 flex items-end gap-2 border-b border-dashed pb-1.5 text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="size-3"
        >
          <path d="M2 2l8 8M10 2l-8 8" />
        </svg>
      )}
    </div>
  )
}

/** Shown only while the pad is empty and nobody is drawing. */
function SignaturePadPlaceholder({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const { isEmpty, isDrawing } = useSignaturePad()
  if (!isEmpty || isDrawing) return null

  return (
    <div
      data-slot="signature-pad-placeholder"
      aria-hidden="true"
      className={cn(
        "text-muted-foreground pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center text-sm",
        className
      )}
      {...props}
    >
      {children ?? "Sign here"}
    </div>
  )
}

const CONTROLS_POSITION_CLASS = {
  "top-start": "top-2 start-2",
  "top-end": "top-2 end-2",
  "bottom-start": "bottom-2 start-2",
  "bottom-end": "bottom-2 end-2",
}

/**
 * Pins a group of controls to a corner of the area, above the ink. Top-end by
 * default: signatures run along the bottom, where `bottom-end` sat on the
 * guide line and under the last letters.
 */
function SignaturePadControls({
  position = "top-end",
  className,
  ...props
}: ComponentProps<"div"> & {
  position?: keyof typeof CONTROLS_POSITION_CLASS
}) {
  return (
    <div
      data-slot="signature-pad-controls"
      data-position={position}
      className={cn(
        "absolute z-10 flex items-center gap-1",
        CONTROLS_POSITION_CLASS[position],
        className
      )}
      {...props}
    />
  )
}


export {
  SignaturePad,
  SignaturePadArea,
  SignaturePadGuide,
  SignaturePadPlaceholder,
  SignaturePadControls,
  useSignaturePad,
  useSignaturePadConfig,
}
export {
  getSignaturePadBounds,
  getSignaturePadStrokePath,
  serializeSignaturePad,
  signaturePadToBlob,
  signaturePadToDataURL,
  signaturePadToSVG,
} from "./ix-signature-pad-ink"
export type {
  SignaturePadExportOptions,
  SignaturePadFormat,
  SignaturePadPoint,
  SignaturePadPointerType,
  SignaturePadSizing,
  SignaturePadStroke,
} from "./ix-signature-pad-ink"
