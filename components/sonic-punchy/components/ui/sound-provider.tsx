"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

/*
 * Sonic Punchy — square-wave snap.
 *
 * playClick: 1500→400 Hz square sweep, sharp 0.04s decay.
 * playTick:  fixed 1800 Hz square, tight 0.012s decay.
 *
 * Mirrors the API shape used by every DS that opts into sound: { enabled, toggle, playTick, playClick }.
 * The underlying engine is @web-kits/audio — declarative, ~11 kB gz, automatically respects
 * prefers-reduced-motion when used via its own useSound hook (we drive defineSound directly
 * for parity with the existing clicky API, so we gate manually below).
 */

const clickSound = defineSound({
  source: { type: "square", frequency: { start: 1500, end: 400 } },
  envelope: { attack: 0, decay: 0.04, sustain: 0, release: 0.02 },
  gain: 0.22,
})

const tickSound = defineSound({
  source: { type: "square", frequency: 1800 },
  envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.004 },
  gain: 0.16,
})

let moduleEnabled = true

function getReducedMotion(): boolean {
  if (!("window" in globalThis)) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function trigger(fn: () => void) {
  if (!moduleEnabled || getReducedMotion()) return
  void ensureReady().then(() => {
    fn()
  })
}

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playTick: () => void
  playClick: () => void
}

const SoundContext = React.createContext<SoundContextValue>({
  enabled: true,
  toggle: () => {
    moduleEnabled = !moduleEnabled
  },
  playTick: () => trigger(tickSound),
  playClick: () => trigger(clickSound),
})

function SoundProvider({ children }: { children: React.ReactNode }) {
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

  const playTick = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void ensureReady().then(() => {
      tickSound()
    })
  }, [enabled, reducedMotion])

  const playClick = React.useCallback(() => {
    if (!enabled || reducedMotion) return
    void ensureReady().then(() => {
      clickSound()
    })
  }, [enabled, reducedMotion])

  const value = React.useMemo(
    () => ({ enabled, toggle, playTick, playClick }),
    [enabled, toggle, playTick, playClick],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

function useSound() {
  return React.useContext(SoundContext)
}

export { SoundProvider, useSound }
