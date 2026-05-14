"use client"

import * as React from "react"
import { defineSound, ensureReady } from "@web-kits/audio"

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playTick: () => void
  playClick: () => void
}

// Mood: warm. Generated from @web-kits/audio core patch + mood mutation rules.
const clickDef = {
  "source": {
    "type": "sine",
    "frequency": {
      "start": 200,
      "end": 700
    },
    "fm": {
      "ratio": 0.5,
      "depth": 80
    }
  },
  "filter": {
    "type": "lowpass",
    "frequency": 2500
  },
  "envelope": {
    "attack": 0,
    "decay": 0.06,
    "sustain": 0,
    "release": 0.02
  },
  "effects": [
    {
      "type": "reverb",
      "decay": 0.4,
      "mix": 0.1
    }
  ],
  "gain": 0.23
} as const

const tickDef = {
  "source": {
    "type": "sine",
    "frequency": 1500,
    "fm": {
      "ratio": 0.5,
      "depth": 60
    }
  },
  "filter": {
    "type": "lowpass",
    "frequency": 2000
  },
  "envelope": {
    "attack": 0,
    "decay": 0.01,
    "sustain": 0,
    "release": 0.004
  },
  "gain": 0.13
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
