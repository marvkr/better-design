"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

/*
 * Sonic Organic — brown noise through low bandpass, wood-tap timbre.
 *
 * playClick: brown noise → bandpass 400 Hz Q=1.5, decay 0.05s → wooden knock.
 * playTick:  brown noise → bandpass 800 Hz Q=1.5, decay 0.015s → soft tick.
 */

const clickSound = defineSound({
  source: { type: "noise", color: "brown" },
  filter: { type: "bandpass", frequency: 400, resonance: 1.5 },
  envelope: { attack: 0, decay: 0.05, sustain: 0, release: 0.025 },
  gain: 0.30,
})

const tickSound = defineSound({
  source: { type: "noise", color: "brown" },
  filter: { type: "bandpass", frequency: 800, resonance: 1.5 },
  envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.008 },
  gain: 0.20,
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
