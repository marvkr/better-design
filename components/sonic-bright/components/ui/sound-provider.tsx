"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

/*
 * Sonic Bright — saturated sawtooth blip, fast decay.
 *
 * playClick: sawtooth 1400 → 500 Hz, lowpass 2500 Hz, decay 0.03s → chip blip.
 * playTick:  sawtooth 1800 Hz, lowpass 3000 Hz, decay 0.012s → quick zap.
 */

const clickSound = defineSound({
  source: { type: "sawtooth", frequency: { start: 1400, end: 500 } },
  filter: { type: "lowpass", frequency: 2500 },
  envelope: { attack: 0, decay: 0.03, sustain: 0, release: 0.015 },
  gain: 0.18,
})

const tickSound = defineSound({
  source: { type: "sawtooth", frequency: 1800 },
  filter: { type: "lowpass", frequency: 3000 },
  envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.005 },
  gain: 0.12,
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
