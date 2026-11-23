'use client'

// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

import { useId, useRef, type KeyboardEvent, type PointerEvent } from 'react'

import { drawTrack } from './glass-draw'
import { PRESS, pressedLens, sliderOptics, stepSpring, saturate, type Spring } from './glass-physics'
import { useGlassCanvas } from './use-glass-canvas'
import { Icon, type IconName } from './glass-icon'
import { useElementSize, useSyncedState, type Theme } from './glass-controls-shared'

export type RangeSliderProps = {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  theme?: Theme
  /** Colour of the filled part of the track: a hex, rgb() or named colour, not a CSS variable. Defaults to the kit's blue. */
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  startIcon?: IconName | 'none'
  endIcon?: IconName | 'none'
  showValue?: boolean
  /** At rest: 1 (default) = a flat white pill, 0 = clear glass. Held, it is always clear glass. */
  restFrost?: number
  refraction?: number
  dispersion?: number
  rimIntensity?: number
  magnification?: number
  motionStretch?: number
  motionSmoothing?: number
  pressSpeed?: number
  pressBounce?: number
  /** Accessible name of the range input when no visible label is drawn. [port] */
  'aria-label'?: string
  /** Classes on the outer column. [port] */
  className?: string
}

// The hero slider's design units (params.ts / engine.ts).
const TRACK = 32
const LENS = { w: 245, h: 120 }
const REST = { w: 132, h: 68 }
const PRESS_LEAD = 22
const MARGIN = { x: 80, top: 80, bottom: 220 }
const trackHeights = { sm: 8, md: 12, lg: 18, xl: 26 }

export function RangeSlider({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label = 'Volume',
  theme,
  color,
  size = 'md',
  startIcon = 'none',
  endIcon = 'none',
  showValue = true,
  restFrost = 1,
  refraction = 37,
  dispersion = 0.12,
  rimIntensity = 0.55,
  magnification = 0,
  motionStretch = 3,
  motionSmoothing = 30,
  pressSpeed = PRESS.omega,
  pressBounce = 1 - PRESS.zeta,
  'aria-label': ariaLabel,
  className,
}: RangeSliderProps) {
  const id = useId()
  const [current, setCurrent] = useSyncedState(value, onChange)
  const [areaRef, { width: areaW }] = useElementSize<HTMLDivElement>()

  const unit = trackHeights[size] / TRACK
  const length = Math.max(areaW / unit, 1)
  const areaH = REST.h * unit + 8
  const fraction = max > min ? saturate((current - min) / (max - min)) : 0

  const sim = useRef({ value: { x: fraction, v: 0 } as Spring, press: { x: 0, v: 0 } as Spring, stretch: 0, pressed: false })
  const drag = useRef<{ startX: number; startFraction: number } | null>(null)
  const optics = { ...sliderOptics, refraction, dispersion, rimIntensity, magnification }

  const glassCenter = () => {
    const s = sim.current
    const lens = pressedLens(s.press.x, REST, LENS, restFrost, optics)
    const pc = saturate(s.press.x)
    const inset = lens.hx * (1 - 0.44 * pc)
    return { lens, x: Math.min(length - inset, Math.max(inset, s.value.x * length - PRESS_LEAD * pc)) }
  }

  const { canvasRef } = useGlassCanvas({
    width: areaW + MARGIN.x * 2 * unit,
    height: (MARGIN.top + MARGIN.bottom) * unit,
    unit,
    cursorLight: true,
    step(dt, reduced) {
      const s = sim.current
      const pressTarget = s.pressed ? 1 : 0
      if (reduced) {
        s.value = { x: fraction, v: 0 }
        s.press = { x: pressTarget, v: 0 }
        s.stretch = 0
        return false
      }
      const moving = stepSpring(s.value, fraction, Math.max(motionSmoothing, 0.01), 1, dt)
      // Velocity-driven squash & stretch
      const speed = s.value.v * length
      const stretch = Math.max(-0.04, Math.min(0.04, speed * 3e-5 * motionStretch))
      s.stretch += (stretch - s.stretch) * Math.min(1, dt * 18)
      const zeta = Math.min(1, Math.max(0.05, 1 - pressBounce))
      const pressing = stepSpring(s.press, pressTarget, Math.max(pressSpeed, 0.01), zeta, dt)
      return moving || pressing || Math.abs(s.stretch) > 1e-4
    },
    draw(bg, _fg, tokens) {
      const s = sim.current
      drawTrack(bg, {
        x: MARGIN.x * unit,
        y: MARGIN.top * unit,
        length: areaW,
        height: TRACK * unit,
        fillEnd: (MARGIN.x + s.value.x * length) * unit,
        track: tokens.track,
        accent: color ?? tokens.accent,
      })
      const { lens, x } = glassCenter()
      return {
        ...lens,
        x: MARGIN.x + x,
        y: MARGIN.top,
        stretchX: 1 + Math.abs(s.stretch),
        stretchY: 1 - Math.abs(s.stretch) * 0.45,
        shiftX: s.stretch * -60,
        // The resting thumb is a white pill in both themes; it turns to glass only while held.
        frostCenter: '#ffffff',
        frostEdge: '#e9ebef',
      }
    },
  })

  const setFraction = (f: number) => {
    const raw = min + saturate(f) * (max - min)
    setCurrent(Math.min(max, Math.max(min, Math.round(raw / step) * step)))
  }
  const localX = (e: PointerEvent<HTMLDivElement>) => e.clientX - e.currentTarget.getBoundingClientRect().left

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    sim.current.pressed = true
    const x = localX(e)
    const { lens, x: gx } = glassCenter()
    let start = fraction
    // Clicked the track rather than the glass: jump there, then drag relative to it.
    if (Math.abs(x / unit - gx) > lens.hx + 8) {
      start = x / areaW
      setFraction(start)
    }
    drag.current = { startX: x, startFraction: start }
    e.preventDefault()
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (d) setFraction(d.startFraction + (localX(e) - d.startX) / areaW)
  }
  const onPointerUp = () => {
    drag.current = null
    sim.current.pressed = false
  }
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault()
      setFraction(fraction + (e.key === 'PageUp' ? 0.1 : -0.1))
    }
  }

  return (
    <div data-theme={theme} className={`flex w-full flex-col gap-2 ${className ?? 'max-w-md'}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between px-1 text-[0.8125rem] font-medium">
          <label htmlFor={id} className="text-foreground">
            {label}
          </label>
          {showValue && <span className="text-muted-foreground tabular-nums">{Math.round(current)}</span>}
        </div>
      )}
      <div className="flex items-center gap-4 text-muted-foreground">
        {startIcon !== 'none' && <Icon name={startIcon} size={Math.max(14, trackHeights[size] + 4)} className="relative z-10" />}
        <div
          ref={areaRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative flex-1 cursor-grab touch-none rounded-full select-none active:cursor-grabbing has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ring"
          style={{ height: areaH }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: -MARGIN.x * unit,
              top: areaH / 2 - MARGIN.top * unit,
              width: areaW + MARGIN.x * 2 * unit,
              height: (MARGIN.top + MARGIN.bottom) * unit,
            }}
          />
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={current}
            onChange={(e) => setCurrent(Number(e.currentTarget.value))}
            onKeyDown={onKeyDown}
            aria-label={ariaLabel}
            className="sr-only"
          />
        </div>
        {endIcon !== 'none' && <Icon name={endIcon} size={Math.max(14, trackHeights[size] + 4)} className="relative z-10" />}
      </div>
    </div>
  )
}

export default RangeSlider
