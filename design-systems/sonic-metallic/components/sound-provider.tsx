"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playTick: () => void
  playClick: () => void
}

// Mood: metallic. Generated from @web-kits/audio core patch + mood mutation rules.
const clickDef = {
  "source": {
    "type": "sine",
    "frequency": {
      "start": 200,
      "end": 700
    },
    "fm": {
      "ratio": 2.76,
      "depth": 350
    }
  },
  "envelope": {
    "attack": 0,
    "decay": 0.05,
    "sustain": 0,
    "release": 0.012
  },
  "gain": 0.22
} as const

const tickDef = {
  "source": {
    "type": "sine",
    "frequency": 1500,
    "fm": {
      "ratio": 2.76,
      "depth": 300
    }
  },
  "envelope": {
    "attack": 0,
    "decay": 0.008,
    "sustain": 0,
    "release": 0.003
  },
  "gain": 0.14
} as const

let moduleEnabled = true
let modulePlayClick: ((opts?: unknown) => unknown) | null = null
let modulePlayTick: ((opts?: unknown) => unknown) | null = null
let moduleReady = false

function lazyInit() {
  if (typeof window === "undefined" || moduleReady) return
  try {
    modulePlayClick = defineSound(clickDef as never) as never
    modulePlayTick = defineSound(tickDef as never) as never
    moduleReady = true
    void ensureReady()
  } catch {
    // ignore; will retry on next call
  }
}

function safePlay(fn: ((opts?: unknown) => unknown) | null) {
  if (!moduleEnabled || typeof window === "undefined") return
  lazyInit()
  if (!fn) return
  try { fn() } catch { /* swallow */ }
}

const defaultPlayClick = () => safePlay(modulePlayClick)
const defaultPlayTick = () => safePlay(modulePlayTick)

const SoundContext = React.createContext<SoundContextValue>({
  enabled: true,
  toggle: () => { moduleEnabled = !moduleEnabled },
  playTick: defaultPlayTick,
  playClick: defaultPlayClick,
})

function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true)

  React.useEffect(() => { lazyInit() }, [])

  const toggle = React.useCallback(() => {
    setEnabled((prev) => {
      moduleEnabled = !prev
      return !prev
    })
  }, [])

  const playTick = React.useCallback(() => {
    if (!enabled) return
    safePlay(modulePlayTick)
  }, [enabled])

  const playClick = React.useCallback(() => {
    if (!enabled) return
    safePlay(modulePlayClick)
  }, [enabled])

  const value = React.useMemo(
    () => ({ enabled, toggle, playTick, playClick }),
    [enabled, toggle, playTick, playClick]
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

function useSound() {
  return React.useContext(SoundContext)
}

export { SoundProvider, useSound }
