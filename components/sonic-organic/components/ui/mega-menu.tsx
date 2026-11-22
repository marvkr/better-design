"use client"

import { AnimatePresence, motion, type Transition, type Variants } from "motion/react"
import { useState } from "react"

/** ==============   Types   ================ */

interface MegaMenuColumn {
  title: string
  items: string[]
}

interface MegaMenuItem {
  id: string
  label: string
  columns: MegaMenuColumn[]
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  columnStagger?: number
  indicatorTransition?: Transition
  panelOffsetY?: number
  panelEnterTransition?: Transition
  panelExitTransition?: Transition
  contentOffsetX?: number
  contentTransition?: Transition
  columnOffsetY?: number
  columnTransition?: Transition
}

/** ==============   Component   ================ */

export function MegaMenu({
  items,
  columnStagger = 0.04,
  indicatorTransition = { type: "spring", stiffness: 500, damping: 35 },
  panelOffsetY = -8,
  panelEnterTransition = { type: "spring", stiffness: 500, damping: 35 },
  panelExitTransition = { duration: 0.15, ease: "easeOut" },
  contentOffsetX = 40,
  contentTransition = { type: "spring", stiffness: 300, damping: 30 },
  columnOffsetY = 8,
  columnTransition = { type: "spring", stiffness: 400, damping: 30 },
}: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)

  const contentVariants: Variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d ? d * contentOffsetX : 0,
    }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({
      opacity: 0,
      x: d ? d * -contentOffsetX : 0,
    }),
  }

  const handleHover = (id: string) => {
    if (activeMenu !== null && activeMenu !== id) {
      const oldIdx = items.findIndex((n) => n.id === activeMenu)
      const newIdx = items.findIndex((n) => n.id === id)
      setDirection(newIdx > oldIdx ? 1 : -1)
    } else {
      setDirection(0)
    }
    setActiveMenu(id)
  }

  const handleLeave = () => {
    setDirection(0)
    setActiveMenu(null)
  }

  const activeItem = items.find((item) => item.id === activeMenu)

  return (
    <div style={wrapperStyle}>
      <div style={shellStyle} onMouseLeave={handleLeave}>
        <nav style={navStyle}>
          {items.map((item) => (
            <button
              key={item.id}
              onMouseEnter={() => handleHover(item.id)}
              style={{
                ...navButtonStyle,
                color:
                  activeMenu === item.id
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
              }}
            >
              {activeMenu === item.id && (
                <motion.div
                  layoutId="mega-menu-indicator"
                  style={indicatorStyle}
                  transition={indicatorTransition}
                />
              )}
              <span style={labelStyle}>
                {item.label}
                <motion.svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  style={{ marginLeft: 6 }}
                  animate={{
                    rotate: activeMenu === item.id ? 180 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
            </button>
          ))}
        </nav>

        <AnimatePresence>
          {activeMenu && activeItem && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: panelOffsetY }}
              animate={{
                opacity: 1,
                y: 0,
                transition: panelEnterTransition,
              }}
              exit={{
                opacity: 0,
                y: panelOffsetY,
                transition: panelExitTransition,
              }}
              style={panelStyle}
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={activeMenu}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={contentTransition}
                  style={gridStyle}
                >
                  {activeItem.columns.map((col, i) => (
                    <motion.div
                      key={col.title}
                      initial={{
                        opacity: 0,
                        y: direction ? 0 : columnOffsetY,
                      }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        ...columnTransition,
                        delay: i * columnStagger,
                      }}
                      style={columnWrapStyle}
                    >
                      <div style={columnHeadingStyle}>{col.title}</div>
                      {col.items.map((link) => (
                        <div
                          key={link}
                          className="mega-menu-link"
                          style={linkStyle}
                        >
                          {link}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        .mega-menu-link {
          transition: background-color 0.15s;
        }
        .mega-menu-link:hover {
          background-color: var(--muted);
        }
      `}</style>
    </div>
  )
}

/** ==============   Styles (using CSS variables for theming)   ================ */

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
}

const shellStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  paddingBottom: 8,
}

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 2,
  padding: 6,
  backgroundColor: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: 12,
}

const navButtonStyle: React.CSSProperties = {
  position: "relative",
  flex: 1,
  padding: "10px 16px",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",
  border: "none",
  background: "none",
  cursor: "pointer",
  transition: "color 0.2s",
}

const labelStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
}

const indicatorStyle: React.CSSProperties = {
  position: "absolute",
  inset: 2,
  borderRadius: 8,
  backgroundColor: "var(--muted)",
}

const panelStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 50,
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: 24,
  transformOrigin: "top center",
  overflow: "hidden",
  willChange: "transform, opacity",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
  willChange: "transform, opacity",
}

const columnWrapStyle: React.CSSProperties = {
  willChange: "transform, opacity",
}

const columnHeadingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--muted-foreground)",
  padding: "0 10px 12px",
}

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "var(--foreground)",
  padding: "8px 10px",
  borderRadius: 6,
  cursor: "pointer",
}
