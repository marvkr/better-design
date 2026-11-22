/*
 * Copyright (c) 2025 Keenthemes Inc. MIT License, from https://github.com/keenthemes/reui
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Signature pad ink: the stroke types, the outline geometry and the PNG, JPEG,
// SVG and JSON export, split from ix-signature-pad.tsx so each file stays
// readable. Ported from the MIT-licensed source above.

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/** CSS pixels from the area's top-left corner, and the ink diameter there. */
export type SignaturePadPoint = [x: number, y: number, size: number]

/** One stroke: its points, and its ink when the pad sets a colour. */
export type SignaturePadStroke = {
  points: SignaturePadPoint[]
  /** Recorded only when the pad has a `color`; otherwise the ink follows `currentColor`. */
  color?: string
}

/** The input devices that can ink the pad. */
export type SignaturePadPointerType = "mouse" | "pen" | "touch"

/**
 * `auto` reads pen pressure and falls back to speed for mouse and touch,
 * whose `pressure` is a constant 0.5 on most hardware.
 */
export type SignaturePadSizing = "auto" | "pressure" | "velocity"

/** Data URLs for the image formats, the raw strokes for `json`. */
export type SignaturePadFormat = "png" | "jpeg" | "svg" | "json"

/** How an export frames, crops and inks the signature. */
export type SignaturePadExportOptions = {
  /** A fixed frame from the area's origin. Without both, the image is cropped to the ink. */
  width?: number
  height?: number
  /** Space kept around the ink when cropping. */
  padding?: number
  /** `false` keeps the area's origin instead of cropping to the ink. */
  crop?: boolean
  /** Ink for strokes that carry no color of their own. Defaults to black, since exports usually land on paper. */
  color?: string
  background?: string
  /** Raster only: pixels per CSS pixel. */
  scale?: number
  /** Raster only. */
  type?: "image/png" | "image/jpeg" | "image/webp"
  quality?: number
}

/* -------------------------------------------------------------------------- */
/*                                  Geometry                                  */
/* -------------------------------------------------------------------------- */

/** Rounds a coordinate to two decimals, so stored points and paths stay short. */
export const round = (value: number) => Math.round(value * 100) / 100
const pair = (x: number, y: number) => `${round(x)} ${round(y)}`

/* Past ~100 degrees the averaged tangent flips and the outline pinches, so a
   stroke is split there and each piece gets its own round caps. */
const CORNER_COS = -0.17

function circlePath(x: number, y: number, r: number) {
  const radius = round(Math.max(r, 0.25))
  return `M${pair(x - radius, y)}a${radius} ${radius} 0 1 0 ${round(radius * 2)} 0a${radius} ${radius} 0 1 0 ${round(-radius * 2)} 0Z`
}

/**
 * One filled outline: the left offset forward, a round cap, the right offset
 * back, a round cap. Every arc sweeps the same way as the outline itself, so
 * overlapping pieces and self-crossing loops add up under the default
 * `nonzero` fill instead of punching holes.
 */
function outlinePath(points: SignaturePadPoint[], from: number, to: number) {
  const [startX, startY, startSize] = points[from]
  if (from === to) return circlePath(startX, startY, startSize / 2)

  const left: [number, number][] = []
  const right: [number, number][] = []
  let nx = 0
  let ny = 1

  for (let i = from; i <= to; i++) {
    const [ax, ay] = points[Math.max(i - 1, from)]
    const [bx, by] = points[Math.min(i + 1, to)]
    const length = Math.hypot(bx - ax, by - ay)
    if (length > 1e-6) {
      nx = -(by - ay) / length
      ny = (bx - ax) / length
    }
    const [x, y, size] = points[i]
    const r = size / 2
    left.push([x + nx * r, y + ny * r])
    right.push([x - nx * r, y - ny * r])
  }

  const last = left.length - 1
  const endRadius = round(points[to][2] / 2)
  const startRadius = round(startSize / 2)

  let d = `M${pair(...left[0])}`
  for (let i = 1; i < last; i++) {
    const [x, y] = left[i]
    d += `Q${pair(x, y)} ${pair((x + left[i + 1][0]) / 2, (y + left[i + 1][1]) / 2)}`
  }
  d += `L${pair(...left[last])}A${endRadius} ${endRadius} 0 0 0 ${pair(...right[last])}`
  for (let i = last - 1; i > 0; i--) {
    const [x, y] = right[i]
    d += `Q${pair(x, y)} ${pair((x + right[i - 1][0]) / 2, (y + right[i - 1][1]) / 2)}`
  }
  return `${d}L${pair(...right[0])}A${startRadius} ${startRadius} 0 0 0 ${pair(...left[0])}Z`
}

function isCorner(
  a: SignaturePadPoint,
  b: SignaturePadPoint,
  c: SignaturePadPoint
) {
  const ux = b[0] - a[0]
  const uy = b[1] - a[1]
  const vx = c[0] - b[0]
  const vy = c[1] - b[1]
  const lengths = Math.hypot(ux, uy) * Math.hypot(vx, vy)
  return lengths > 0 && (ux * vx + uy * vy) / lengths < CORNER_COS
}

/** The SVG path data of one stroke's filled outline, shared by the pad and every export. */
export function getSignaturePadStrokePath(stroke: SignaturePadStroke) {
  const { points } = stroke
  if (points.length === 0) return ""

  let d = ""
  let start = 0
  for (let i = 1; i < points.length - 1; i++) {
    if (isCorner(points[i - 1], points[i], points[i + 1])) {
      d += outlinePath(points, start, i)
      start = i
    }
  }
  return d + outlinePath(points, start, points.length - 1)
}

/** The ink's bounding box, stroke width included, or `null` when there is no ink. */
export function getSignaturePadBounds(strokes: SignaturePadStroke[]) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const stroke of strokes) {
    for (const [x, y, size] of stroke.points) {
      const r = size / 2
      minX = Math.min(minX, x - r)
      minY = Math.min(minY, y - r)
      maxX = Math.max(maxX, x + r)
      maxY = Math.max(maxY, y + r)
    }
  }

  if (minX === Infinity) return null
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

/** Resolves the frame an export draws into: fixed, or cropped to the ink with padding. */
export function resolveFrame(
  strokes: SignaturePadStroke[],
  options: SignaturePadExportOptions
) {
  const { width, height, padding = 8, crop = true } = options
  if (width !== undefined && height !== undefined) {
    return { x: 0, y: 0, width, height }
  }

  const bounds = getSignaturePadBounds(strokes)
  if (!bounds) return { x: 0, y: 0, width: width ?? 1, height: height ?? 1 }
  if (!crop) {
    return {
      x: 0,
      y: 0,
      width: width ?? Math.ceil(bounds.x + bounds.width + padding),
      height: height ?? Math.ceil(bounds.y + bounds.height + padding),
    }
  }
  /* Round the edges, not the size: flooring x and ceiling only the width
     could leave the right and bottom edges up to 1px inside the ink. */
  const x = Math.floor(bounds.x - padding)
  const y = Math.floor(bounds.y - padding)
  return {
    x,
    y,
    width: Math.ceil(bounds.x + bounds.width + padding) - x,
    height: Math.ceil(bounds.y + bounds.height + padding) - y,
  }
}

const escapeAttribute = (value: string) =>
  value.replace(/[&"<>]/g, (char) => `&#${char.charCodeAt(0)};`)

/** A standalone SVG document string. */
export function signaturePadToSVG(
  strokes: SignaturePadStroke[],
  options: SignaturePadExportOptions = {}
) {
  const { x, y, width, height } = resolveFrame(strokes, options)
  const color = options.color ?? "oklch(0 0 0)"
  const background = options.background
    ? `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${escapeAttribute(options.background)}"/>`
    : ""
  const paths = strokes
    .map((stroke) => {
      const d = getSignaturePadStrokePath(stroke)
      return d
        ? `<path d="${d}" fill="${escapeAttribute(stroke.color ?? color)}"/>`
        : ""
    })
    .join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}" width="${width}" height="${height}">${background}${paths}</svg>`
}

function drawToCanvas(
  strokes: SignaturePadStroke[],
  options: SignaturePadExportOptions
) {
  const { x, y, width, height } = resolveFrame(strokes, options)
  const scale = options.scale ?? 2
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(width * scale))
  canvas.height = Math.max(1, Math.round(height * scale))

  const context = canvas.getContext("2d")
  if (!context) return canvas
  context.scale(scale, scale)
  context.translate(-x, -y)

  /* JPEG has no alpha, so transparent ink would land on black. */
  const background =
    options.background ?? (options.type === "image/jpeg" ? "oklch(1 0 0)" : "")
  if (background) {
    context.fillStyle = background
    context.fillRect(x, y, width, height)
  }

  for (const stroke of strokes) {
    const d = getSignaturePadStrokePath(stroke)
    if (!d) continue
    context.fillStyle = stroke.color ?? options.color ?? "oklch(0 0 0)"
    context.fill(new Path2D(d))
  }
  return canvas
}

/** A PNG data URL, or `type`. Browser only: call it from a handler or an effect, never while rendering. */
export function signaturePadToDataURL(
  strokes: SignaturePadStroke[],
  options: SignaturePadExportOptions = {}
) {
  return drawToCanvas(strokes, options).toDataURL(
    options.type ?? "image/png",
    options.quality
  )
}

/** For uploads: a `Blob` skips the base64 inflation of a data URL. Browser only. */
export function signaturePadToBlob(
  strokes: SignaturePadStroke[],
  options: SignaturePadExportOptions = {}
) {
  return new Promise<Blob | null>((resolve) => {
    drawToCanvas(strokes, options).toBlob(
      resolve,
      options.type ?? "image/png",
      options.quality
    )
  })
}

/** One string per format, and `""` for an empty pad so a `required` field fails. `png` and `jpeg` need a browser. */
export function serializeSignaturePad(
  strokes: SignaturePadStroke[],
  format: SignaturePadFormat = "svg",
  options: SignaturePadExportOptions = {}
) {
  if (strokes.length === 0) return ""
  if (format === "json") return JSON.stringify(strokes)
  if (format === "svg") {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(signaturePadToSVG(strokes, options))}`
  }
  return signaturePadToDataURL(strokes, {
    ...options,
    type: format === "jpeg" ? "image/jpeg" : "image/png",
  })
}
