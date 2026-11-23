// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// Liquid Glass engine — one shared WebGL2 context that draws every glass surface on the
// page and copies each result into the surface's own 2D <canvas>, so a page full of
// glass never hits the browser's WebGL context limit.
//
// Zero dependencies. A GLSL lens with tinted glass, a 1 px border, a frosted resting
// state, an opt-in gooey droplet and an opt-in frosted blur (cards).
//
// Cost model: the loop runs only while a spring moves, a surface is dirty or the
// cursor light changes; at rest it stops completely. Off-screen surfaces are not
// drawn. `prefers-reduced-motion` freezes every spring at its target.
// If WebGL2 is missing or the context is lost, every surface falls back to plain CSS.
//
// COPY THIS FILE VERBATIM. Do not rewrite or "simplify" the shader: the look comes
// from the exact constants below. MIT — https://github.com/bilalgursen/liquid-glass

export type Rgb = [number, number, number]
export type Rgba = [number, number, number, number]

/** One frame of one glass shape. Lengths in CSS px; origin = the canvas's top-left. */
export type GlassLens = {
  /** Canvas position inside its positioned parent, and its size. */
  left: number
  top: number
  width: number
  height: number
  /** CSS px per design unit (the shading is designed for a 120-unit-tall lens). */
  unit: number
  /** Body centre and half size. */
  cx: number
  cy: number
  hx: number
  hy: number
  radius: number
  /** Horizontal shift of the body (it pulls back while a droplet separates). */
  bodyX: number
  /** Separated droplet: centre x relative to the lens centre, radius, gooey bridge softness. */
  droplet?: { x: number; r: number; k: number }
  /**
   * A second rounded box melted into the body, in any direction: centre relative to the body's
   * centre, half size, corner radius and gooey bridge softness (all CSS px). Omit it and the
   * shape is exactly the body (and droplet) alone.
   */
  blob?: {
    x: number
    y: number
    hx: number
    hy: number
    r: number
    k: number
    /** Gathers the bridge around one point: the softness falls off from `x` (relative to the body's centre) over `w` px, so a thinning bridge narrows into a neck there. */
    neck?: { x: number; w: number }
    /** Fades the softness out towards the body's far edge: `amount` 0–1 (0 = none), recovering over `reach` × the body's height from that edge. */
    fade?: { amount: number; reach: number }
  }
  /** Bevel width (design units). */
  bevel: number
  /**
   * Width of the band that bends the backdrop (design units), when it must not follow
   * the bevel: a lens with square corners keeps its bevel within the corner radius but
   * still bends as deep as a pill. Omit for the default, `bevel × 0.35`.
   */
  band?: number
  shadow: number
  shadowSoftness: number
  shadowOffset: number
  /** 0 = flat liquid (no light or shadow), 1 = full glass lighting. */
  strength: number
  color: Rgb
  surface: Rgb
  /** How much the rim thins towards the surface colour (tinted glass). */
  edgeClear: number
  border?: Rgb
  /** Opacity of the border line (0–1, default 1). */
  borderAlpha?: number
  /** Width of the border line in CSS px (default 1). */
  borderWidth?: number
  /** Textured lens: paints what lies beneath and bends it. */
  refraction?: {
    paint: (back: CanvasRenderingContext2D, front: CanvasRenderingContext2D) => void
    refract: number
    magnify: number
    dispersion: number
    blurCenter: number
    blurEdge: number
    /** 1 = frosted (flat `color`), 0 = perfectly clear. */
    frost: number
    /** Frosted blur of the backdrop: a gaussian deviation in CSS px, like CSS `blur()`. 0 or omitted = sharp. */
    blur?: number
    /** How much of the frost shows over the sharp bend (0–1, default 1). */
    blurMix?: number
    /**
     * Radial bend, as the old SVG card drew it: each point near the rim looks towards the
     * centre, by this fraction of the viewport (0.065 there), falling off as (1 − d/half)^bendCurve,
     * and the frost blurs the bent picture. `refract`, `magnify` and the bend band are then unused.
     */
    radial?: number
  }
  /** Fine-tuning of the look. Every field defaults to the kit's own value, noted in brackets. */
  tune?: {
    /** × rim light [1] and × its line's thickness [1]. */
    rim?: number
    rimWidth?: number
    /** × fresnel glow on the lit side [1], × inner shading [1], × top reflection [1], × warm caustic [1]. */
    fresnel?: number
    inner?: number
    reflection?: number
    caustic?: number
    /** Falloff of the bend from the rim inwards, an exponent [1.6]; × how far in it reaches [1]. */
    bendCurve?: number
    bendDepth?: number
    /** Saturation of what shows through [1]; × the frost at the rim [1]. */
    saturation?: number
    frostEdge?: number
  }
  /** Rim light leans towards the cursor. */
  cursorLight: boolean
  /** Lens centre on screen, for aiming the cursor light. */
  screenX: number
  screenY: number
}

export type GlassView = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  dirty: boolean
  visible: boolean
  /** Advance springs; return true while anything still moves. */
  step: (dt: number, reducedMotion: boolean) => boolean
  /** The shape to draw, or null to clear. `refresh`: re-read sizes and colours. */
  lens: (refresh: boolean) => GlassLens | null
  /** The first frame reached the canvas. */
  drawn?: () => void
  /** The GPU context is gone: return to the plain CSS look. */
  lost: () => void
}

export type GlassEngine = {
  add: (view: GlassView) => void
  remove: (view: GlassView) => void
  /** Schedule a frame (call after changing state the springs read). */
  wake: () => void
  /** Any CSS colour (oklch, var(), color-mix…) → 0..1 RGBA. */
  resolveColor: (css: string) => Rgba
}

/** Damped spring. `omega` = speed (rad/s), `zeta` = damping ratio (< 1 bounces). Returns true while moving. */
export type Spring = { x: number; v: number }
export function stepSpring(s: Spring, target: number, { omega, zeta }: { omega: number; zeta: number }, dt: number) {
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
  // Thresholds scale with the target so pixel springs do not idle on an invisible tail.
  const scale = Math.max(1, Math.abs(target))
  const settled = Math.abs(s.x - target) < 5e-4 * scale && Math.abs(s.v) < 0.005 * scale
  if (settled) {
    s.x = target
    s.v = 0
  }
  return !settled
}

/** Every spring the kit uses. Hover width/height bounce out of phase: the glass wobbles like a drop. */
export const SPRINGS = {
  press: { omega: 16, zeta: 0.6 },
  hoverX: { omega: 17, zeta: 0.42 },
  hoverY: { omega: 12, zeta: 0.34 },
  /** A droplet separating from the body: slow, one small overshoot. */
  dropletOut: { omega: 5, zeta: 0.72 },
  /** The droplet melting back in (pointer leaves or presses). */
  dropletIn: { omega: 13, zeta: 0.7 },
  /** A lens sliding to the newly selected option. */
  slide: { omega: 14, zeta: 0.75 },
  /** A dragged lens following the finger. */
  drag: { omega: 40, zeta: 0.999 },
} as const

/**
 * The gooey popup: a surface (a list, a menu, a popover) that swells out of its anchor as one
 * body of glass, holds on by a neck that thins and snaps, and plays the same motion backwards to
 * close. Used by GlassPopup (`glass-popup.tsx`). These values are the look: do not tune them casually.
 */
export const GOOEY = {
  /** How heavy the two halves are. Heavier glass is thrown less by a jolt and swings back slower. */
  weight: 6,
  /** The panel opening: speed, and damping (below 1 it overshoots as it lands). */
  openSpeed: 11,
  openDamping: 1,
  /** Closing replays the opening backwards, at closeSpeed / openSpeed × its pace (equal = the same pace). */
  closeSpeed: 17.5,
  /** The panel lets go of the trigger once it is this far open (0–1). */
  detachAt: 0.1,
  /** How fast the neck thins once it lets go (lower = a slower snap). */
  snapSpeed: 5.6,
  /** Bridge softness in px at full strength, and how far the panel leans back towards the trigger. */
  neckSoftness: 90,
  neckPull: 11,
  /** The jolt when the neck snaps: its strength, how fast it swings, how soon it dies out (higher = sooner). */
  kick: 6,
  recoilSpeed: 4,
  recoilDamping: 1,
  /** How far each half is thrown by a jolt, and how far the trigger sags while attached (px). */
  triggerJolt: 0,
  panelJolt: 0,
  triggerSag: 6,
  /** The list: how far open the panel is when the first option appears (0–1), the delay between options and each one's fade (seconds). */
  itemsAt: 0.85,
  itemsGap: 0.06,
  itemsFade: 0.22,
  /**
   * Small controls only: a single icon, or a label of about five letters (up to roughly twice as
   * wide as they are tall). The bridge is as wide as the whole control there, so it gets its own
   * softness in px (in place of neckSoftness), a fade of that softness towards the control's far
   * edge (0–1, and how far in it recovers, × the height) and a neck no thinner than this × the
   * height, at first and once it has gathered. Wider controls keep the values above.
   */
  smallNeckSoftness: 14,
  smallEdgeFade: 1,
  smallEdgeReach: 0.5,
  smallNeck: 0.6,
  smallNeckWide: 1.2,
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
export const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
export const mixRgb = (a: Rgb, b: Rgb, t: number): Rgb => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
export const rgbCss = (c: Rgb) => `rgb(${Math.round(c[0] * 255)} ${Math.round(c[1] * 255)} ${Math.round(c[2] * 255)})`

const isVisibleColor = (c: string) => !!c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c) && !/\/\s*0\)$/.test(c)

/** The colour an element sits on: the first ancestor with a painted background. */
export function surfaceColorOf(el: Element | null): string {
  for (let a = el; a; a = a.parentElement) {
    const c = getComputedStyle(a).backgroundColor
    if (isVisibleColor(c)) return c
  }
  return getComputedStyle(document.documentElement).colorScheme.includes('dark') ? 'black' : 'white'
}

/** The lens is designed 120 units tall; every optic below is in those units. */
export const DESIGN_HEIGHT = 120

const VERTEX = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uSize, uCenter, uHalf, uLightDir;
uniform float uUnit, uDevicePx, uRadius, uBevel, uBodyX, uBand, uFieldRadius;
uniform vec3 uDrop;
uniform vec4 uBlob;
uniform vec2 uBlobShape, uBlobNeck, uBlobFade;
uniform float uRim, uCaustic, uInner, uTopRefl, uTopBase, uRimWidth, uFresnel;
uniform float uShadow, uShadowSoft, uShadowOffset;
uniform float uLightMix, uEdgeClear;
uniform vec3 uSurface, uColor, uBorder;
uniform float uBorderWidth, uBorderAlpha;
uniform sampler2D uBack, uFront;
uniform float uTextured, uRefract, uMag, uDisp, uBlurCenter, uBlurEdge, uBlurShift, uFrost, uFrostBlur, uFrostMix;
uniform float uFrostEdge, uSaturation, uBendCurve, uEdgeBand;
uniform vec2 uRadial;
uniform float uCssPx;
out vec4 outColor;

// design units -> texture uv (textures are uploaded flipped: top row at v = 1)
vec2 toUv(vec2 d) {
  vec2 q = d * uUnit;
  return clamp(vec2(q.x / uSize.x, 1.0 - q.y / uSize.y), vec2(0.0005), vec2(0.9995));
}
vec3 backdrop(vec2 st, float lod) {
  vec4 c = textureLod(uBack, st, lod);
  return c.rgb + (1.0 - c.a) * uSurface;
}
// Frosted glass: the backdrop under a gaussian blur of deviation sigma (design units),
// gathered from 32 taps on a golden-angle spiral out to 2.5 deviations. Each tap reads a
// mip about as wide as the gap between taps, so the frost stays smooth while the backdrop moves.
vec3 frosted(vec2 p, float sigma) {
  float lod = max(log2(sigma * 0.8 * uUnit) - 0.5, 0.0);
  vec3 sum = vec3(0.0);
  float total = 0.0;
  for (int i = 0; i < 32; i++) {
    float f = float(i) + 0.5;
    float r = sqrt(f / 32.0) * 2.5 * sigma;
    float a = f * 2.39996323;
    float w = exp(-0.5 * r * r / (sigma * sigma));
    sum += backdrop(toUv(p + r * vec2(cos(a), sin(a))), lod) * w;
    total += w;
  }
  return sum / total;
}
// The sharp bend: the backdrop at p pushed by bend, its colours split slightly.
vec3 bent(vec2 p, vec2 bend, float split, float lod) {
  return vec3(
    backdrop(toUv(p + bend * (1.0 + split)), lod).r,
    backdrop(toUv(p + bend), lod).g,
    backdrop(toUv(p + bend * (1.0 - split)), lod).b);
}
float roundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
float melt(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(a, b, h) - k * h * (1.0 - h);
}
// The glass shape: a pill body, smoothly unioned with a separating droplet.
float bodyShape(vec2 p) {
  float body = roundRect(p - vec2(uBodyX, 0.0), uHalf, uRadius);
  if (uDrop.y <= 0.0) return body;
  float d = length(p - vec2(uDrop.x, 0.0)) - uDrop.y;
  float k = max(uDrop.z, 1e-3);
  float h = clamp(0.5 + 0.5 * (d - body) / k, 0.0, 1.0);
  return mix(d, body, h) - k * h * (1.0 - h);
}
// ...and with the optional second box (uBlobShape.y = its bridge softness, 0 = none).
float blobSoft(vec2 p) {
  float k = uBlobShape.y;
  if (uBlobNeck.y > 0.0) {
    float n = (p.x - uBlobNeck.x) / uBlobNeck.y;
    // A peaked falloff: as the softness drops, the bridge thins into a thread before it breaks.
    k *= exp(0.2 - sqrt(n * n + 0.04));
  }
  // On a small body the bridge belongs to the side that faces the second box: towards the far
  // edge the softness fades out (uBlobFade: how much, and how far in), or it raises a ridge there.
  if (uBlobFade.x > 0.0) {
    float back = smoothstep(-uHalf.y, -uHalf.y + 2.0 * uHalf.y * max(uBlobFade.y, 0.01), p.y * sign(uBlob.y));
    k *= mix(1.0, back, uBlobFade.x);
  }
  return max(k, 1e-3);
}
float shape(vec2 p) {
  float s = bodyShape(p);
  if (uBlobShape.y <= 0.0) return s;
  return melt(roundRect(p - uBlob.xy, uBlob.zw, uBlobShape.x), s, blobSoft(p));
}
// The body with corners at least as round as the bend is deep (see uBand in main).
float field(vec2 p) {
  float f = roundRect(p - vec2(uBodyX, 0.0), uHalf, uFieldRadius);
  if (uBlobShape.y <= 0.0) return f;
  return melt(roundRect(p - uBlob.xy, uBlob.zw, uBlobShape.x), f, blobSoft(p));
}
// The reference darkens linear colour; on sRGB values the same factor is k^(1/2.2).
float dim(float k) { return pow(clamp(k, 0.0, 1.0), 1.0 / 2.2); }
vec3 dim(vec3 k) { return pow(clamp(k, 0.0, 1.0), vec3(1.0 / 2.2)); }
float height(vec2 p) {
  float t = pow(clamp(-shape(p) / uBevel, 0.0, 1.0), 1.0 / 1.4);
  return sqrt(1.0 - (1.0 - t) * (1.0 - t));
}
// Radial bend (the SVG card's): towards the centre, strongest at the rim, fading over the
// half size. uRadial is the full bend per axis (design units); uEdgeBand / 0.35 = bendDepth.
float radialRatio(float d) {
  return clamp(1.0 - abs(d) / (min(uHalf.x, uHalf.y) * uEdgeBand / 0.35), 0.0, 1.0);
}
vec2 radialBend(vec2 q) {
  float d = shape(q);
  vec2 c = q - vec2(uBodyX, 0.0);
  float k = pow(radialRatio(d), uBendCurve) * smoothstep(1.5 * uCssPx, -0.5 * uCssPx, d);
  return -c / max(length(c), 1e-4) * k * uRadial;
}
// Frost after the bend: every tap is bent on its own, and taps outside the glass are left
// out (the SVG filter saw nothing beyond the card), so the rim keeps its colour.
vec3 frostedRadial(vec2 q, float sigma) {
  float lod = max(log2(sigma * 0.8 * uUnit) - 0.5, 0.0);
  vec3 sum = vec3(0.0);
  float total = 0.0;
  for (int i = 0; i < 32; i++) {
    float f = float(i) + 0.5;
    float r = sqrt(f / 32.0) * 2.5 * sigma;
    float a = f * 2.39996323;
    vec2 t = q + r * vec2(cos(a), sin(a));
    float w = exp(-0.5 * r * r / (sigma * sigma)) * step(shape(t), 0.0);
    sum += backdrop(toUv(uCenter + t + radialBend(t)), lod) * w;
    total += w;
  }
  return total > 1e-4 ? sum / total : backdrop(toUv(uCenter + q + radialBend(q)), lod);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  vec2 local = px / uUnit - uCenter;
  float dist = shape(local);

  // Drop shadow: tight + ambient, kept near the glass, faded before the canvas edge.
  float vFade = smoothstep(-0.1, 0.9, local.y / uHalf.y) * 0.92 + 0.08;
  float outside = smoothstep(-4.0, 14.0, dist);
  float near = 1.0 - smoothstep(-6.0, uShadowSoft, shape(local - vec2(0.0, uShadowOffset)));
  float far = 1.0 - smoothstep(-10.0, uShadowSoft * 1.5, shape(local - vec2(0.0, uShadowOffset * 1.6)));
  float border = min(min(px.x, px.y), min(uSize.x - px.x, uSize.y - px.y));
  float sh = clamp((near + far) * uShadow * vFade * outside, 0.0, 0.85) * smoothstep(0.0, 14.0, border);
  vec4 outsideCol = vec4(0.0, 0.0, 0.0, 1.0 - dim(1.0 - sh));

  // Surface normal from the bevel height field.
  float e = 1.25;
  float h = height(local);
  vec2 grad = vec2(height(local + vec2(e, 0.0)) - h, height(local + vec2(0.0, e)) - h) / e;
  vec3 normal = normalize(vec3(-grad * 42.0, 1.0));
  float depth = clamp(1.0 - h, 0.0, 1.0);
  float edge = 1.0 - smoothstep(0.0, uBevel * uEdgeBand, -dist);
  vec2 dir = normalize(vec2(shape(local + vec2(e, 0.0)) - dist, shape(local + vec2(0.0, e)) - dist) + 1e-6);

  vec3 glass;
  if (uTextured > 0.5 && (uRadial.x > 0.0 || uRadial.y > 0.0)) {
    // Radial bend, then frost: the old SVG card's rim.
    float ratio = radialRatio(dist);
    float sharpLod = max(uBlurShift, 0.0);
    if (uFrostBlur > 0.0 && dist < 1.0) {
      vec3 frost = frostedRadial(local, uFrostBlur * mix(1.0, uFrostEdge, pow(ratio, 1.3)));
      glass = uFrostMix < 1.0 ? mix(bent(uCenter + local, radialBend(local), uDisp * 0.35, sharpLod), frost, uFrostMix) : frost;
    } else {
      glass = bent(uCenter + local, radialBend(local), uDisp * 0.35, sharpLod);
    }
    if (uSaturation != 1.0) glass = max(mix(vec3(dot(glass, vec3(0.2126, 0.7152, 0.0722))), glass, uSaturation), 0.0);
  } else if (uTextured > 0.5) {
    // Refraction: magnify the middle, bend inwards at the rim, split colours slightly.
    // A lens with square corners (uBand > 0) bends deeper than its corner radius. The
    // bend then follows a shape whose corners are at least that round: on the real
    // shape its direction would break along the diagonals. Mask and light keep the real shape.
    float bendEdge = edge;
    vec2 bendDir = dir;
    if (uBand > 0.0) {
      float fd = field(local);
      bendDir = normalize(vec2(field(local + vec2(e, 0.0)) - fd, field(local + vec2(0.0, e)) - fd) + 1e-6);
      bendEdge = 1.0 - smoothstep(0.0, uBand, -fd);
    }
    vec2 magnified = local / (uMag * h + 1.0);
    vec2 bend = -bendDir * uRefract * pow(bendEdge, uBendCurve);
    float split = uDisp * 0.35;
    float lod = max(mix(uBlurCenter, uBlurEdge, pow(bendEdge, 1.3)) + uBlurShift, 0.0);
    vec2 at = uCenter + magnified;
    if (uFrostBlur > 0.0 && dist < 1.0) {
      // Frosted (inside the glass only: outside, nothing of it shows). The frost hides the
      // colour split, so one bent point is enough; uFrostMix lets the sharp bend show through.
      vec3 frost = frosted(at + bend, uFrostBlur * mix(1.0, uFrostEdge, pow(bendEdge, 1.3)));
      glass = uFrostMix < 1.0 ? mix(bent(at, bend, split, lod), frost, uFrostMix) : frost;
    } else {
      glass = bent(at, bend, split, lod);
    }
    // Vibrancy: what shows through, more (or less) saturated.
    if (uSaturation != 1.0) glass = max(mix(vec3(dot(glass, vec3(0.2126, 0.7152, 0.0722))), glass, uSaturation), 0.0);
  } else {
    // Tinted glass: its own colour in the middle, thinning towards the rim.
    glass = mix(uSurface, uColor, 1.0 - edge * uEdgeClear);
  }

  // Top reflection.
  float ny = local.y / uHalf.y;
  float nx = (local.x - uBodyX) / uHalf.x;
  float top = (1.0 - smoothstep(-0.05, 0.75, ny)) * (1.0 - nx * 0.12) * uTopRefl * 0.6 + uTopBase;
  glass *= dim(1.0 - vec3(1.0, 1.0, 0.72) * top);

  // Frosted resting state: a still lens is the flat highlight colour.
  glass = mix(glass, uColor, uFrost * step(0.5, uTextured));

  // Inner shading: just inside the rim, a wide band on the left, a deep ring.
  float up = clamp(-dir.y, 0.0, 1.0);
  float right = clamp(dir.x, 0.0, 1.0);
  float left = clamp(-dir.x, 0.0, 1.0);
  float down = clamp(dir.y, 0.0, 1.0);
  float innerBand = smoothstep(uBevel * -0.19, uBevel * -0.024, dist);
  glass *= dim(1.0 - innerBand * (up + left * 0.6 + right * 0.3 + down * 0.15) * uInner * 2.2);
  float deepBand = smoothstep(uBevel * -0.73, uBevel * -0.13, dist);
  glass *= dim(1.0 - deepBand * left * uInner * 2.0);
  float hx = (dist + uBevel * 0.45) / (uBevel * 0.26);
  float ring = exp(-hx * hx);
  glass *= dim(1.0 - ring * (right * 0.9 + up * 0.5 + left * 0.4 + down * 0.3) * uInner * 1.5);

  // Rim light + fresnel; leans a little towards the cursor when there is one.
  float fresnel = pow(clamp(1.0 - normal.z, 0.0, 1.0), 6.0);
  float rimW = max(uDevicePx * 1.1, 1.0) * uRimWidth;
  float rimLine = 1.0 - smoothstep(0.0, rimW * 1.6, abs(dist + rimW * 1.8));
  float fall = exp(-(local.y / 30.0) * (local.y / 30.0));
  float studio = right * right * fall * 0.9 + down * down * 0.2 + left * left * 0.55;
  float lightCos = dot(dir, uLightDir);
  float facing = clamp(lightCos, 0.0, 1.0);
  float away = clamp(-lightCos, 0.0, 1.0);
  float lit = facing * facing * 0.9 + away * away * 0.55;
  float lean = uLightMix * 0.4;
  float rimDir = mix(studio, lit, lean);
  float front = mix(right, facing, lean);
  float back = mix(left, away, lean);
  vec3 warmCool = mix(vec3(0.82, 0.9, 1.08), vec3(1.2, 0.95, 0.78), 1.0 - smoothstep(-0.5, 0.1, nx));
  vec3 rimCol = mix(vec3(1.0), warmCool, down * 0.6);
  rimCol = mix(rimCol, vec3(0.12, 0.6, 1.2), back * 0.85);
  glass += rimCol * (rimLine * rimDir * uRim + fresnel * front * uFresnel * step(0.001, uRim));

  // Caustic: warm light gathering inside the bottom edge.
  glass += vec3(1.0, 0.92, 0.86) * smoothstep(0.72, 0.98, depth) * down * uCaustic;

  float aa = max(fwidth(dist), 1e-4);
  float mask = 1.0 - smoothstep(-aa, aa, dist);
  // Bordered body (outline buttons): a flat line just inside the edge.
  glass = mix(glass, uBorder, smoothstep(-uBorderWidth - aa, -uBorderWidth + aa, dist) * step(1e-4, uBorderWidth) * uBorderAlpha);
  vec4 col = mix(outsideCol, vec4(clamp(glass, 0.0, 1.0), 1.0), mask);
  // Front layer (selected labels) sits on the frosted pill and fades as the lens clears.
  vec4 fg = texture(uFront, gl_FragCoord.xy / uSize) * mask * uFrost * step(0.5, uTextured);
  outColor = fg + col * (1.0 - fg.a);
}
`

function createEngine(): GlassEngine | null {
  const glCanvas = document.createElement('canvas')
  const gl = glCanvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)
    if (!s) return null
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s
    console.warn('[liquid-glass] shader failed to compile', gl.getShaderInfoLog(s))
    return null
  }
  const vs = compile(gl.VERTEX_SHADER, VERTEX)
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT)
  const program = gl.createProgram()
  if (!vs || !fs || !program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const attr = gl.getAttribLocation(program, 'a')
  gl.enableVertexAttribArray(attr)
  gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0)

  // Two shared layers for textured lenses: what lies beneath, and what rides on top.
  const layer = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    return { canvas, ctx, tex }
  }
  const back = layer()
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.generateMipmap(gl.TEXTURE_2D)
  const front = layer()
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  if (!back.ctx || !front.ctx) return null
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
  gl.uniform1i(gl.getUniformLocation(program, 'uBack'), 0)
  gl.uniform1i(gl.getUniformLocation(program, 'uFront'), 1)
  const locations = new Map<string, WebGLUniformLocation | null>()
  const u = (name: string) => {
    if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program, name))
    return locations.get(name) ?? null
  }

  const views = new Set<GlassView>()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let dead = false

  // Colour resolving: paint any CSS colour into a 1×1 canvas and read it back.
  const probeCanvas = document.createElement('canvas')
  probeCanvas.width = probeCanvas.height = 1
  const probe = probeCanvas.getContext('2d', { willReadFrequently: true })
  const resolveColor = (css: string): Rgba => {
    if (!probe) return [1, 1, 1, 1]
    const span = document.createElement('span')
    span.style.color = css
    // Measured on <body>, never inside a host whose children are observed.
    document.body.appendChild(span)
    const computed = getComputedStyle(span).color
    span.remove()
    probe.clearRect(0, 0, 1, 1)
    probe.fillStyle = computed
    probe.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data
    return [r / 255, g / 255, b / 255, a / 255]
  }

  // Cursor light: shared, fades in on the first mouse move, out when the pointer leaves.
  const pointer = { x: 0, y: 0, active: false, moved: false, mix: 0 }

  const draw = (v: GlassView, refresh: boolean) => {
    const m = v.lens(refresh)
    if (!m || m.width < 2 || m.height < 2) {
      v.ctx.clearRect(0, 0, v.canvas.width, v.canvas.height)
      return
    }
    const st = v.canvas.style
    st.left = `${m.left}px`
    st.top = `${m.top}px`
    st.width = `${m.width}px`
    st.height = `${m.height}px`
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const devW = Math.max(2, Math.round(m.width * dpr))
    const devH = Math.max(2, Math.round(m.height * dpr))
    if (v.canvas.width !== devW || v.canvas.height !== devH) {
      v.canvas.width = devW
      v.canvas.height = devH
    }
    // The shared GL canvas only grows; each view is drawn into its bottom-left corner.
    if (glCanvas.width < devW || glCanvas.height < devH) {
      glCanvas.width = Math.max(glCanvas.width, devW)
      glCanvas.height = Math.max(glCanvas.height, devH)
    }
    gl.viewport(0, 0, devW, devH)

    const unit = m.unit
    const r = m.refraction
    if (r) {
      for (const l of [back, front]) {
        if (l.canvas.width !== devW || l.canvas.height !== devH) {
          l.canvas.width = devW
          l.canvas.height = devH
        }
        l.ctx!.setTransform(1, 0, 0, 1, 0, 0)
        l.ctx!.clearRect(0, 0, devW, devH)
        l.ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      r.paint(back.ctx!, front.ctx!)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, back.tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, back.canvas)
      gl.generateMipmap(gl.TEXTURE_2D)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, front.tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, front.canvas)
    }
    gl.uniform1f(u('uTextured'), r ? 1 : 0)
    gl.uniform1f(u('uRefract'), r?.refract ?? 0)
    gl.uniform1f(u('uMag'), r?.magnify ?? 0)
    gl.uniform1f(u('uDisp'), r?.dispersion ?? 0)
    gl.uniform1f(u('uBlurCenter'), r?.blurCenter ?? 0)
    gl.uniform1f(u('uBlurEdge'), r?.blurEdge ?? 0)
    // Blur level follows screen density (reference: 2.27 device px per design unit).
    gl.uniform1f(u('uBlurShift'), Math.log2(Math.max((unit * dpr) / 2.27, 1e-3)))
    gl.uniform1f(u('uFrost'), r?.frost ?? 0)
    gl.uniform1f(u('uFrostBlur'), Math.max(0, r?.blur ?? 0) / unit)
    gl.uniform1f(u('uFrostMix'), clamp(r?.blurMix ?? 1))
    // Radial bend: a share of the viewport per axis, as the SVG card's map was.
    const radial = Math.max(0, r?.radial ?? 0)
    gl.uniform2f(u('uRadial'), (radial * window.innerWidth) / unit, (radial * window.innerHeight) / unit)
    gl.uniform1f(u('uCssPx'), 1 / unit)
    gl.uniform2f(u('uSize'), devW, devH)
    gl.uniform1f(u('uUnit'), unit * dpr)
    gl.uniform1f(u('uDevicePx'), 1 / (unit * dpr))
    gl.uniform2f(u('uCenter'), m.cx / unit, m.cy / unit)
    gl.uniform2f(u('uHalf'), Math.max(m.hx / unit, 0.5), Math.max(m.hy / unit, 0.5))
    const radius = Math.max(0, Math.min(m.radius, m.hx - 0.5, m.hy - 0.5) / unit)
    gl.uniform1f(u('uRadius'), radius)
    const band = r ? (m.band ?? 0) : 0
    gl.uniform1f(u('uBand'), band)
    gl.uniform1f(u('uFieldRadius'), Math.min(Math.max(radius, band), Math.max(0, (Math.min(m.hx, m.hy) - 0.5) / unit)))
    gl.uniform1f(u('uBodyX'), m.bodyX / unit)
    gl.uniform3f(u('uDrop'), (m.droplet?.x ?? 0) / unit, (m.droplet?.r ?? 0) / unit, (m.droplet?.k ?? 0) / unit)
    const blob = m.blob
    gl.uniform4f(u('uBlob'), (blob?.x ?? 0) / unit, (blob?.y ?? 0) / unit, (blob?.hx ?? 0) / unit, (blob?.hy ?? 0) / unit)
    gl.uniform2f(u('uBlobShape'), (blob?.r ?? 0) / unit, (blob?.k ?? 0) / unit)
    gl.uniform2f(u('uBlobNeck'), (blob?.neck?.x ?? 0) / unit, (blob?.neck?.w ?? 0) / unit)
    gl.uniform2f(u('uBlobFade'), blob?.fade?.amount ?? 0, blob?.fade?.reach ?? 0.5)
    gl.uniform1f(u('uBevel'), Math.max(m.bevel, 2))
    const k = m.tune ?? {}
    gl.uniform1f(u('uRim'), 0.55 * m.strength * (k.rim ?? 1))
    gl.uniform1f(u('uCaustic'), 0.08 * m.strength * (k.caustic ?? 1))
    gl.uniform1f(u('uInner'), 0.1 * m.strength * (k.inner ?? 1))
    gl.uniform1f(u('uTopRefl'), 0.3 * m.strength * (k.reflection ?? 1))
    gl.uniform1f(u('uTopBase'), 0.02 * m.strength * (k.reflection ?? 1))
    gl.uniform1f(u('uRimWidth'), Math.max(0.05, k.rimWidth ?? 1))
    gl.uniform1f(u('uFresnel'), 0.02 * (k.fresnel ?? 1))
    gl.uniform1f(u('uBendCurve'), Math.max(0.05, k.bendCurve ?? 1.6))
    gl.uniform1f(u('uEdgeBand'), 0.35 * Math.max(0.05, k.bendDepth ?? 1))
    gl.uniform1f(u('uSaturation'), Math.max(0, k.saturation ?? 1))
    gl.uniform1f(u('uFrostEdge'), Math.max(0.05, k.frostEdge ?? 1))
    gl.uniform1f(u('uShadow'), m.shadow * m.strength)
    gl.uniform1f(u('uShadowSoft'), m.shadowSoftness)
    gl.uniform1f(u('uShadowOffset'), m.shadowOffset)
    gl.uniform3f(u('uSurface'), ...m.surface)
    gl.uniform3f(u('uColor'), ...m.color)
    gl.uniform1f(u('uEdgeClear'), m.edgeClear)
    gl.uniform3f(u('uBorder'), ...(m.border ?? m.color))
    gl.uniform1f(u('uBorderWidth'), m.border ? Math.max(0, m.borderWidth ?? 1) / unit : 0)
    gl.uniform1f(u('uBorderAlpha'), clamp(m.borderAlpha ?? 1))
    const dx = pointer.x - m.screenX
    const dy = pointer.y - m.screenY
    const d = Math.hypot(dx, dy)
    gl.uniform2f(u('uLightDir'), d > 0.5 ? dx / d : 0, d > 0.5 ? dy / d : -1)
    gl.uniform1f(u('uLightMix'), m.cursorLight ? pointer.mix : 0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    v.ctx.clearRect(0, 0, devW, devH)
    v.ctx.drawImage(glCanvas, 0, glCanvas.height - devH, devW, devH, 0, 0, devW, devH)
    v.drawn?.()
  }

  let raf = 0
  let last = 0
  const frame = (now: number) => {
    raf = 0
    if (dead) return
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
    last = now
    const still = reduced.matches
    const target = pointer.active && !still ? 1 : 0
    const before = pointer.mix
    pointer.mix += (target - pointer.mix) * Math.min(1, dt * 6)
    if (Math.abs(pointer.mix - target) < 0.002) pointer.mix = target
    const relight = pointer.moved || pointer.mix !== before
    pointer.moved = false
    let running = pointer.mix !== target
    for (const v of views) {
      const moving = v.step(dt, still)
      if (moving) running = true
      if (!v.visible) continue
      if (moving || v.dirty || relight) {
        const refresh = v.dirty
        v.dirty = false
        draw(v, refresh)
      }
    }
    if (running) raf = requestAnimationFrame(frame)
    else last = 0
  }
  const wake = () => {
    if (!raf && !dead) raf = requestAnimationFrame(frame)
  }
  const invalidateAll = () => {
    for (const v of views) v.dirty = true
    wake()
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      pointer.moved = true
      wake()
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.active = false
    pointer.moved = true
    wake()
  })
  // Theme switches (class="dark", data-theme, color-scheme) re-read every colour.
  new MutationObserver(invalidateAll).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'style'],
  })
  new MutationObserver(invalidateAll).observe(document.body, { attributes: true, attributeFilter: ['data-theme'], subtree: true })
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', invalidateAll)
  // A radial bend scales with the viewport.
  window.addEventListener('resize', invalidateAll, { passive: true })
  glCanvas.addEventListener('webglcontextlost', () => {
    dead = true
    for (const v of views) {
      v.lost()
      v.ctx.clearRect(0, 0, v.canvas.width, v.canvas.height)
    }
    engine = undefined
  })

  return {
    add: (v) => {
      views.add(v)
      wake()
    },
    remove: (v) => views.delete(v),
    wake,
    resolveColor,
  }
}

let engine: GlassEngine | null | undefined

/** The shared engine (created on first use, client only). `null` = no WebGL2: use the CSS look. */
export function getGlassEngine(): GlassEngine | null {
  if (typeof window === 'undefined') return null
  if (engine === undefined) engine = createEngine()
  return engine
}
