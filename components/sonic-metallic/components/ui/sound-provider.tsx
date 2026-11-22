"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

/*
 * Sonic Metallic — bell-like FM with metallic harmonic ratio + reverb.
 *
 * playClick: sine 880 Hz, FM ratio 2.76 depth 350, 0.35s decay, reverb → struck bell.
 * playTick:  sine 1100 Hz, FM ratio 2.76 depth 200, 0.05s decay → chime tick.
 */

const clickSound = defineSound({
  source: { type: "sine", frequency: 880, fm: { ratio: 2.76, depth: 350 } },
  envelope: { attack: 0, decay: 0.35, sustain: 0.04, release: 0.15 },
  effects: [{ type: "reverb", decay: 0.6, damping: 0.5, mix: 0.12 }],
  gain: 0.18,
})

const tickSound = defineSound({
  source: { type: "sine", frequency: 1100, fm: { ratio: 2.76, depth: 200 } },
  envelope: { attack: 0, decay: 0.05, sustain: 0, release: 0.02 },
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
