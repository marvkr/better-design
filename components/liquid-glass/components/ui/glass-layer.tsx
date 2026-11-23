'use client'

// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// GlassLayer — turns any positioned element (a button, a link, a pill) into liquid glass.
// Put it as the FIRST child of the host and mark the host with `data-glass-host`:
//
//   <a data-glass-host href="/start" className="… rounded-full px-6 h-12">
//     <GlassLayer material="clear" />
//     Get started <ArrowRight />
//   </a>
//
// The host keeps its own CSS look until the first glass frame is drawn, then the layer
// sets `data-glass-ready` and the host drops its background, border and shadow (the
// glass now draws them). Without WebGL2 nothing changes: the CSS look stays. Clear glass
// also sets `data-glass-tone="light" | "dark"` from the colour it ends up, for the text.
//
// Hover swells the glass with wobbly springs and press grows it (the host scales with it);
// `swell={false}` keeps it still, as a card's glass is. `blur` frosts what clear glass shows.
// The gooey droplet (used only by GlassActionButton): the host's direct child marked
// `data-glass-drop` sits at the end, and the glass separates around it (`apart`) or melts
// back into one body (`merged`). Switching between the two animates. COPY VERBATIM.
// MIT — https://github.com/bilalgursen/liquid-glass

import { useEffect, useRef } from 'react'

import { drawDom } from './glass-dom-snapshot'
import {
  DESIGN_HEIGHT,
  SPRINGS,
  clamp,
  getGlassEngine,
  lerp,
  mixRgb,
  rgbCss,
  smooth,
  stepSpring,
  surfaceColorOf,
  type GlassView,
  type Rgb,
  type Spring,
} from './glass-engine'

export type GlassMaterial = 'clear' | 'tinted'
export type GlassDroplet = 'none' | 'apart' | 'merged'

/**
 * Fine-tuning of the glass. Read on every frame: changing a value redraws the glass without
 * rebuilding it, so it can follow a slider. Colours and frost apply to clear glass.
 */
export type GlassOptics = {
  /** Tint colour, any CSS colour. Default: white on a light page, black on a dark one. */
  tintColor?: string
  /** A line just inside the rim: its colour, opacity (0–1, default 0: none) and width in px (default 1). */
  borderColor?: string
  borderAlpha?: number
  borderWidth?: number
  /** With `blur`: how much of the frost shows over the sharp bend (0–1, default 1). */
  frostMix?: number
  /** With `blur`: × the frost at the rim, where the glass bends (default 1). */
  frostEdge?: number
  /** Saturation of what shows through the glass (default 1; 1.5 = more vivid, 0 = grey). */
  saturation?: number
  /** Without frost: blur of the clear glass in its middle and at its rim, in mip levels (default 0.35 and 2.2). */
  clearBlur?: number
  clearBlurEdge?: number
  /** The bend at the rim, × the kit's own (default 1). */
  refraction?: number
  /**
   * How the rim bends. `edge` (default): along the rim, as deep as the bevel. `radial`: towards
   * the centre, by 6.5% of the viewport × `refraction`, fading over half the glass (`bendCurve`
   * sets how fast, `bendDepth` how far), and the frost blurs the bent picture: the SVG card's rim.
   */
  bendMode?: 'edge' | 'radial'
  /** × how far in from the rim the bend reaches (default 1). */
  bendDepth?: number
  /** How sharply the bend falls off from the rim inwards, an exponent (default 1.6; higher = tighter to the rim). */
  bendCurve?: number
  /** Colour split at the rim (default 0.12). */
  dispersion?: number
  /** Magnification of the middle (default 0). */
  magnify?: number
  /** Light on the glass, all of it (default 1). */
  light?: number
  /** × the rim light (default 1) and × its line's thickness (default 1). */
  rim?: number
  rimWidth?: number
  /** × the width of the bevel that shades the rim (default 1). */
  bevel?: number
  /** × the fresnel glow, inner shading, top reflection and warm caustic (each default 1). */
  fresnel?: number
  inner?: number
  reflection?: number
  caustic?: number
  /** The rim light leans towards the cursor (default true). */
  cursorLight?: boolean
  /** The drop shadow: × its strength, softness and offset (each default 1). */
  shadow?: number
  shadowSoftness?: number
  shadowOffset?: number
  /** Dark glass (a black tint, on a dark page): its own tint cover (in place of `tint`) and rim line. Unset values follow the rest. */
  dark?: { tint?: number; borderColor?: string; borderAlpha?: number }
}

export type GlassLayerProps = {
  /**
   * `clear`: transparent glass that bends the page behind it (default).
   * `tinted`: glass painted in the host's own CSS background colour, with light and shadow.
   */
  material?: GlassMaterial
  /**
   * The host's `[data-glass-drop]` child as a gooey droplet: `apart` (separated; it melts in
   * while pressed) or `merged` (one body). Changing it animates the split or the merge. Default `none`.
   */
  droplet?: GlassDroplet
  /** Clear glass: how much of the tint covers the backdrop (0 = invisible, 1 = solid). */
  tint?: number
  /** Clear glass: frost the backdrop with a blur of this many px, like CSS `blur()` (default 0: sharp). */
  blur?: number
  /** Clear glass: CSS selector of the ancestor whose content is refracted (default: the page). */
  backdrop?: string
  /** Clear glass: repaint the backdrop every frame (for animated content behind the glass). */
  live?: boolean
  /** Listen for hover/press on this ancestor instead of the host (e.g. a whole card link). */
  trigger?: string
  /** Turn the glass off and keep the host's CSS look. */
  disabled?: boolean
  /** Swell on hover and grow when pressed (default). `false` keeps the glass still under the pointer. */
  swell?: boolean
  /** Fine-tuning: tint colour, a rim line, frost mix, bend, light and shadow (see GlassOptics). */
  optics?: GlassOptics
}

/** Size of the hover/press response. Matches the kit's Button. */
const PRESS_SCALE = 1.08
const HOVER_SCALE = 1.04
const HOVER_GROW = 0.08
const MAX_GROW_PX = 6
/** Gap between the separated droplet and the body, as a share of the height. */
const DROPLET_GAP = 0.25

/** The CSS the glass relies on. Rendered once per page by <GlassStyles /> (React 19 dedupes it). */
export const GLASS_CSS = `
/* Layered, so a utility class on the host (absolute, fixed) still wins over relative. */
@layer components{:where([data-glass-host]){position:relative;isolation:isolate}}
/* Unlayered on purpose: once the glass draws, it must beat the host's own fill utilities. */
[data-glass-host][data-glass-ready]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
@keyframes glass-marquee{to{transform:translateX(-50%)}}
[data-glass-marquee]{animation:glass-marquee var(--glass-marquee-duration,5s) linear infinite}
/* Swapped labels and icons rise from a soft blur; a check draws itself in. */
@keyframes glass-in{from{opacity:0;filter:blur(3px);transform:translateY(4px)}}
[data-glass-in]{animation:glass-in .38s cubic-bezier(.2,.8,.2,1) both}
@keyframes glass-draw{from{stroke-dashoffset:25}}
[data-glass-draw]{stroke-dasharray:25;animation:glass-draw .42s cubic-bezier(.65,0,.35,1) .12s both}
@keyframes glass-spin{to{transform:rotate(1turn)}}
[data-glass-spin]{animation:glass-spin .8s linear infinite}
[data-glass-ready] [data-glass-fallback]{visibility:hidden}
@media (prefers-reduced-motion:reduce){[data-glass-marquee],[data-glass-in],[data-glass-draw],[data-glass-spin]{animation:none}}
`

/** Injects GLASS_CSS once (React 19 hoists and dedupes `<style href precedence>`). */
export function GlassStyles() {
  return (
    <style href="liquid-glass" precedence="default">
      {GLASS_CSS}
    </style>
  )
}

export function GlassLayer({
  material = 'clear',
  droplet = 'none',
  tint = 0.6,
  blur = 0,
  backdrop,
  live = false,
  trigger,
  disabled = false,
  swell = true,
  optics,
}: GlassLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // The droplet mode changes without rebuilding the glass, so the change itself animates.
  const dropletRef = useRef(droplet)
  dropletRef.current = droplet
  // Tint, frost and optics are read on every frame: changing them redraws, never rebuilds.
  const tuneRef = useRef({ tint, blur, optics })
  tuneRef.current = { tint, blur, optics }
  const pokeRef = useRef<(() => void) | null>(null)
  useEffect(() => pokeRef.current?.(), [droplet, tint, blur, optics])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    const engine = disabled ? null : getGlassEngine()
    if (!canvas || !host || !ctx || !engine) return

    const clear = material === 'clear'
    let w = 0
    let h = 0
    let hasDroplet = false
    /** The host's own corner radius in px; null = a pill. */
    let corner: number | null = null
    let surface: Rgb = [1, 1, 1]
    // Colours come from the host's own CSS (rest, hover, selected…) and cross-fade.
    let color: [Rgb, Rgb] = [
      [1, 1, 1],
      [1, 1, 1],
    ]
    let border: [Rgb, Rgb] | null = null
    /** Clear glass: opacity of the optional rim line (GlassOptics). */
    let borderAlpha = 1
    /** Clear glass: the tint ended up dark (optics.dark applies). */
    let darkGlass = false
    let colorT = 1
    let unpaintable = false
    let sampled = false
    let pressed = false
    let hovered = false
    let ready = false
    const page = { canvas: document.createElement('canvas'), ctx: null as CanvasRenderingContext2D | null, key: '', at: 0, stale: true }
    const press: Spring = { x: 0, v: 0 }
    const growX: Spring = { x: 0, v: 0 }
    const growY: Spring = { x: 0, v: 0 }
    const scale: Spring = { x: 1, v: 0 }
    const drop: Spring = { x: 0, v: 0 }
    const maxScale = () => 1 + (2 * MAX_GROW_PX) / Math.max(w, 1)

    const view: GlassView = {
      canvas,
      ctx,
      dirty: true,
      visible: false,
      step: (dt, still) => {
        if (still) {
          press.x = growX.x = growY.x = press.v = growX.v = growY.v = 0
          drop.x = hasDroplet && dropletRef.current === 'apart' ? 1 : 0
          drop.v = 0
          scale.x = 1
          host.style.scale = ''
          if (colorT !== 1) view.dirty = true
          colorT = 1
          return false
        }
        const hov = hovered ? 1 : 0
        const target = pressed ? Math.min(PRESS_SCALE, maxScale()) : hovered ? Math.min(HOVER_SCALE, maxScale()) : 1
        const a = stepSpring(press, pressed ? 1 : 0, SPRINGS.press, dt)
        const b = stepSpring(growX, hov, SPRINGS.hoverX, dt)
        const c = stepSpring(growY, hov, SPRINGS.hoverY, dt)
        const d = stepSpring(scale, target, SPRINGS.press, dt)
        const apart = dropletRef.current === 'apart' && view.visible && !pressed
        const e = hasDroplet ? stepSpring(drop, apart ? 1 : 0, apart ? SPRINGS.dropletOut : SPRINGS.dropletIn, dt) : false
        host.style.scale = scale.x === 1 ? '' : scale.x.toFixed(4)
        const fading = 1 - colorT > 0.004
        colorT = fading ? colorT + (1 - colorT) * Math.min(1, dt * 14) : 1
        return a || b || c || d || e || fading || (clear && live && view.visible)
      },
      lens: (refresh) => {
        if (refresh) {
          w = host.offsetWidth
          h = host.offsetHeight
          // The glass takes the host's corners (`rounded-lg`); round enough is a pill.
          const rounding = getComputedStyle(host).borderTopLeftRadius
          const px = rounding.endsWith('%') ? (Math.min(w, h) * parseFloat(rounding)) / 100 : parseFloat(rounding) || 0
          corner = px >= Math.min(w, h) / 2 - 0.5 ? null : px
          // The droplet: a direct child marked `data-glass-drop`, laid out by its owner at the end.
          const had = hasDroplet
          hasDroplet = dropletRef.current !== 'none' && [...host.children].some((c) => c.hasAttribute('data-glass-drop'))
          // Springs step before shapes are read: one more frame lets the droplet start moving.
          if (hasDroplet !== had) engine.wake()
          const s = engine.resolveColor(surfaceColorOf(host.parentElement))
          surface = [s[0], s[1], s[2]]
          if (clear) {
            const o = tuneRef.current.optics
            const custom = o?.tintColor || getComputedStyle(host).getPropertyValue('--glass-tint').trim()
            const luminance = 0.2126 * surface[0] + 0.7152 * surface[1] + 0.0722 * surface[2]
            const t = custom ? engine.resolveColor(custom) : null
            const tc: Rgb = t ? [t[0], t[1], t[2]] : luminance > 0.5 ? [1, 1, 1] : [0, 0, 0]
            // Light or dark glass: lets the host pick a readable text colour (data-[glass-tone=…]:).
            const tone = 0.2126 * tc[0] + 0.7152 * tc[1] + 0.0722 * tc[2] > 0.5 ? 'light' : 'dark'
            if (host.dataset.glassTone !== tone) host.dataset.glassTone = tone
            darkGlass = tone === 'dark'
            color = [tc, tc]
            // An optional line just inside the rim.
            const line = darkGlass ? { ...o, ...o?.dark } : o
            const bc = line?.borderColor && (line.borderAlpha ?? 0) > 0 ? engine.resolveColor(line.borderColor) : null
            border = bc ? [[bc[0], bc[1], bc[2]], [bc[0], bc[1], bc[2]]] : null
            borderAlpha = bc ? clamp((line?.borderAlpha ?? 0) * bc[3]) : 1
            colorT = 1
            sampled = true
          } else {
            // Read the host's own fill and border with the glass briefly lifted.
            const had = 'glassReady' in host.dataset
            const transition = host.style.transition
            host.style.transition = 'none'
            if (had) delete host.dataset.glassReady
            const st = getComputedStyle(host)
            const fill = engine.resolveColor(st.backgroundColor)
            const bw = st.borderTopStyle === 'solid' ? parseFloat(st.borderTopWidth) || 0 : 0
            const bc = engine.resolveColor(st.borderTopColor)
            const cannot = st.backgroundImage !== 'none' || (st.borderTopStyle !== 'solid' && st.borderTopStyle !== 'none')
            if (had) {
              host.dataset.glassReady = ''
              void getComputedStyle(host).backgroundColor
            }
            host.style.transition = transition
            const next = mixRgb(surface, [fill[0], fill[1], fill[2]], fill[3])
            const nextBorder: Rgb | null = bw > 0 && bc[3] > 0.02 ? mixRgb(next, [bc[0], bc[1], bc[2]], bc[3]) : null
            unpaintable = cannot || (fill[3] < 0.02 && !nextBorder)
            const now = sampled ? mixRgb(color[0], color[1], colorT) : next
            const nowBorder = sampled && border ? mixRgb(border[0], border[1], colorT) : (nextBorder ?? next)
            const changed = sampled && (now.some((v, i) => Math.abs(v - next[i]) > 0.004) || !!border !== !!nextBorder)
            color = [now, next]
            border = nextBorder ? [nowBorder, nextBorder] : null
            colorT = changed ? 0 : 1
            sampled = true
            if (changed) engine.wake()
          }
        }
        if (w < 2 || h < 2) return null
        if (unpaintable) {
          if (ready) {
            ready = false
            delete host.dataset.glassReady
          }
          return null
        }
        const padX = 8
        const padTop = 10
        const padBottom = Math.round(h * 0.8 + 4)
        // The host itself is scaled; the glass inside the canvas is divided by that scale.
        const p = clamp(press.x, -0.12, 1.15)
        const s = Math.max(0.5, scale.x)
        const k = lerp(1, Math.min(PRESS_SCALE, maxScale()), p) / s
        const grow = (h * HOVER_GROW) / s
        const t = hasDroplet ? clamp(drop.x, 0, 1.06) : 0
        const pull = h * (1 + DROPLET_GAP) * t
        const hy = (h / 2) * k + grow * growY.x
        const rect = host.getBoundingClientRect()
        const pc = clamp(press.x)
        const unit = h / DESIGN_HEIGHT
        const bevel = lerp(DESIGN_HEIGHT * 0.42, 62, pc)
        // Square corners swell with the glass.
        const radius = corner === null ? 999 : corner * (hy / (h / 2))
        const { tint, blur, optics: o } = tuneRef.current
        // The engine scales the shadow with the light too; divide it back out, so they tune apart.
        const strength = Math.max(clamp(o?.light ?? 1, 0, 3), 1e-4)
        return {
          // The canvas is placed against the padding box; the glass is measured on the border box.
          left: -padX - host.clientLeft,
          top: -padTop - host.clientTop,
          width: w + 2 * padX,
          height: h + padTop + padBottom,
          unit,
          cx: padX + w / 2,
          cy: padTop + h / 2,
          hx: (w / 2 - pull / 2) * k + grow * growX.x,
          hy,
          radius,
          bodyX: (-pull / 2) * k,
          droplet:
            t > 0.001
              ? {
                  x: (w / 2 - h / 2) * k + grow * growX.x * 0.5,
                  r: hy,
                  // The gooey bridge opens as the droplet leaves and closes once it has snapped.
                  k: h * 0.34 * smooth(0, 0.15, t) * (1 - smooth(0.8, 1, t)),
                }
              : undefined,
          // Shading bands deeper than a square corner would meet in diagonal seams: the bevel
          // stays within the corner, and the bend keeps the depth it has on a pill.
          bevel: (corner === null ? bevel : Math.min(bevel, (radius / unit) * 1.2)) * Math.max(0.05, o?.bevel ?? 1),
          band: corner === null || hasDroplet ? undefined : bevel * 0.35 * Math.max(0.05, o?.bendDepth ?? 1),
          shadow: (0.12 * lerp(0.55, 1, pc) * Math.max(0, o?.shadow ?? 1)) / strength,
          shadowSoftness: 34 * lerp(0.6, 1, pc) * Math.max(0.05, o?.shadowSoftness ?? 1),
          shadowOffset: 22 * lerp(0.5, 1, pc) * Math.max(0, o?.shadowOffset ?? 1),
          strength,
          tune: o && {
            rim: o.rim,
            rimWidth: o.rimWidth,
            fresnel: o.fresnel,
            inner: o.inner,
            reflection: o.reflection,
            caustic: o.caustic,
            bendCurve: o.bendCurve,
            bendDepth: o.bendDepth,
            saturation: o.saturation,
            frostEdge: o.frostEdge,
          },
          color: mixRgb(color[0], color[1], colorT),
          border: border ? mixRgb(border[0], border[1], colorT) : undefined,
          borderAlpha: clear ? borderAlpha : undefined,
          borderWidth: clear ? o?.borderWidth : undefined,
          surface,
          edgeClear: 0.2,
          cursorLight: o?.cursorLight ?? true,
          refraction: clear
            ? {
                paint: (back) => {
                  back.translate(padX, padTop)
                  back.fillStyle = rgbCss(surface)
                  back.fillRect(-padX, -padTop, w + 2 * padX, h + padTop + padBottom)
                  const root = (backdrop ? host.closest(backdrop) : null) ?? document.body
                  const r = host.getBoundingClientRect()
                  const lx = r.left + (r.width - w) / 2
                  const ly = r.top + (r.height - h) / 2
                  const target = back.canvas
                  const key = `${target.width}:${target.height}:${Math.round(lx * 2)}:${Math.round(ly * 2)}:${Math.round(scrollX)}:${Math.round(scrollY)}`
                  const now = performance.now()
                  if (!page.ctx) page.ctx = page.canvas.getContext('2d')
                  // The page is re-painted when the glass moves, on scroll, and at most every 120 ms otherwise.
                  if (page.ctx && (live || page.stale || key !== page.key || now - page.at > 120)) {
                    page.stale = false
                    page.key = key
                    page.at = now
                    if (page.canvas.width !== target.width || page.canvas.height !== target.height) {
                      page.canvas.width = target.width
                      page.canvas.height = target.height
                    }
                    const pc2 = page.ctx
                    pc2.setTransform(1, 0, 0, 1, 0, 0)
                    pc2.clearRect(0, 0, target.width, target.height)
                    pc2.setTransform(back.getTransform())
                    drawDom(pc2, root, {
                      origin: { left: lx, top: ly },
                      region: { left: lx - padX, top: ly - padTop, right: lx + w + padX, bottom: ly + h + padBottom },
                      skip: (el) => el === host || el.hasAttribute('data-glass-skip'),
                      onStale: () => {
                        page.stale = true
                        view.dirty = true
                        engine.wake()
                      },
                    })
                  }
                  back.save()
                  back.setTransform(1, 0, 0, 1, 0, 0)
                  back.drawImage(page.canvas, 0, 0)
                  back.restore()
                },
                refract: lerp(44, 37, pc) * Math.max(0, o?.refraction ?? 1),
                magnify: Math.max(0, o?.magnify ?? 0),
                dispersion: Math.max(0, o?.dispersion ?? 0.12),
                blurCenter: Math.max(0, o?.clearBlur ?? 0.35),
                blurEdge: Math.max(0, o?.clearBlurEdge ?? 2.2),
                frost: clamp(darkGlass ? (o?.dark?.tint ?? tint) : tint),
                blur,
                blurMix: o?.frostMix,
                radial: o?.bendMode === 'radial' ? 0.065 * Math.max(0, o?.refraction ?? 1) : undefined,
              }
            : undefined,
          screenX: rect.left + rect.width / 2,
          screenY: rect.top + rect.height / 2,
        }
      },
      drawn: () => {
        if (ready) return
        ready = true
        host.dataset.glassReady = ''
      },
      lost: () => {
        delete host.dataset.glassReady
        host.style.scale = ''
      },
    }

    const isDisabled = () => host.matches(":disabled, [aria-disabled='true']")
    const dirty = () => {
      view.dirty = true
      engine.wake()
    }
    pokeRef.current = dirty
    const onDown = () => {
      if (!swell || isDisabled()) return
      pressed = true
      engine.wake()
    }
    const onUp = () => {
      pressed = false
      engine.wake()
    }
    const onEnter = (e: PointerEvent) => {
      if (!swell || e.pointerType !== 'mouse' || isDisabled()) return
      hovered = true
      dirty()
    }
    const onLeave = () => {
      pressed = false
      hovered = false
      dirty()
    }
    const target: HTMLElement = (trigger ? host.closest<HTMLElement>(trigger) : null) ?? host
    target.addEventListener('pointerdown', onDown)
    target.addEventListener('pointerup', onUp)
    target.addEventListener('pointercancel', onUp)
    target.addEventListener('pointerenter', onEnter)
    target.addEventListener('pointerleave', onLeave)
    const io = new IntersectionObserver(([entry]) => {
      view.visible = entry.isIntersecting
      dirty()
    })
    io.observe(host)
    const ro = new ResizeObserver(dirty)
    ro.observe(host)
    // Content changes (label, selected state) re-check the droplet and colours.
    const mo = new MutationObserver(dirty)
    mo.observe(host, {
      childList: true,
      attributes: true,
      attributeFilter: ['class', 'disabled', 'aria-pressed', 'aria-checked', 'aria-selected', 'aria-expanded', 'data-state'],
    })
    if (clear) addEventListener('scroll', dirty, { passive: true, capture: true })
    engine.add(view)

    return () => {
      engine.remove(view)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      removeEventListener('scroll', dirty, { capture: true })
      target.removeEventListener('pointerdown', onDown)
      target.removeEventListener('pointerup', onUp)
      target.removeEventListener('pointercancel', onUp)
      target.removeEventListener('pointerenter', onEnter)
      target.removeEventListener('pointerleave', onLeave)
      delete host.dataset.glassReady
      delete host.dataset.glassTone
      host.style.scale = ''
      pokeRef.current = null
    }
  }, [material, backdrop, live, trigger, disabled, swell])

  return (
    <>
      <GlassStyles />
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'absolute', zIndex: -1, maxWidth: 'none', pointerEvents: 'none', width: 0, height: 0 }}
      />
    </>
  )
}

export default GlassLayer
