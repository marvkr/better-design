"use client"

import * as React from "react"

const CHARS = ["·", "+", "×", "/", "|", "-", "\\", "_", "░", "▒", "○", "◦", "∘"]
const GRID_SIZE = 18
const REVEAL_RADIUS = 180
const FONT_SIZE = 7.2

interface AsciiCursorProps {
  className?: string
  dark?: boolean
}

interface GridCell {
  char: string
  interval: number
  lastChange: number
}

function AsciiCursor({ className, dark = false }: AsciiCursorProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const mouseRef = React.useRef({ x: -1000, y: -1000 })
  const gridRef = React.useRef<GridCell[][]>([])
  const frameRef = React.useRef<number>(0)
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 2
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)
      initGrid()
    }

    const initGrid = () => {
      const cols = Math.ceil(window.innerWidth / GRID_SIZE) + 1
      const rows = Math.ceil(window.innerHeight / GRID_SIZE) + 1
      gridRef.current = []
      for (let r = 0; r < rows; r++) {
        const row: GridCell[] = []
        for (let c = 0; c < cols; c++) {
          row.push({
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            interval: 400 + 1800 * Math.random(),
            lastChange: 0,
          })
        }
        gridRef.current.push(row)
      }
    }

    const wave = (col: number, row: number, time: number) =>
      0.5 + 0.5 * Math.sin(col / 8 + time / 2200) * Math.cos(row / 6 + time / 1800)

    const render = (timestamp: number) => {
      timeRef.current = timestamp
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = dark ? "#ffffff" : "#000000"

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const grid = gridRef.current

      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          const cell = grid[r][c]
          const x = c * GRID_SIZE
          const y = r * GRID_SIZE

          const dist = Math.hypot(x - mx, y - my)
          const proximity = Math.max(0, 1 - dist / REVEAL_RADIUS)

          if (proximity > 0 && timestamp - cell.lastChange > cell.interval * (1 - 0.85 * proximity)) {
            cell.char = CHARS[Math.floor(Math.random() * CHARS.length)]
            cell.lastChange = timestamp
            cell.interval = 400 + 1800 * Math.random()
          }

          const waveVal = wave(c, r, timestamp)
          const baseAlpha = dark ? 0.03 : 0.04
          const waveAlpha = waveVal * (dark ? 0.09 : 0.08)
          const cursorAlpha = proximity * proximity * (dark ? 0.65 : 0.55)

          ctx.globalAlpha = baseAlpha + waveAlpha + cursorAlpha
          ctx.fillText(cell.char, x, y)
        }
      }

      frameRef.current = requestAnimationFrame(render)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  )
}

export { AsciiCursor }
export type { AsciiCursorProps }
