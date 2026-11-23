// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// Springs and the rest → pressed lens morph, ported from the hero slider engine.

export type Spring = { x: number; v: number }

/** Damped spring toward `target` (omega = speed, zeta = damping ratio; 1 = critical). */
export function stepSpring(s: Spring, target: number, omega: number, zeta: number, dt: number) {
  const d = s.x - target
  if (zeta > 0.9995) {
    const b = s.v + omega * d
    const e = Math.exp(-omega * dt)
    s.x = target + (d + b * dt) * e
    s.v = (s.v - omega * b * dt) * e
  } else {
    const wd = omega * Math.sqrt(1 - zeta * zeta)
    const b = (s.v + zeta * omega * d) / wd
    const e = Math.exp(-zeta * omega * dt)
    const cos = Math.cos(wd * dt)
    const sin = Math.sin(wd * dt)
    const x = (d * cos + b * sin) * e
    s.x = target + x
    s.v = e * wd * (b * cos - d * sin) - zeta * omega * x
  }
  const settled = Math.abs(s.x - target) < 5e-4 * Math.max(1, Math.abs(target)) && Math.abs(s.v) < 0.005
  if (settled) {
    s.x = target
    s.v = 0
  }
  return !settled
}

/** The slider's press spring: pressSpeed 16, pressBounce 0.4. */
export const PRESS = { omega: 16, zeta: 0.6 }

/**
 * Hover swell springs. Width and height use different speeds and low damping, so they
 * overshoot out of phase and the glass wobbles like a drop of liquid as it grows.
 */
export const HOVER_X = { omega: 17, zeta: 0.42 }
export const HOVER_Y = { omega: 12, zeta: 0.34 }

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const saturate = (v: number) => Math.max(0, Math.min(1, v))

/** All lens values are in design units (the slider's 750 × 532 frame). */
export type LensState = {
  x: number
  y: number
  hx: number
  hy: number
  radius: number
  bevel: number
  refract: number
  mag: number
  disp: number
  blurCenter: number
  blurEdge: number
  frost: number
  rim: number
  caustic: number
  inner: number
  topRefl: number
  shadowOpacity: number
  shadowSoftness: number
  shadowOffset: number
  stretchX: number
  stretchY: number
  shiftX: number
  frostCenter?: string
  frostEdge?: string
  visible?: boolean
}

export type GlassOptics = {
  refraction: number
  restRefraction: number
  bevelWidth: number
  cornerRadius: number
  magnification: number
  dispersion: number
  blurCenter: number
  blurEdge: number
  frostBlur: number
  rimIntensity: number
  topReflection: number
  innerShading: number
  causticStrength: number
  shadowOpacity: number
  shadowSoftness: number
  shadowOffset: number
}

/** Defaults of the hero slider (params.ts). */
export const sliderOptics: GlassOptics = {
  refraction: 37,
  restRefraction: 6,
  bevelWidth: 62,
  cornerRadius: 126,
  magnification: 0,
  dispersion: 0.12,
  blurCenter: 0.35,
  blurEdge: 2.2,
  frostBlur: 4,
  rimIntensity: 0.55,
  topReflection: 0.3,
  innerShading: 0.1,
  causticStrength: 0.08,
  shadowOpacity: 0.12,
  shadowSoftness: 34,
  shadowOffset: 22,
}

/**
 * Morph between a small resting pill and the big pressed lens (engine applyPress).
 * `press` may overshoot 0…1 with the spring; `frost` is the resting frost amount.
 */
export function pressedLens(
  press: number,
  rest: { w: number; h: number },
  lens: { w: number; h: number },
  frostAtRest: number,
  o: GlassOptics = sliderOptics,
): Omit<LensState, 'x' | 'y' | 'stretchX' | 'stretchY' | 'shiftX'> {
  const p = Math.max(-0.12, Math.min(1.15, press))
  const pc = saturate(press)
  const hx = lerp(rest.w / 2, lens.w / 2, p)
  const hy = lerp(rest.h / 2, lens.h / 2, p)
  const frost = frostAtRest * (1 - pc)
  const clear = 1 - frost
  return {
    hx,
    hy,
    radius: Math.min(lerp(rest.h / 2, o.cornerRadius, pc), Math.min(hx, hy) - 1),
    bevel: Math.max(lerp(rest.h * 0.42, o.bevelWidth, pc), 2),
    refract: lerp(o.restRefraction, o.refraction, pc) * lerp(0.06, 1, clear),
    mag: o.magnification * pc,
    disp: o.dispersion * clear,
    blurCenter: lerp(o.blurCenter, o.frostBlur, frost),
    blurEdge: lerp(o.blurEdge, o.frostBlur, frost),
    frost,
    rim: o.rimIntensity * lerp(0.04, 1, clear),
    caustic: o.causticStrength * clear,
    // A fully frosted (white) pill is flat: no inner shading bands or top dimming.
    inner: o.innerShading * clear,
    topRefl: o.topReflection * clear,
    // Only clear glass casts a shadow; a frosted pill sits flat.
    shadowOpacity: o.shadowOpacity * lerp(0.55, 1, pc) * clear,
    shadowSoftness: o.shadowSoftness * lerp(0.6, 1, pc),
    shadowOffset: o.shadowOffset * lerp(0.5, 1, pc),
  }
}

