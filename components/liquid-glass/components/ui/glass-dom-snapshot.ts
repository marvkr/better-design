// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// dom-snapshot — paints a DOM subtree into a Canvas2D context at its on-screen position.
//
// A WebGL lens cannot read the page's pixels, so glass that bends the page needs the
// page as a texture. This paints a good-enough picture of it: backgrounds (colours,
// gradients and images, with their size, position and repeat), rounded borders, text,
// inline SVG icons, canvases, images and video (with object-fit) and backdrop blur.
// Siblings are painted in CSS order: negative z-index, content, positioned, positive z-index.
// It is not a browser renderer: no shadows, conic gradients, masks, rotation or
// ::before/::after. An image from another origin is requested again with CORS; if its
// server does not allow that it is left out, because a canvas such an image has touched
// can never become a WebGL texture. Used by `material="clear"` glass and by GlassBadge.
//
// COPY THIS FILE VERBATIM. MIT — https://github.com/bilalgursen/liquid-glass

type Box = { x: number; y: number; w: number; h: number }
type Drawable = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement

const isVisibleColor = (color: string) =>
  !!color && color !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(color) && !/\/\s*0\)$/.test(color)

/** Splits on a separator that is not inside parentheses: "a(1, 2), b" → ["a(1, 2)", "b"]. */
function splitTop(text: string, separator: string) {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '(') depth++
    else if (ch === ')') depth--
    else if (ch === separator && depth === 0) {
      parts.push(text.slice(start, i))
      start = i + 1
    }
  }
  parts.push(text.slice(start))
  return parts.map((part) => part.trim()).filter(Boolean)
}

/** "40%" or "12px" of a span. */
const lengthOf = (token: string, span: number) => (token.endsWith('%') ? (span * parseFloat(token)) / 100 : parseFloat(token) || 0)

/** One axis of a CSS position ("25%", "12px", "right", "calc(100% - 8px)") inside `free` px of room. */
function along(token: string | undefined, free: number) {
  if (!token) return free / 2
  const calc = /^calc\(([-\d.]+)% ([+-]) ([\d.]+)px\)$/.exec(token)
  if (calc) return (free * Number(calc[1])) / 100 + (calc[2] === '-' ? -1 : 1) * Number(calc[3])
  if (/^-?[\d.]/.test(token)) return lengthOf(token, free)
  return token === 'left' || token === 'top' ? 0 : token === 'right' || token === 'bottom' ? free : free / 2
}

/** `background-position`, `object-position` and a gradient's `at …` as an offset into the free room. */
function placeOf(position: string, freeX: number, freeY: number): [number, number] {
  let [a, b, c, d] = splitTop(position, ' ')
  // "right 10px bottom 20px": offsets measured from the named edges.
  if (d) return [a === 'right' ? freeX - along(b, freeX) : along(b, freeX), c === 'bottom' ? freeY - along(d, freeY) : along(d, freeY)]
  if (a === 'top' || a === 'bottom' || b === 'left' || b === 'right') [a, b] = [b, a]
  return [along(a, freeX), along(b, freeY)]
}

// ── Sources: loading, and keeping the canvas readable ────────────────────────

const verdicts = new WeakMap<Drawable, { key: string; ok: boolean }>()

/**
 * Is this source safe to draw? One image without CORS (or an SVG, in some browsers)
 * taints the whole canvas and WebGL can then no longer read it, so each source is
 * tried once on a 1×1 canvas first. `key` is whatever makes it a different picture.
 */
function isClean(source: Drawable, key = '') {
  const known = verdicts.get(source)
  if (known && known.key === key) return known.ok
  let ok = false
  try {
    const probe = document.createElement('canvas')
    probe.width = probe.height = 1
    const ctx = probe.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.drawImage(source, 0, 0, 1, 1)
      ctx.getImageData(0, 0, 1, 1)
      ok = true
    }
  } catch {
    // SecurityError: another origin without CORS. InvalidStateError: a broken image.
  }
  verdicts.set(source, { key, ok })
  return ok
}

const waiting = new WeakMap<HTMLImageElement, Set<() => void>>()

/** True once the image can be drawn. Until then `onStale` is called when it arrives. */
function isLoaded(image: HTMLImageElement, onStale?: () => void) {
  if (image.complete) return image.naturalWidth > 0
  if (!onStale) return false
  let callbacks = waiting.get(image)
  if (!callbacks) {
    const pending = (callbacks = new Set())
    waiting.set(image, pending)
    image.addEventListener(
      'load',
      () => {
        waiting.delete(image)
        pending.forEach((notify) => notify())
      },
      { once: true },
    )
  }
  callbacks.add(onStale)
  return false
}

const isSameOrigin = (src: string) => {
  try {
    const url = new URL(src, location.href)
    return url.protocol === 'data:' || url.protocol === 'blob:' || url.origin === location.origin
  } catch {
    return false
  }
}

const copies = new Map<string, HTMLImageElement>()

/** Our own copy of an image by URL: a CSS background, or an <img> the page loaded without CORS. */
function imageCopy(src: string) {
  let image = copies.get(src)
  if (!image) {
    if (copies.size > 200) copies.clear()
    image = new Image()
    if (!isSameOrigin(src)) image.crossOrigin = 'anonymous'
    image.decoding = 'async'
    image.src = src
    copies.set(src, image)
  }
  return image
}

/** Draws an image or a video frame into its box the way `object-fit` and `object-position` place it. */
function drawFitted(ctx: CanvasRenderingContext2D, source: Drawable, sw: number, sh: number, box: Box, radius: number, style: CSSStyleDeclaration) {
  const fit = style.objectFit
  let w = box.w
  let h = box.h
  if (fit !== 'fill') {
    const contain = Math.min(box.w / sw, box.h / sh)
    const k = fit === 'cover' ? Math.max(box.w / sw, box.h / sh) : fit === 'none' ? 1 : fit === 'scale-down' ? Math.min(1, contain) : contain
    w = sw * k
    h = sh * k
  }
  const [ox, oy] = placeOf(style.objectPosition, box.w - w, box.h - h)
  const clips = radius > 0 || w > box.w + 0.5 || h > box.h + 0.5
  if (clips) {
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(box.x, box.y, box.w, box.h, radius)
    ctx.clip()
  }
  ctx.drawImage(source, box.x + ox, box.y + oy, w, h)
  if (clips) ctx.restore()
}

const svgCache = new WeakMap<Element, { key: string; image: HTMLImageElement }>()
/** Set when this browser treats an SVG image as unreadable: icons are then left out. */
let svgTaints = false

/**
 * Draws an inline SVG as an image. Colours that come from classes are inlined first.
 * Built once per element and rebuilt when the colour, the cache key or the size
 * changes, so an animated SVG keeps its first frame instead of rebuilding every call.
 */
function drawSvg(ctx: CanvasRenderingContext2D, svg: SVGSVGElement, color: string, box: Box, onStale: (() => void) | undefined, cacheKey: string) {
  if (svgTaints) return
  const key = `${color}|${cacheKey}|${Math.round(box.w)}x${Math.round(box.h)}`
  let entry = svgCache.get(svg)
  if (!entry || entry.key !== key) {
    const clone = svg.cloneNode(true) as SVGSVGElement
    const originals = [svg, ...svg.querySelectorAll('*')]
    const clones = [clone, ...clone.querySelectorAll('*')]
    originals.forEach((original, i) => {
      const style = getComputedStyle(original)
      const target = clones[i] as SVGElement
      target.removeAttribute('class')
      target.style.fill = style.fill
      target.style.stroke = style.stroke
      target.style.animation = 'none'
    })
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width', String(box.w))
    clone.setAttribute('height', String(box.h))
    clone.style.color = color
    const image = new Image()
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`
    entry = { key, image }
    svgCache.set(svg, entry)
  }
  if (!isLoaded(entry.image, onStale)) return
  if (isClean(entry.image)) ctx.drawImage(entry.image, box.x, box.y, box.w, box.h)
  else svgTaints = true
}

// ── Backgrounds: gradients and images ────────────────────────────────────────

type Stop = { color: string; at: number | null; px: boolean }
type Gradient =
  | { kind: 'linear'; repeating: boolean; stops: Stop[]; angle: number; corner: string }
  | { kind: 'radial'; repeating: boolean; stops: Stop[]; circle: boolean; extent: string; size: string[]; at: string }
type BackgroundImage = { kind: 'url'; src: string } | Gradient

function parseStops(args: string[], currentColor: string): Stop[] | null {
  const stops: Stop[] = []
  for (const arg of args) {
    const tokens = splitTop(arg, ' ')
    const positions: string[] = []
    while (tokens.length && /^-?[\d.]+(%|px)$/.test(tokens[tokens.length - 1])) positions.unshift(tokens.pop() as string)
    if (!tokens.length) continue // a colour hint (a position alone) is skipped
    const color = tokens.join(' ').replace(/currentcolor/gi, currentColor)
    if (!positions.length) stops.push({ color, at: null, px: false })
    for (const position of positions) stops.push({ color, at: parseFloat(position), px: position.endsWith('px') })
  }
  return stops.length > 1 ? stops : null
}

/** One layer of a computed `background-image`; null for what is not supported (conic gradients, image-set…). */
function parseImage(text: string, currentColor: string): BackgroundImage | null {
  const url = /^url\((['"]?)(.*)\1\)$/.exec(text)
  if (url) return { kind: 'url', src: url[2] }
  const gradient = /^(repeating-)?(linear|radial)-gradient\(([\s\S]*)\)$/.exec(text)
  if (!gradient) return null
  const repeating = !!gradient[1]
  const args = splitTop(gradient[3], ',')
  // The first argument is the direction or the shape, unless it is already a colour.
  // "in oklab" (the interpolation space) is dropped: canvas always blends in sRGB.
  const first = args[0] ?? ''
  const head = first.replace(/\bin\s+[\w-]+(\s+\w+\s+hue)?/i, '').trim()
  const spaceOnly = head === '' && first !== ''
  if (gradient[2] === 'linear') {
    let angle = Math.PI
    let corner = ''
    let isDirection = spaceOnly
    if (/^to\s/.test(head)) {
      const v = /top/.test(head) ? 't' : /bottom/.test(head) ? 'b' : ''
      const hz = /left/.test(head) ? 'l' : /right/.test(head) ? 'r' : ''
      if (v && hz) corner = v + hz
      else angle = ({ t: 0, r: Math.PI / 2, b: Math.PI, l: Math.PI * 1.5 } as Record<string, number>)[v || hz] ?? Math.PI
      isDirection = true
    } else if (/^-?[\d.]+(deg|grad|rad|turn)$/.test(head)) {
      const n = parseFloat(head)
      angle = head.endsWith('turn') ? n * Math.PI * 2 : head.endsWith('grad') ? (n * Math.PI) / 200 : head.endsWith('rad') ? n : (n * Math.PI) / 180
      isDirection = true
    }
    const stops = parseStops(isDirection ? args.slice(1) : args, currentColor)
    return stops && { kind: 'linear', repeating, stops, angle, corner }
  }
  const isShape = spaceOnly || /^(circle|ellipse|closest-|farthest-|at\s|-?[\d.]+(px|%))/.test(head)
  const [shape = '', at = 'center'] = isShape ? head.split(/\s*\bat\s+/) : []
  const size = shape.match(/-?[\d.]+(px|%)/g) ?? []
  const stops = parseStops(isShape ? args.slice(1) : args, currentColor)
  return (
    stops && {
      kind: 'radial',
      repeating,
      stops,
      circle: /circle/.test(shape) || size.length === 1,
      extent: /(closest|farthest)-(side|corner)/.exec(shape)?.[0] ?? 'farthest-corner',
      size,
      at,
    }
  )
}

const parsed = new Map<string, (BackgroundImage | null)[]>()

function imagesOf(style: CSSStyleDeclaration) {
  const value = style.backgroundImage
  const key = /currentcolor/i.test(value) ? `${value}|${style.color}` : value
  let images = parsed.get(key)
  if (!images) {
    if (parsed.size > 300) parsed.clear()
    images = splitTop(value, ',').map((image) => parseImage(image, style.color))
    parsed.set(key, images)
  }
  return images
}

/** A stop's colour at zero alpha. CSS fades in premultiplied colour, canvas does not, so "transparent" has to keep the hue next to it. */
function clearOf(color: string) {
  const legacy = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/.exec(color)
  if (legacy) return `rgba(${legacy[1]}, ${legacy[2]}, ${legacy[3]}, 0)`
  const modern = /^([a-z-]+\([^/)]+?)\s*(\/[^)]*)?\)$/.exec(color)
  return modern ? `${modern[1]} / 0)` : color
}

/**
 * Resolves stop positions along a gradient line `length` px long. Returns the part of
 * the line the stops span (`from`..`to`, as fractions of it) and each stop inside that
 * part (0..1). `reach`: how far along the line the box extends (repeats cover it).
 */
function rampOf(stops: Stop[], length: number, repeating: boolean, reach = 1) {
  const at = stops.map((stop) => (stop.at === null ? null : stop.px ? stop.at / Math.max(length, 1e-6) : stop.at / 100))
  if (at[0] === null) at[0] = 0
  if (at[at.length - 1] === null) at[at.length - 1] = 1
  for (let i = 1; i < at.length; i++) {
    if (at[i] === null) {
      // Stops without a position are spread evenly between their neighbours.
      let j = i
      while (at[j] === null) j++
      const a = at[i - 1] as number
      const b = Math.max(at[j] as number, a)
      for (let k = i; k < j; k++) at[k] = a + ((b - a) * (k - i + 1)) / (j - i + 1)
    }
    at[i] = Math.max(at[i] as number, at[i - 1] as number)
  }
  let list: [number, string][] = []
  stops.forEach((stop, i) => {
    const p = at[i] as number
    const before = stops[i - 1]
    const after = stops[i + 1]
    // A transparent stop becomes its neighbours' colours at zero alpha (see clearOf).
    const fades = !isVisibleColor(stop.color)
    const fromBefore = fades && !!before && isVisibleColor(before.color)
    const toAfter = fades && !!after && isVisibleColor(after.color)
    if (fromBefore) list.push([p, clearOf(before.color)])
    if (toAfter) list.push([p, clearOf(after.color)])
    if (!fromBefore && !toAfter) list.push([p, stop.color])
  })
  let from = list[0][0]
  let to = list[list.length - 1][0]
  const period = to - from
  if (repeating && period > 1e-4) {
    const first = Math.floor(-from / period)
    const count = Math.ceil((reach - from) / period) - first
    if (count > 200) return null
    const one = list
    list = []
    for (let k = first; k < first + count; k++) for (const [p, color] of one) list.push([p + k * period, color])
    from += first * period
    to = from + count * period
  }
  // Stops that all share one position are a hard edge: keep the line a hair long, or canvas paints nothing.
  const span = Math.max(to - from, 0.02 / Math.max(length, 1e-6))
  return { from, to: from + span, stops: list.map(([p, color]): [number, string] => [Math.min(1, Math.max(0, (p - from) / span)), color]) }
}

/** Fills (0, 0, w, h) with a CSS gradient. */
function fillGradient(ctx: CanvasRenderingContext2D, gradient: Gradient, w: number, h: number) {
  if (gradient.kind === 'linear') {
    let angle = gradient.angle
    if (gradient.corner) {
      // "to top right": the line that puts the two neighbouring corners on the 50 % mark.
      const base = Math.atan2(h, w)
      angle = ({ tr: base, br: Math.PI - base, bl: Math.PI + base, tl: -base } as Record<string, number>)[gradient.corner] ?? base
    }
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    const length = Math.abs(w * sin) + Math.abs(h * cos)
    const ramp = rampOf(gradient.stops, length, gradient.repeating)
    if (!ramp) return
    // The gradient line runs through the centre of the box.
    const x = (t: number) => w / 2 + sin * length * (t - 0.5)
    const y = (t: number) => h / 2 - cos * length * (t - 0.5)
    const fill = ctx.createLinearGradient(x(ramp.from), y(ramp.from), x(ramp.to), y(ramp.to))
    for (const [p, color] of ramp.stops) fill.addColorStop(p, color)
    ctx.fillStyle = fill
    ctx.fillRect(0, 0, w, h)
    return
  }
  const [cx, cy] = placeOf(gradient.at, w, h)
  const dx = [Math.abs(cx), Math.abs(w - cx)]
  const dy = [Math.abs(cy), Math.abs(h - cy)]
  const pick = gradient.extent.startsWith('closest') ? Math.min : Math.max
  let rx = pick(...dx)
  let ry = pick(...dy)
  if (gradient.size.length) {
    rx = lengthOf(gradient.size[0], w)
    ry = gradient.size[1] ? lengthOf(gradient.size[1], h) : rx
  } else if (gradient.circle) rx = ry = gradient.extent.endsWith('corner') ? Math.hypot(rx, ry) : pick(rx, ry)
  else if (gradient.extent.endsWith('corner')) {
    rx *= Math.SQRT2
    ry *= Math.SQRT2
  }
  if (rx < 0.01 || ry < 0.01) return
  const ramp = rampOf(gradient.stops, rx, gradient.repeating, Math.hypot(Math.max(...dx) / rx, Math.max(...dy) / ry))
  if (!ramp) return
  const inner = Math.max(0, rx * ramp.from)
  const fill = ctx.createRadialGradient(0, 0, inner, 0, 0, Math.max(rx * ramp.to, inner + 1e-3))
  for (const [p, color] of ramp.stops) fill.addColorStop(p, color)
  // An ellipse is a circle squeezed along y.
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(1, ry / rx)
  ctx.fillStyle = fill
  ctx.fillRect(-cx, (-cy * rx) / ry, w, (h * rx) / ry)
  ctx.restore()
}

/**
 * Paints an element's `background-image` layers. `area` is the box they are sized and
 * positioned in, `bounds` the part of it worth painting. The caller has clipped to the box.
 */
function paintBackgrounds(ctx: CanvasRenderingContext2D, style: CSSStyleDeclaration, area: Box, bounds: Box, onStale?: () => void) {
  const images = imagesOf(style)
  const sizes = splitTop(style.backgroundSize, ',')
  const positions = splitTop(style.backgroundPosition, ',')
  const repeats = splitTop(style.backgroundRepeat, ',')
  // The first layer is the top one: paint from the last.
  for (let n = images.length - 1; n >= 0; n--) {
    const image = images[n]
    if (!image) continue
    let source: HTMLImageElement | null = null
    let tw = area.w
    let th = area.h
    if (image.kind === 'url') {
      source = imageCopy(image.src)
      if (!isLoaded(source, onStale) || !isClean(source)) continue
      tw = source.naturalWidth
      th = source.naturalHeight
    }
    // Tile size: gradients have no size of their own and fill the area.
    const size = sizes[n % sizes.length] ?? 'auto'
    if (size === 'cover' || size === 'contain') {
      const k = (size === 'cover' ? Math.max : Math.min)(area.w / tw, area.h / th)
      tw *= k
      th *= k
    } else {
      const [sw = 'auto', sh = 'auto'] = splitTop(size, ' ')
      const ratio = tw / th
      if (sw !== 'auto') tw = lengthOf(sw, area.w)
      if (sh !== 'auto') th = lengthOf(sh, area.h)
      if (source && sw !== 'auto' && sh === 'auto') th = tw / ratio
      if (source && sw === 'auto' && sh !== 'auto') tw = th * ratio
    }
    if (!(tw >= 0.5 && th >= 0.5)) continue
    const [ox, oy] = placeOf(positions[n % positions.length] ?? '0% 0%', area.w - tw, area.h - th)
    const repeat = repeats[n % repeats.length] ?? 'repeat'
    const [repeatX, repeatY = repeatX] = repeat.split(' ')
    const tilesX = repeat !== 'repeat-y' && repeatX !== 'no-repeat'
    const tilesY = repeat !== 'repeat-x' && repeatY !== 'no-repeat'
    // Only the tiles that reach the visible part.
    const x0 = area.x + ox
    const y0 = area.y + oy
    const i0 = tilesX ? Math.floor((bounds.x - x0) / tw) : 0
    const i1 = tilesX ? Math.floor((bounds.x + bounds.w - x0 - 0.01) / tw) : 0
    const j0 = tilesY ? Math.floor((bounds.y - y0) / th) : 0
    const j1 = tilesY ? Math.floor((bounds.y + bounds.h - y0 - 0.01) / th) : 0
    // A very fine pattern blurs to nothing under glass: not worth hundreds of tiles.
    if ((i1 - i0 + 1) * (j1 - j0 + 1) > 400) continue
    try {
      for (let j = j0; j <= j1; j++) {
        for (let i = i0; i <= i1; i++) {
          ctx.save()
          ctx.translate(x0 + i * tw, y0 + j * th)
          if (source) ctx.drawImage(source, 0, 0, tw, th)
          else fillGradient(ctx, image as Gradient, tw, th)
          ctx.restore()
        }
      }
    } catch {
      // A colour this browser's canvas cannot parse: the layer is left out
      // (the gradient is built before anything else is saved, so one restore is owed).
      ctx.restore()
    }
  }
}

// ── Text and backdrop blur ───────────────────────────────────────────────────

/** Draws one text node line by line, where the page laid it out and in its own font. */
function drawText(
  ctx: CanvasRenderingContext2D,
  node: Text,
  style: CSSStyleDeclaration,
  originX: number,
  originY: number,
  lang: string | undefined,
  isVisible: (rect: DOMRect) => boolean,
) {
  const raw = node.textContent ?? ''
  let text = raw.replace(/\s+/g, ' ').trim()
  if (!text) return
  const range = document.createRange()
  range.selectNodeContents(node)
  const lines = [...range.getClientRects()].filter((rect) => rect.width > 0.5)
  if (!lines.length) return
  // The page shows the transformed text. Upper and lower case follow the page's
  // language (Turkish i → İ); browsers capitalise without it.
  const transform = style.textTransform
  if (transform === 'uppercase') text = text.toLocaleUpperCase(lang)
  else if (transform === 'lowercase') text = text.toLocaleLowerCase(lang)
  else if (transform === 'capitalize') text = text.replace(/(^|\s)(\S)/g, (_, gap: string, letter: string) => gap + letter.toUpperCase())
  const rtl = style.direction === 'rtl'
  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing
  ctx.direction = rtl ? 'rtl' : 'ltr'
  ctx.textAlign = 'left'
  ctx.fillStyle = style.color
  ctx.textBaseline = 'alphabetic'
  const metrics = ctx.measureText('Hgİş')
  const ascent = metrics.fontBoundingBoxAscent
  const descent = metrics.fontBoundingBoxDescent
  const space = ctx.measureText(' ').width
  // Fill each line with as many words as fit (a single line takes them all).
  const words = text.split(' ')
  let next = 0
  lines.forEach((rect, i) => {
    let line = ''
    if (i === lines.length - 1) line = words.slice(next).join(' ')
    else {
      while (next < words.length) {
        const candidate = line ? `${line} ${words[next]}` : words[next]
        if (line && ctx.measureText(candidate).width > rect.width + 1) break
        line = candidate
        next++
      }
    }
    if (!line || !isVisible(rect)) return
    // A leading space takes room only after an inline neighbour (not at the start of a
    // block): then the line box is wider than its words, and the text starts further in.
    const lead = i === 0 && !rtl && /^\s/.test(raw) && rect.width - ctx.measureText(line).width > space * 0.5 ? space : 0
    const baseline = rect.top - originY + (rect.height - (ascent + descent)) / 2 + ascent
    ctx.fillText(line, rect.left - originX + lead, baseline)
  })
}

let scratch: HTMLCanvasElement | undefined

/**
 * Blurs a box of the canvas in place (the counterpart of `backdrop-filter: blur()`).
 * Like CSS, only what is inside the box is blurred and its edge pixels repeat outwards,
 * so content next to a frosted bar does not bleed into it.
 */
function blurBackdrop(ctx: CanvasRenderingContext2D, box: Box, radius: number, blurPx: number) {
  const matrix = ctx.getTransform()
  const scale = matrix.a
  const left = Math.max(0, Math.floor(box.x * scale + matrix.e))
  const top = Math.max(0, Math.floor(box.y * scale + matrix.f))
  const w = Math.min(ctx.canvas.width, Math.ceil((box.x + box.w) * scale + matrix.e)) - left
  const h = Math.min(ctx.canvas.height, Math.ceil((box.y + box.h) * scale + matrix.f)) - top
  if (w < 1 || h < 1) return
  const pad = Math.ceil(blurPx * scale * 3)
  scratch ??= document.createElement('canvas')
  scratch.width = w + 2 * pad
  scratch.height = h + 2 * pad
  const copy = scratch.getContext('2d')
  if (!copy) return
  copy.imageSmoothingEnabled = false
  copy.drawImage(ctx.canvas, left, top, w, h, pad, pad, w, h)
  copy.drawImage(scratch, pad, pad, 1, h, 0, pad, pad, h)
  copy.drawImage(scratch, pad + w - 1, pad, 1, h, pad + w, pad, pad, h)
  copy.drawImage(scratch, 0, pad, w + 2 * pad, 1, 0, 0, w + 2 * pad, pad)
  copy.drawImage(scratch, 0, pad + h - 1, w + 2 * pad, 1, 0, pad + h, w + 2 * pad, pad)
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(box.x, box.y, box.w, box.h, radius)
  ctx.clip()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1
  ctx.clearRect(left, top, w, h)
  ctx.filter = `blur(${blurPx * scale}px)`
  ctx.drawImage(scratch, left - pad, top - pad)
  ctx.restore()
}

// ── The walk ─────────────────────────────────────────────────────────────────

/**
 * Where a child paints among its siblings (CSS 2.1 appendix E, per parent):
 * 0 negative z-index, 1 content in the flow, 2 positioned and stacking boxes, 3 positive z-index.
 */
function layerOf(style: CSSStyleDeclaration, inFlexOrGrid: boolean): [layer: number, z: number] {
  const positioned = style.position !== 'static'
  const z = (positioned || inFlexOrGrid) && style.zIndex !== 'auto' ? parseInt(style.zIndex, 10) || 0 : 0
  if (z) return [z < 0 ? 0 : 3, z]
  const stacks =
    positioned ||
    style.opacity !== '1' ||
    style.transform !== 'none' ||
    style.filter !== 'none' ||
    style.isolation === 'isolate' ||
    (style.backdropFilter || 'none') !== 'none'
  return [stacks ? 2 : 1, 0]
}

export type DomSnapshotOptions = {
  /**
   * The viewport point that lands on the context's origin, in CSS px.
   * Pass a `getBoundingClientRect()` result; only `left` and `top` are read.
   */
  origin: { left: number; top: number }
  /** Visit only elements whose box intersects this viewport rectangle. */
  region?: { left: number; top: number; right: number; bottom: number }
  /** Return true to leave an element and everything inside it out. */
  skip?: (element: Element) => boolean
  /** Called when an image or an SVG that was not ready has loaded: draw again. */
  onStale?: () => void
  /** Any string that changes when icon colours may have changed, such as the theme name. */
  cacheKey?: string
}

/**
 * Paints `root` and everything inside it into `ctx`. The context must already be
 * scaled so that one unit is one CSS px. Boxes that clip their overflow clip their
 * children; fixed and sticky elements are painted last, on top.
 */
/** A computed `clip-path` of the `inset()` or `path()` kind as a canvas path; anything else is not clipped. */
function clipShape(value: string, box: Box): Path2D | null {
  if (!value || value === 'none') return null
  // [\s\S] in place of the `s` flag, which the catalog's ES target lacks. [port]
  const path = /^path\((?:[a-z-]+\s*,\s*)?["']([\s\S]*)["']\)$/.exec(value)
  if (path) {
    const shape = new Path2D()
    shape.addPath(new Path2D(path[1]), new DOMMatrix().translate(box.x, box.y))
    return shape
  }
  const inset = /^inset\(([\s\S]*)\)$/.exec(value)
  if (!inset) return null
  const [sides, round = ''] = inset[1].split(/\s+round\s+/)
  const length = (token: string, of: number) => (token.endsWith('%') ? (parseFloat(token) / 100) * of : parseFloat(token) || 0)
  const t = sides.trim().split(/\s+/)
  const top = length(t[0], box.h)
  const right = length(t[1] ?? t[0], box.w)
  const bottom = length(t[2] ?? t[0], box.h)
  const left = length(t[3] ?? t[1] ?? t[0], box.w)
  const w = Math.max(0, box.w - left - right)
  const h = Math.max(0, box.h - top - bottom)
  const shape = new Path2D()
  shape.roundRect(box.x + left, box.y + top, w, h, Math.min(round ? length(round.trim().split(/\s+/)[0], Math.min(w, h)) : 0, w / 2, h / 2))
  return shape
}

export function drawDom(ctx: CanvasRenderingContext2D, root: Element, options: DomSnapshotOptions) {
  const { origin, region, skip, onStale, cacheKey = document.documentElement.className } = options
  const originX = origin.left
  const originY = origin.top
  const deferred: { element: Element; opacity: number }[] = []
  const intersects = (rect: DOMRect) =>
    !region || (rect.right > region.left && rect.left < region.right && rect.bottom > region.top && rect.top < region.bottom)
  let lang: string | undefined
  try {
    lang = Intl.getCanonicalLocales(document.documentElement.lang)[0]
  } catch {
    // Not a language tag: the default locale's rules apply.
  }

  const walk = (element: Element, parentOpacity: number, isDeferred = false, style = getComputedStyle(element)) => {
    if (skip?.(element)) return
    if (style.display === 'none' || style.visibility === 'hidden') return
    const opacity = parentOpacity * Number(style.opacity)
    if (opacity < 0.01) return
    if (!isDeferred && element !== root && (style.position === 'fixed' || style.position === 'sticky')) {
      deferred.push({ element, opacity: parentOpacity })
      return
    }
    const drawChildren = () => {
      const inFlexOrGrid = /flex|grid/.test(style.display)
      const children = [...element.childNodes].map((node) => {
        const childStyle = node instanceof Element ? getComputedStyle(node) : null
        const [layer, z] = childStyle ? layerOf(childStyle, inFlexOrGrid) : [1, 0]
        return { node, childStyle, layer, z }
      })
      // The sort is stable: within a layer, document order.
      children.sort((a, b) => a.layer - b.layer || a.z - b.z)
      for (const { node, childStyle } of children) {
        if (childStyle) walk(node as Element, opacity, false, childStyle)
        else if (node.nodeType === Node.TEXT_NODE) {
          ctx.globalAlpha = opacity
          drawText(ctx, node as Text, style, originX, originY, lang, intersects)
        }
      }
    }
    if (style.display === 'contents') {
      drawChildren()
      return
    }
    const rect = element.getBoundingClientRect()
    // Screen-reader-only text (a 1 px square) and empty boxes are not painted, a hairline is;
    // nothing outside the region is visited.
    if (rect.width <= 0 || rect.height <= 0 || (rect.width <= 1 && rect.height <= 1) || !intersects(rect)) return
    const box: Box = { x: rect.left - originX, y: rect.top - originY, w: rect.width, h: rect.height }
    // A `clip-path` (inset or path) cuts the box and everything inside it, as on screen.
    const shape = clipShape(style.clipPath, box)
    if (shape) {
      ctx.save()
      ctx.clip(shape)
    }
    try {
      paintBox(element, style, rect, box, opacity, drawChildren)
    } finally {
      if (shape) ctx.restore()
    }
  }
  const paintBox = (element: Element, style: CSSStyleDeclaration, rect: DOMRect, box: Box, opacity: number, drawChildren: () => void) => {
    const radius = Math.min(parseFloat(style.borderTopLeftRadius) || 0, rect.width / 2, rect.height / 2)
    // Frosted veil (backdrop-filter: blur): blur what is already painted beneath it first,
    // otherwise text behind a translucent veil shows up sharp in the glass.
    const backdropBlur = /blur\(([\d.]+)px\)/.exec(style.backdropFilter)
    if (backdropBlur) blurBackdrop(ctx, box, radius, Number(backdropBlur[1]))
    ctx.globalAlpha = opacity
    // `background-clip: text` paints the background inside the letters only: no box.
    const hasBox = style.backgroundClip !== 'text'
    if (hasBox && isVisibleColor(style.backgroundColor)) {
      ctx.beginPath()
      ctx.roundRect(box.x, box.y, box.w, box.h, radius)
      ctx.fillStyle = style.backgroundColor
      ctx.fill()
    }
    if (hasBox && style.backgroundImage !== 'none') {
      // The part of the box inside the region: only the tiles that reach it are painted.
      const bounds = { ...box }
      if (region) {
        bounds.x = Math.max(box.x, region.left - originX)
        bounds.y = Math.max(box.y, region.top - originY)
        bounds.w = Math.min(box.x + box.w, region.right - originX) - bounds.x
        bounds.h = Math.min(box.y + box.h, region.bottom - originY) - bounds.y
      }
      // A fixed background is laid out in the viewport, whatever the element's box.
      const area: Box = style.backgroundAttachment.includes('fixed') ? { x: -originX, y: -originY, w: innerWidth, h: innerHeight } : box
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(box.x, box.y, box.w, box.h, radius)
      ctx.clip()
      paintBackgrounds(ctx, style, area, bounds, onStale)
      ctx.restore()
    }
    const borderWidth = parseFloat(style.borderTopWidth) || 0
    if (borderWidth > 0 && style.borderTopStyle !== 'none' && isVisibleColor(style.borderTopColor)) {
      ctx.beginPath()
      ctx.roundRect(box.x + borderWidth / 2, box.y + borderWidth / 2, box.w - borderWidth, box.h - borderWidth, Math.max(0, radius - borderWidth / 2))
      ctx.lineWidth = borderWidth
      ctx.strokeStyle = style.borderTopColor
      ctx.setLineDash(style.borderTopStyle === 'dashed' ? [4, 3] : [])
      ctx.stroke()
      ctx.setLineDash([])
    }
    if (element instanceof SVGSVGElement) {
      drawSvg(ctx, element, style.color, box, onStale, cacheKey)
      return
    }
    if (element instanceof HTMLCanvasElement) {
      if (element.width && element.height && isClean(element)) ctx.drawImage(element, box.x, box.y, box.w, box.h)
      return
    }
    if (element instanceof HTMLImageElement) {
      const src = element.currentSrc || element.src
      if (!src) return
      // The element itself when the canvas stays readable, otherwise our own CORS copy.
      const image = element.complete && element.naturalWidth && isClean(element, src) ? element : imageCopy(src)
      if (isLoaded(image, onStale) && isClean(image, src)) drawFitted(ctx, image, image.naturalWidth, image.naturalHeight, box, radius, style)
      return
    }
    if (element instanceof HTMLVideoElement) {
      // The current frame; `live` glass follows the playback.
      if (element.readyState >= 2 && element.videoWidth && isClean(element, element.currentSrc)) drawFitted(ctx, element, element.videoWidth, element.videoHeight, box, radius, style)
      return
    }
    const clips = element !== root && style.overflow !== 'visible' && element !== document.body && element !== document.documentElement
    if (clips) {
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(box.x, box.y, box.w, box.h, radius)
      ctx.clip()
    }
    drawChildren()
    if (clips) ctx.restore()
  }
  walk(root, 1)
  for (let i = 0; i < deferred.length; i++) walk(deferred[i].element, deferred[i].opacity, true)
  ctx.globalAlpha = 1
}
