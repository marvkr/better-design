// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// Canvas2D helpers for the layers beneath the glass. Coordinates are CSS px.

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2))
  ctx.beginPath()
  ctx.roundRect(x, y, Math.max(w, 0), Math.max(h, 0), rr)
}

let cachedFont = ''
/** The page's font stack, so canvas labels match the DOM. */
export function fontFamily() {
  if (!cachedFont && typeof document !== 'undefined') cachedFont = getComputedStyle(document.body).fontFamily
  return cachedFont || 'system-ui, sans-serif'
}

/** Slider-style track: flat inactive pill plus a flat accent fill ending at `fillEnd`. */
export function drawTrack(
  ctx: CanvasRenderingContext2D,
  o: {
    x: number
    y: number
    length: number
    height: number
    fillEnd: number
    track: string
    accent: string
    fillOpacity?: number
  },
) {
  const { x, y, length, height, fillEnd } = o
  roundRect(ctx, x, y - height / 2, length, height, height / 2)
  ctx.fillStyle = o.track
  ctx.fill()

  const end = Math.max(x + height, fillEnd)
  if (fillEnd <= x || (o.fillOpacity ?? 1) <= 0) return
  ctx.save()
  ctx.globalAlpha = o.fillOpacity ?? 1
  roundRect(ctx, x, y - height / 2, end - x, height, height / 2)
  ctx.fillStyle = o.accent
  ctx.fill()
  ctx.restore()
}

export function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  size: number,
  color: string,
  weight = 600,
) {
  ctx.font = `${weight} ${size}px ${fontFamily()}`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + size * 0.04)
}

const pathCache = new Map<string, Path2D>()

/** Strokes one of the Icon set's 24 × 24 glyphs centered at (cx, cy). */
export function drawIcon(
  ctx: CanvasRenderingContext2D,
  shape: { paths: string[]; circles?: [number, number, number][] },
  cx: number,
  cy: number,
  size: number,
  color: string,
  strokeWidth = 2,
) {
  ctx.save()
  ctx.translate(cx - size / 2, cy - size / 2)
  ctx.scale(size / 24, size / 24)
  ctx.strokeStyle = color
  ctx.lineWidth = strokeWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (const [x, y, r] of shape.circles ?? []) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.stroke()
  }
  for (const d of shape.paths) {
    let p = pathCache.get(d)
    if (!p) {
      p = new Path2D(d)
      pathCache.set(d, p)
    }
    ctx.stroke(p)
  }
  ctx.restore()
}

/** Scales the slider's spatial optics (designed for a 120-unit lens) to another lens height. */
export function scaleOptics<T extends { refraction: number; restRefraction: number; bevelWidth: number; shadowSoftness: number; shadowOffset: number }>(
  o: T,
  k: number,
): T {
  return {
    ...o,
    refraction: o.refraction * k,
    restRefraction: o.restRefraction * k,
    bevelWidth: o.bevelWidth * k,
    shadowSoftness: o.shadowSoftness * k,
    shadowOffset: o.shadowOffset * k,
  }
}
