"use client"

import * as React from "react"
import { WebHaptics } from "web-haptics"

/*
 * Haptic — tactile feedback via the Web Vibration API (web-haptics).
 *
 * tap:     "medium" impact  → button press, primary action landing.
 * select:  "selection" tick → toggles, checkbox / radio / switch / slider detents.
 * trigger: any built-in preset → success / error / warning / heavy / etc.
 *          Use for variant-specific feedback (destructive button, toast status).
 *
 * Haptics supplement, never replace, the visual feedback (Apple HIG). The UI
 * works fully without vibration: web-haptics silently no-ops on desktop and on
 * any platform without the Vibration API, and we also respect reduced-motion.
 */

// Built-in web-haptics presets (see lib `defaultPatterns`).
type HapticPreset =
  | "success"
  | "warning"
  | "error"
  | "light"
  | "medium"
  | "heavy"
  | "soft"
  | "rigid"
  | "selection"
  | "nudge"
  | "buzz"

const haptics =
  "window" in globalThis && WebHaptics.isSupported
    ? new WebHaptics({ showSwitch: false })
    : null

function getReducedMotion(): boolean {
  if (!("window" in globalThis)) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/*
 * Imperative escape hatch for non-React call sites (e.g. sonner's `toast()`,
 * which fires outside the component tree). Respects reduced-motion; cannot read
 * the provider's enable-toggle, so it always fires when motion is allowed.
 */
function fireHaptic(preset: HapticPreset): void {
  if (!getReducedMotion()) void haptics?.trigger(preset)
}

interface HapticsContextValue {
  enabled: boolean
  toggle: () => void
  tap: () => void
  select: () => void
  trigger: (preset: HapticPreset) => void
}

const HapticsContext = React.createContext<HapticsContextValue>({
  enabled: true,
  toggle: () => {},
  tap: () => {
    if (!getReducedMotion()) void haptics?.trigger("medium")
  },
  select: () => {
    if (!getReducedMotion()) void haptics?.trigger("selection")
  },
  trigger: (preset) => {
    if (!getReducedMotion()) void haptics?.trigger(preset)
  },
})

function HapticsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true)
  const reducedMotion = React.useSyncExternalStore(
    (cb) => {
      if (!("window" in globalThis)) return () => {}
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
      mql.addEventListener("change", cb)
      return () => mql.removeEventListener("change", cb)
    },
    () => getReducedMotion(),
    () => false,
  )

  const toggle = React.useCallback(() => setEnabled((prev) => !prev), [])

  const tap = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void haptics?.trigger("medium")
  }, [enabled, reducedMotion])

  const select = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void haptics?.trigger("selection")
  }, [enabled, reducedMotion])

  const trigger = React.useCallback(
    (preset: HapticPreset) => {
      if (!enabled || reducedMotion) return
      void haptics?.trigger(preset)
    },
    [enabled, reducedMotion],
  )

  const value = React.useMemo(
    () => ({ enabled, toggle, tap, select, trigger }),
    [enabled, toggle, tap, select, trigger],
  )

  return <HapticsContext.Provider value={value}>{children}</HapticsContext.Provider>
}

function useHaptics() {
  return React.useContext(HapticsContext)
}

export { HapticsProvider, useHaptics, fireHaptic }
export type { HapticPreset }
