"use client"

import { useState, useEffect, useMemo } from "react"
import { Icon } from "@iconify/react"

interface IconBrowserProps {
  prefix: string
  libraryName?: string
}

const PAGE_SIZE = 200

export function IconBrowser({ prefix, libraryName }: IconBrowserProps) {
  const [allIcons, setAllIcons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setAllIcons([])
    setSearch("")
    setPage(1)
    fetch(`https://api.iconify.design/collection?prefix=${prefix}`)
      .then(r => r.json())
      .then((data: { uncategorized?: string[]; categories?: Record<string, string[]> }) => {
        const icons: string[] = []
        if (data.categories) {
          for (const names of Object.values(data.categories)) icons.push(...names)
        }
        if (data.uncategorized) icons.push(...data.uncategorized)
        setAllIcons(icons)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [prefix])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allIcons
    return allIcons.filter(n => n.includes(q))
  }, [allIcons, search])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  const handleCopy = (name: string) => {
    const text = `${prefix}:${name}`
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(name)
    setTimeout(() => setCopied(null), 1200)
  }

  const displayName = (libraryName ?? prefix)
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return (
    <div>
      {/* Library name */}
      <div style={{
        fontSize: "13px", fontWeight: 600, color: "var(--foreground)",
        marginBottom: "8px",
      }}>
        {displayName}
      </div>

      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        <Icon
          icon="tabler:search"
          width={13}
          style={{
            position: "absolute", left: "10px", top: "50%",
            transform: "translateY(-50%)",
            color: "var(--muted-foreground)", pointerEvents: "none",
          }}
        />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder={loading ? "Loading icons…" : `Search ${allIcons.length.toLocaleString()} icons…`}
          disabled={loading}
          style={{
            width: "100%", padding: "7px 10px 7px 30px",
            borderRadius: "6px", border: "1px solid var(--border)",
            backgroundColor: "var(--background)", color: "var(--foreground)",
            fontSize: "12px", outline: "none", boxSizing: "border-box",
            opacity: loading ? 0.6 : 1,
          }}
        />
        {search && (
          <span style={{
            position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
            fontSize: "10px", color: "var(--muted-foreground)",
          }}>
            {filtered.length.toLocaleString()}
          </span>
        )}
      </div>

      {/* Icon grid */}
      {loading ? (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "180px", color: "var(--muted-foreground)", fontSize: "12px",
        }}>
          Loading {libraryName ?? prefix}…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100px", color: "var(--muted-foreground)", fontSize: "12px",
        }}>
          No icons matching &ldquo;{search}&rdquo;
        </div>
      ) : (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(76px, 1fr))",
            gap: "2px",
          }}>
            {visible.map(name => {
              const isCopied = copied === name
              return (
                <button
                  key={name}
                  onClick={() => handleCopy(name)}
                  title={`${prefix}:${name}`}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: "5px", padding: "10px 4px 8px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: isCopied ? "var(--primary)" : "transparent",
                    color: isCopied ? "var(--primary-foreground)" : "var(--foreground)",
                    transition: "background-color 0.1s",
                    minWidth: 0,
                  }}
                  onMouseEnter={e => {
                    if (!isCopied) e.currentTarget.style.backgroundColor = "var(--border)"
                  }}
                  onMouseLeave={e => {
                    if (!isCopied) e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  {isCopied
                    ? <Icon icon="tabler:check" width={20} />
                    : <Icon icon={`${prefix}:${name}`} width={20} />
                  }
                  <span style={{
                    fontSize: "9px", opacity: 0.7, textAlign: "center",
                    lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: "nowrap", maxWidth: "100%", width: "100%",
                  }}>
                    {name}
                  </span>
                </button>
              )
            })}
          </div>

          {hasMore && (
            <button
              onClick={() => setPage(p => p + 1)}
              style={{
                marginTop: "12px", width: "100%", padding: "8px 0",
                borderRadius: "6px", border: "1px solid var(--border)",
                backgroundColor: "transparent", color: "var(--muted-foreground)",
                fontSize: "11px", cursor: "pointer",
              }}
            >
              Show more — {visible.length.toLocaleString()} of {filtered.length.toLocaleString()}
            </button>
          )}
        </>
      )}
    </div>
  )
}
