// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// One shared WebGL2 renderer (three.js WebGPURenderer, WebGL backend + TSL) draws
// every glass control and copies the result into each control's own <canvas>, so a
// page full of controls never runs into the browser's GPU context limit.
//
// A view supplies its scene as two Canvas2D layers — `bg` (what sits beneath the
// glass: tracks, fills, labels) and `fg` (crisp content above it) — plus one lens in
// design units. The lens shader is a port of the hero slider's glass pass.
import * as THREE from 'three/webgpu'
import {
  Fn,
  abs,
  clamp,
  dot,
  exp,
  float,
  fwidth,
  length,
  max,
  min,
  mix,
  normalize,
  oneMinus,
  pow,
  smoothstep,
  sqrt,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  vec4,
} from 'three/tsl'

import type { LensState } from './glass-physics'
import { glassTokens, hexToRgb, type GlassThemeName, type GlassTokens } from './glass-tokens'

export type GlassViewSpec = {
  /** Canvas size in CSS px. */
  width: number
  height: number
  /** CSS px per design unit. */
  unit: number
  /** Advance animation; return true while anything still moves. */
  step?: (dt: number, reducedMotion: boolean) => boolean
  /** Paint both layers (contexts are cleared and scaled to CSS px) and return the lens. */
  draw: (bg: CanvasRenderingContext2D, fg: CanvasRenderingContext2D, tokens: GlassTokens, theme: GlassThemeName) => LensState
  /** 1 = foreground hides inside the clear lens so the refracted backdrop shows (segmented labels). */
  fgUnderLens?: number
  /** Rim highlight leans toward the cursor. Off = fixed studio lighting. */
  cursorLight?: boolean
  /** Redraw every frame even while nothing moves (the naive loop the site's demo compares against). */
  alwaysRender?: boolean
}

/** Running totals for one view: GPU passes and main-thread time spent in them. */
export type GlassViewStats = { renders: number; ms: number }

export type GlassViewHandle = {
  invalidate: () => void
  dispose: () => void
  stats: () => GlassViewStats
}

const SHADER_DPR_REF = 2.27 // device px per design unit of the hero slider on a typical laptop

type View = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  spec: () => GlassViewSpec
  bgCanvas: HTMLCanvasElement
  fgCanvas: HTMLCanvasElement
  bgTex: any
  fgTex: any
  scene: any
  material: any
  u: ReturnType<typeof createUniforms>
  devW: number
  devH: number
  dpr: number
  dirty: boolean
  visible: boolean
  ready: boolean
  /** Renders left to confirm the first frame really reached the canvas. */
  verifyLeft: number
  surface: string
  /** Last lens centre in design units, for aiming the cursor light. */
  lensX: number
  lensY: number
  renders: number
  renderMs: number
}

function createUniforms() {
  return {
    size: uniform(new THREE.Vector2(1, 1)),
    unit: uniform(1),
    devicePx: uniform(1),
    blurShift: uniform(0),
    center: uniform(new THREE.Vector2()),
    half: uniform(new THREE.Vector2(1, 1)),
    radius: uniform(1),
    bevel: uniform(1),
    refract: uniform(0),
    mag: uniform(0),
    disp: uniform(0),
    blurC: uniform(0.35),
    blurE: uniform(2.2),
    frost: uniform(0),
    rim: uniform(0.55),
    caustic: uniform(0.08),
    inner: uniform(0.1),
    topRefl: uniform(0.3),
    shOp: uniform(0.12),
    shSoft: uniform(34),
    shOff: uniform(22),
    stretch: uniform(new THREE.Vector2(1, 1)),
    shift: uniform(new THREE.Vector2(0, 0)),
    frostCenter: uniform(new THREE.Vector3(0.98, 0.98, 0.99)),
    frostEdge: uniform(new THREE.Vector3(0.89, 0.89, 0.91)),
    surface: uniform(new THREE.Vector3(0.87, 0.87, 0.89)),
    lensOn: uniform(1),
    // Cursor light: direction from the lens to the pointer and its fade-in amount.
    lightDir: uniform(new THREE.Vector2(0, -1)),
    lightMix: uniform(0),
    fgHide: uniform(0),
  }
}

// Hero slider constants (params.ts)
const CENTER_FLATNESS = 1.4
const NORMAL_STRENGTH = 42
const EDGE_DISTORTION = 1.6
const FRESNEL_POWER = 6
const RIM_WIDTH = 1.1

function createMaterial(u: ReturnType<typeof createUniforms>, bgTex: any, fgTex: any) {
  const sdRoundRect = Fn(([p, half, r]: any[]) => {
    // Typed as any: @types/three types abs() of an untyped node as a float. [port]
    const q: any = abs(p).sub(half).add(r)
    return length(max(q, 0)).add(min(max(q.x, q.y), 0)).sub(r)
  })
  // The TSL node graph is loosely typed, hence the `any`s.
  // design units → texture uv (CanvasTexture is flipped: top row at v = 1)
  const toUv = (d: any) => {
    const px = d.mul(u.unit)
    return clamp(vec2(px.x.div(u.size.x), oneMinus(px.y.div(u.size.y))), vec2(0.0005), vec2(0.9995))
  }
  const backdrop = (st: any, lod: any) => {
    const c = texture(bgTex, st, lod)
    return c.rgb.add(oneMinus(c.a).mul(u.surface))
  }
  // The engine darkens linear color; on sRGB values the same factor is k^(1 / 2.2).
  const dim = (k: any) => pow(clamp(k, 0, 1), 1 / 2.2)
  const glassHeight = (p: any) => {
    const d = sdRoundRect(p, u.half, u.radius)
    const t = pow(clamp(d.negate().div(u.bevel), 0, 1), float(1 / CENTER_FLATNESS))
    return sqrt(oneMinus(pow(oneMinus(t), 2)))
  }

  const node = Fn(() => {
    const st = uv()
    const px = vec2(st.x, oneMinus(st.y)).mul(u.size).toVar()
    const p = px.div(u.unit).toVar()
    const base = texture(bgTex, vec2(st.x, st.y)).toVar()

    const local = p.sub(u.center).div(u.stretch).toVar()
    const dist = sdRoundRect(local, u.half, u.radius).toVar()

    // Glass drop shadow (tight + ambient), kept close to the glass and faded at the canvas border
    const vFade = smoothstep(-0.1, 0.9, local.y.div(u.half.y)).mul(0.92).add(0.08)
    const outside = smoothstep(-4, 14, dist)
    const dNear = sdRoundRect(local.sub(vec2(0, u.shOff)), u.half, u.radius)
    const dFar = sdRoundRect(local.sub(vec2(0, u.shOff.mul(1.6))), u.half, u.radius)
    const near = oneMinus(smoothstep(-6, u.shSoft, dNear))
    const far = oneMinus(smoothstep(-10, u.shSoft.mul(1.5), dFar))
    const border = min(min(px.x, px.y), min(u.size.x.sub(px.x), u.size.y.sub(px.y)))
    const shadow = clamp(near.mul(u.shOp).add(far.mul(u.shOp)).mul(vFade).mul(outside), 0, 0.85)
      .mul(smoothstep(0, 14, border))
      .mul(u.lensOn)
    const keep = dim(oneMinus(shadow))
    const outsideCol = vec4(base.rgb.mul(keep), base.a.add(oneMinus(base.a).mul(oneMinus(keep))))

    // Surface normal from the bevel height field
    const eps = float(1.25)
    const h = glassHeight(local).toVar()
    const hGrad = vec2(glassHeight(local.add(vec2(eps, 0))).sub(h), glassHeight(local.add(vec2(0, eps))).sub(h)).div(eps)
    const normal = normalize(vec3(hGrad.mul(NORMAL_STRENGTH).negate(), 1)).toVar()
    const depth = clamp(oneMinus(h), 0, 1).toVar()
    const edge = smoothstep(u.bevel.mul(0.35), 0, dist.negate()).toVar()
    const sdfDir = normalize(
      vec2(
        sdRoundRect(local.add(vec2(eps, 0)), u.half, u.radius).sub(dist),
        sdRoundRect(local.add(vec2(0, eps)), u.half, u.radius).sub(dist),
      ),
    ).toVar()

    // Refraction with chromatic dispersion
    const magnified = local.mul(float(1).div(u.mag.mul(h).add(1)))
    const refract = sdfDir.mul(u.refract).mul(pow(edge, EDGE_DISTORTION)).negate().toVar()
    const disp = u.disp.mul(0.35)
    const origin = u.center.add(u.shift)
    const uvG = toUv(origin.add(magnified).add(refract)).toVar()
    const uvR = toUv(origin.add(magnified).add(refract.mul(disp.add(1))))
    const uvB = toUv(origin.add(magnified).add(refract.mul(oneMinus(disp))))
    const lod = max(mix(u.blurC, u.blurE, pow(edge, 1.3)).add(u.blurShift), 0)
    const glass = vec3(backdrop(uvR, lod).r, backdrop(uvG, lod).g, backdrop(uvB, lod).b).toVar()

    // Top reflection
    const ny = local.y.div(u.half.y)
    const nx = local.x.div(u.half.x)
    const topRefl = smoothstep(0.75, -0.05, ny).mul(nx.mul(-0.12).add(1)).mul(u.topRefl).mul(0.6).add(0.02)
    glass.mulAssign(dim(oneMinus(vec3(1, 1, 0.72).mul(topRefl))))

    // Frosted resting state
    glass.assign(mix(glass, mix(u.frostCenter, u.frostEdge, pow(depth, 1.6)), u.frost))

    // Inner shading
    const up = clamp(sdfDir.y.negate(), 0, 1)
    const right = clamp(sdfDir.x, 0, 1)
    const left = clamp(sdfDir.x.negate(), 0, 1)
    const down = clamp(sdfDir.y, 0, 1)
    const innerBand = smoothstep(u.bevel.mul(-0.19), u.bevel.mul(-0.024), dist)
    const innerDir = up.add(left.mul(0.6)).add(right.mul(0.3)).add(down.mul(0.15))
    glass.mulAssign(dim(oneMinus(innerBand.mul(innerDir).mul(u.inner).mul(2.2))))
    const deepBand = smoothstep(u.bevel.mul(-0.73), u.bevel.mul(-0.13), dist)
    glass.mulAssign(dim(oneMinus(deepBand.mul(left).mul(u.inner).mul(2))))
    const ring = exp(dist.add(u.bevel.mul(0.45)).div(u.bevel.mul(0.26)).pow(2).negate())
    const ringDir = right.mul(0.9).add(up.mul(0.5)).add(left.mul(0.4)).add(down.mul(0.3))
    glass.mulAssign(dim(oneMinus(ring.mul(ringDir).mul(u.inner).mul(1.5))))

    // Rim light + fresnel
    const fresnel = pow(clamp(oneMinus(normal.z), 0, 1), FRESNEL_POWER)
    const rimW = max(u.devicePx.mul(RIM_WIDTH), 1)
    const rim = smoothstep(rimW.mul(1.6), 0, abs(dist.add(rimW.mul(1.8))))
    const rimFalloff = exp(pow(local.y.div(30), 2).negate())
    const staticRim = pow(right, 2).mul(rimFalloff).mul(0.9).add(pow(down, 2).mul(0.2)).add(pow(left, 2).mul(0.55))
    // With a pointer on the page the rim faces the cursor instead: a bright lit side and a
    // faint cool bounce on the far side, so the highlight drifts a little as the cursor moves.
    const lightCos = dot(sdfDir, u.lightDir)
    const facing = clamp(lightCos, 0, 1).toVar()
    const away = clamp(lightCos.negate(), 0, 1)
    const litRim = pow(facing, 2).mul(0.9).add(pow(away, 2).mul(0.55))
    // Only lean the fixed studio lighting toward the cursor; a full swing reads as fake.
    const lean = u.lightMix.mul(0.4)
    const rimDir = mix(staticRim, litRim, lean)
    const rimFront = mix(right, facing, lean)
    const rimBack = mix(left, away, lean)
    const warmCool = mix(vec3(0.82, 0.9, 1.08), vec3(1.2, 0.95, 0.78), smoothstep(0.1, -0.5, nx))
    const rimCol = mix(vec3(1), warmCool, down.mul(0.6)).toVar()
    rimCol.assign(mix(rimCol, vec3(0.12, 0.6, 1.2), rimBack.mul(0.85)))
    glass.addAssign(rimCol.mul(rim.mul(rimDir).mul(u.rim).add(fresnel.mul(rimFront).mul(0.02))))


    // Caustic
    glass.addAssign(vec3(1, 0.92, 0.86).mul(smoothstep(0.72, 0.98, depth).mul(down).mul(u.caustic)))

    const aa = max(fwidth(dist), 1e-4)
    const mask = smoothstep(aa, aa.negate(), dist).mul(u.lensOn).toVar()
    const col = mix(outsideCol, vec4(clamp(glass, 0, 1), 1), mask)

    // Foreground layer on top (optionally hidden inside the clear lens)
    const fg = texture(fgTex, vec2(st.x, st.y)).mul(oneMinus(mask.mul(oneMinus(u.frost)).mul(u.fgHide)))
    return fg.add(col.mul(oneMinus(fg.a)))
  })

  const material = new THREE.MeshBasicNodeMaterial()
  material.colorNode = node()
  material.blending = THREE.NoBlending
  material.transparent = false
  return material
}

function makeLayer() {
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 2
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.NoColorSpace
  tex.premultiplyAlpha = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = true
  return { canvas, tex }
}

function themeOf(el: HTMLElement): GlassThemeName {
  // The nearest data-theme wins; otherwise a Tailwind/shadcn-style class="dark" on <html>.
  const scoped = el.closest('[data-theme]')?.getAttribute('data-theme')
  if (scoped) return scoped === 'dark' ? 'dark' : 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function setVec3(u: { value: { set: (r: number, g: number, b: number) => void } }, hex: string) {
  const [r, g, b] = hexToRgb(hex)
  u.value.set(r, g, b)
}

async function createRuntime() {
  const renderer = new THREE.WebGPURenderer({ antialias: false, alpha: true, forceWebGL: true })
  await renderer.init()
  renderer.setPixelRatio(1)
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  renderer.setClearColor(0x000000, 0)
  const glCanvas = renderer.domElement as HTMLCanvasElement
  let glW = 0
  let glH = 0

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1
  const quad = new THREE.PlaneGeometry(2, 2)
  const views = new Set<View>()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      for (const v of views) {
        if (v.canvas === entry.target) {
          v.visible = entry.isIntersecting
          if (v.visible) v.dirty = true
        }
      }
    }
  })
  // Theme switches anywhere re-render every view.
  const themeChanged = () => views.forEach((v) => (v.dirty = true))
  new MutationObserver(themeChanged).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
    subtree: true,
  })
  // class="dark" is only watched on <html> (a subtree class watch would fire on every re-render).
  new MutationObserver(themeChanged).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  function resizeLayers(v: View, spec: GlassViewSpec) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const devW = Math.max(2, Math.round(spec.width * dpr))
    const devH = Math.max(2, Math.round(spec.height * dpr))
    if (devW === v.devW && devH === v.devH && dpr === v.dpr) return
    v.devW = devW
    v.devH = devH
    v.dpr = dpr
    v.canvas.width = devW
    v.canvas.height = devH
    for (const layer of ['bg', 'fg'] as const) {
      const c = layer === 'bg' ? v.bgCanvas : v.fgCanvas
      c.width = devW
      c.height = devH
      // A texture can't change size in place; dispose so it re-uploads at the new size.
      ;(layer === 'bg' ? v.bgTex : v.fgTex).dispose()
    }
  }

  // Cursor light, shared by every view. `mix` fades in on the first move and out when the
  // pointer leaves the window, so touch-only or idle pages keep the original fixed lighting.
  const pointer = { x: 0, y: 0, active: false, moved: false, mix: 0 }
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      pointer.moved = true
    },
    { passive: true },
  )
  // Scrolling moves the controls under a still cursor.
  window.addEventListener('scroll', () => (pointer.moved = true), { passive: true, capture: true })
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.active = false
    pointer.moved = true
  })

  function aimLight(v: View, spec: GlassViewSpec) {
    const rect = v.canvas.getBoundingClientRect()
    const dx = pointer.x - (rect.left + v.lensX * spec.unit)
    const dy = pointer.y - (rect.top + v.lensY * spec.unit)
    const d = Math.hypot(dx, dy)
    if (d > 0.5) v.u.lightDir.value.set(dx / d, dy / d)
    v.u.lightMix.value = spec.cursorLight ? pointer.mix : 0
  }

  function present(v: View) {
    if (glW !== v.devW || glH !== v.devH) {
      renderer.setSize(v.devW, v.devH, false)
      glW = v.devW
      glH = v.devH
    }
    renderer.render(v.scene, camera)
    v.ctx.clearRect(0, 0, v.devW, v.devH)
    v.ctx.drawImage(glCanvas, 0, 0, v.devW, v.devH, 0, 0, v.devW, v.devH)
  }

  function render(v: View, refresh: boolean) {
    const t0 = performance.now()
    const spec = v.spec()
    resizeLayers(v, spec)
    const theme = themeOf(v.canvas)
    const tokens = glassTokens[theme]

    const bg = v.bgCanvas.getContext('2d')!
    const fg = v.fgCanvas.getContext('2d')!
    for (const ctx of [bg, fg]) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, v.devW, v.devH)
      ctx.setTransform(v.dpr, 0, 0, v.dpr, 0, 0)
    }
    const lens = spec.draw(bg, fg, tokens, theme)
    v.bgTex.needsUpdate = true
    v.fgTex.needsUpdate = true

    const u = v.u
    u.size.value.set(v.devW, v.devH)
    u.unit.value = spec.unit * v.dpr
    u.devicePx.value = 1 / (spec.unit * v.dpr)
    u.blurShift.value = Math.log2(Math.max((spec.unit * v.dpr) / SHADER_DPR_REF, 1e-3))
    u.center.value.set(lens.x, lens.y)
    u.half.value.set(Math.max(lens.hx, 0.5), Math.max(lens.hy, 0.5))
    u.radius.value = Math.max(0, Math.min(lens.radius, Math.min(lens.hx, lens.hy) - 0.5))
    u.bevel.value = Math.max(lens.bevel, 1)
    u.refract.value = lens.refract
    u.mag.value = lens.mag
    u.disp.value = lens.disp
    u.blurC.value = lens.blurCenter
    u.blurE.value = lens.blurEdge
    u.frost.value = lens.frost
    u.rim.value = lens.rim
    u.caustic.value = lens.caustic
    u.inner.value = lens.inner
    u.topRefl.value = lens.topRefl
    u.shOp.value = lens.shadowOpacity
    u.shSoft.value = lens.shadowSoftness
    u.shOff.value = lens.shadowOffset
    u.stretch.value.set(lens.stretchX, lens.stretchY)
    u.shift.value.set(lens.shiftX, 0)
    setVec3(u.frostCenter, lens.frostCenter ?? tokens.frostCenter)
    setVec3(u.frostEdge, lens.frostEdge ?? tokens.frostEdge)
    // What the glass sits on (a card, the page) comes from CSS so nested glass matches it.
    if (refresh || !v.surface) v.surface = getComputedStyle(v.canvas).getPropertyValue('--glass-surface').trim() || tokens.surface
    setVec3(u.surface, v.surface.startsWith('#') ? v.surface : tokens.surface)
    u.lensOn.value = lens.visible === false ? 0 : 1
    u.fgHide.value = spec.fgUnderLens ?? 0
    v.lensX = lens.x
    v.lensY = lens.y
    aimLight(v, spec)
    present(v)
    v.renders++
    v.renderMs += performance.now() - t0

    // The lens interior is always opaque. If its center came out empty the program
    // wasn't linked yet (parallel shader compile), so try again next frame.
    if (v.verifyLeft > 0 && lens.visible !== false) {
      const px = Math.round(lens.x * spec.unit * v.dpr)
      const py = Math.round(lens.y * spec.unit * v.dpr)
      const inside = px >= 0 && py >= 0 && px < v.devW && py < v.devH
      const blank = inside && v.ctx.getImageData(px, py, 1, 1).data[3] === 0
      v.verifyLeft = blank ? v.verifyLeft - 1 : 0
      if (blank) v.dirty = true
    }
  }

  let last = performance.now()
  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 30)
    last = now
    const mixTarget = pointer.active ? 1 : 0
    const mixBefore = pointer.mix
    pointer.mix = reducedMotion.matches ? mixTarget : pointer.mix + (mixTarget - pointer.mix) * Math.min(1, dt * 6)
    if (Math.abs(pointer.mix - mixTarget) < 0.002) pointer.mix = mixTarget
    const relight = pointer.moved || pointer.mix !== mixBefore
    pointer.moved = false
    for (const v of views) {
      if (!v.ready) continue
      const spec = v.spec()
      const moving = spec.step?.(dt, reducedMotion.matches) ?? false
      if (!v.visible) continue
      if (moving || v.dirty || spec.alwaysRender) {
        const refresh = v.dirty
        v.dirty = false
        render(v, refresh)
      } else if (relight && v.devW > 0) {
        // Only the light moved: re-shade with the existing layers, no redraw or upload.
        const spec = v.spec()
        if (!spec.cursorLight) continue
        aimLight(v, spec)
        present(v)
      }
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)

  return {
    async createView(canvas: HTMLCanvasElement, spec: () => GlassViewSpec): Promise<GlassViewHandle> {
      const bgLayer = makeLayer()
      const fgLayer = makeLayer()
      fgLayer.tex.generateMipmaps = false
      fgLayer.tex.minFilter = THREE.LinearFilter
      const u = createUniforms()
      const material = createMaterial(u, bgLayer.tex, fgLayer.tex)
      const scene = new THREE.Scene()
      const mesh = new THREE.Mesh(quad, material)
      mesh.frustumCulled = false
      scene.add(mesh)
      const view: View = {
        canvas,
        ctx: canvas.getContext('2d', { willReadFrequently: false })!,
        spec,
        bgCanvas: bgLayer.canvas,
        fgCanvas: fgLayer.canvas,
        bgTex: bgLayer.tex,
        fgTex: fgLayer.tex,
        scene,
        material,
        u,
        devW: 0,
        devH: 0,
        dpr: 0,
        dirty: true,
        visible: true,
        ready: false,
        verifyLeft: 240,
        surface: '',
        lensX: 0,
        lensY: 0,
        renders: 0,
        renderMs: 0,
      }
      views.add(view)
      io.observe(canvas)
      resizeLayers(view, spec())
      await renderer.compileAsync(scene, camera)
      view.ready = true
      return {
        invalidate: () => {
          view.dirty = true
        },
        stats: () => ({ renders: view.renders, ms: view.renderMs }),
        dispose: () => {
          views.delete(view)
          // A remount (React Strict Mode) can register a second view on the same canvas before
          // the first is disposed; keep observing it for that view, or it never turns visible. [port]
          if (![...views].some((other) => other.canvas === canvas)) io.unobserve(canvas)
          material.dispose()
          bgLayer.tex.dispose()
          fgLayer.tex.dispose()
        },
      }
    },
  }
}

let runtime: ReturnType<typeof createRuntime> | null = null

/** Lazily creates the shared renderer (client only). */
export function getGlassRuntime() {
  runtime ??= createRuntime()
  return runtime
}
