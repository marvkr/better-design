# Building Bulletproof React Components

> Source: [Building Bulletproof React Components — Shu Ding](https://shud.in/thoughts/build-bulletproof-react-components)

Most components are built for the happy path. They work — until they don't. The real world is hostile: server rendering, hydration, multiple instances, concurrent rendering, async children, portals. Your component could face all of them. The question is whether it survives.

The real test isn't whether your component works on your current page. It's whether it works when someone else uses it — in conditions you didn't plan for. That's when fragile components break.

## Make It Server-Proof

A simple theme provider that reads from `localStorage`:

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  return <div className={theme}>{children}</div>
}
// ❌ Crashes in SSR — localStorage doesn't exist on the server
```

`localStorage` doesn't exist on the server. In Next.js, Remix, or any SSR framework, this crashes the build. Move browser APIs into `useEffect`:

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light')
  }, [])

  return <div className={theme}>{children}</div>
}
// ✅ useEffect defers localStorage to client-side only
```

## Make It Hydration-Proof

The server-safe version works, but users see a flash. Server renders light, client hydrates, then the effect runs and switches to dark. Inject a synchronous script that sets the correct value before the browser paints and React hydrates:

```tsx
function ThemeProvider({ children }) {
  return (
    <>
      <div id="theme">{children}</div>
      <script dangerouslySetInnerHTML={{ __html: `
        try {
          const theme = localStorage.getItem('theme') || 'light'
          document.getElementById('theme').className = theme
        } catch (e) {}
      `}} />
    </>
  )
}
// ✅ Inline script sets theme before browser paints
```

No mismatch, no flash.

## Make It Instance-Proof

The hydration-proof version targets a hardcoded `id="theme"`. But what if someone uses two `ThemeProvider`s? Both scripts fight over the same element. Use `useId` to generate stable, unique IDs per instance:

```tsx
function ThemeProvider({ children }) {
  const id = useId()
  return (
    <>
      <div id={id}>{children}</div>
      <script dangerouslySetInnerHTML={{ __html: `
        try {
          const theme = localStorage.getItem('theme') || 'light'
          document.getElementById('${id}').className = theme
        } catch (e) {}
      `}} />
    </>
  )
}
// ✅ useId generates unique IDs per instance
```

Now multiple instances coexist safely.

## Make It Concurrent-Proof

Make the theme server-driven. A Server Component that fetches user preferences:

```tsx
async function ThemeProvider({ children }) {
  const prefs = await db.preferences.get(userId)

  return <div className={prefs.theme}>{children}</div>
}
```

Render it in two places and you might get two identical database queries. Wrap the query in `React.cache` to deduplicate within a single request:

```tsx
import { cache } from 'react'

const getPreferences = cache(
  userId => db.preferences.get(userId)
)

async function ThemeProvider({ children }) {
  const prefs = await getPreferences(userId)

  return <div className={prefs.theme}>{children}</div>
}
// ✅ React cache() deduplicates concurrent calls
```

Same query, called from anywhere, hits the database once.

## Make It Composition-Proof

Passing data to children traditionally meant using `React.cloneElement`:

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { theme })
  })
}
// ❌ Passes theme to children via cloneElement
```

But with React Server Components, `React.lazy`, or `"use cache"`, children might be a Promise or an opaque reference — `cloneElement` won't work. Use context instead:

```tsx
const ThemeContext = createContext('light')

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
// ✅ Context works everywhere — server, client, async
```

Children read the theme through `useContext` — no prop drilling, no cloning.

## Make It Portal-Proof

A theme provider with a keyboard shortcut — Cmd+D to toggle dark mode:

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const toggle = (e) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setTheme(t => t === 'dark' ? 'light' : 'dark')
      }
    }
    window.addEventListener('keydown', toggle)
    return () => window.removeEventListener('keydown', toggle)
  }, [])

  return <div className={theme}>{children}</div>
}
// ❌ Breaks in portals, iframes, pop-out windows
```

If someone renders the app inside a pop-out window, iframe, or via `createPortal`, the shortcut stops working. The listener is attached to the parent window, not the one the component lives in. Use `ownerDocument.defaultView`:

```tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const ref = useRef(null)

  useEffect(() => {
    const win = ref.current?.ownerDocument.defaultView || window
    const toggle = (e) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setTheme(t => t === 'dark' ? 'light' : 'dark')
      }
    }
    win.addEventListener('keydown', toggle)
    return () => win.removeEventListener('keydown', toggle)
  }, [])

  return <div ref={ref} className={theme}>{children}</div>
}
// ✅ ownerDocument.defaultView finds the correct window
```

## Make It Transition-Proof

A settings panel that toggles between simple and advanced views:

```tsx
function ThemeSettings() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <>
      {showAdvanced ? <AdvancedPanel /> : <SimplePanel />}
      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? 'Simple' : 'Advanced'}
      </button>
    </>
  )
}
// ❌ Wrap in <ViewTransition> and nothing animates — panels just snap
```

State updates must go through `startTransition` to enable the view transition:

```tsx
function ThemeSettings() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <>
      {showAdvanced ? <AdvancedPanel /> : <SimplePanel />}
      <button onClick={() =>
        startTransition(() => setShowAdvanced(!showAdvanced))
      }>
        {showAdvanced ? 'Simple' : 'Advanced'}
      </button>
    </>
  )
}
// ✅ startTransition enables the view transition
```

## Make It Activity-Proof

A theme component that injects CSS variables via a `<style>` tag:

```tsx
function DarkTheme({ children }) {
  return (
    <>
      <style>{`
        :root {
          --bg: #000;
          --fg: #fff;
        }
      `}</style>
      {children}
    </>
  )
}
// ❌ Persists even when hidden inside <Activity>
```

`<Activity>` preserves DOM, and `<style>` has DOM-level side effects — it modifies `:root` variables globally. React can't automatically clean up these side effects. Set `media="not all"` to disable the styles when hidden:

```tsx
function DarkTheme({ children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.media = 'all'
    return () => ref.current.media = 'not all'
  }, [])

  return (
    <>
      <style ref={ref}>{`
        :root {
          --bg: #000;
          --fg: #fff;
        }
      `}</style>
      {children}
    </>
  )
}
// ✅ useLayoutEffect sets media='not all' when hidden
```

## Make It Leak-Proof

A Server Component passing a user object (including a session token) to another component. Because `UserThemeConfig` does not create `user`, it might not know that `user` has a sensitive token property. You don't control that component, so you cannot assume it won't pass that to a Client Component. The token gets serialized and sent to the client.

Use `taintUniqueValue` to mark the token as server-only. If that value is ever passed to a Client Component, React throws. To block an entire object, use `taintObjectReference`.

```tsx
import { experimental_taintUniqueValue } from 'react'

async function Dashboard() {
  const user = await getUser()

  experimental_taintUniqueValue(
    'Do not pass the user token to the client.',
    user,
    user.token
  )

  return <UserThemeConfig user={user} />
}
// ✅ taintUniqueValue blocks user.token from being sent to the client
```

## Make It Future-Proof*

This is a concept to understand: be defensive. It is not a pattern to apply everywhere.

A theme that generates random accent colors on mount:

```tsx
function ThemeProvider({ baseTheme, children }) {
  const colors = useMemo(
    () => getRandomColors(baseTheme),
    [baseTheme]
  )

  return <div style={colors}>{children}</div>
}
// ❌ useMemo is a performance hint, not a semantic guarantee
```

React discards cached values during HMR, and reserves the right to do so for offscreen components or features that don't exist yet. If React discards the cache, your theme flickers to different colors. Use state when correctness depends on persistence:

```tsx
function ThemeProvider({ baseTheme, children }) {
  const [colors, setColors] = useState(() => generateAccentColors(baseTheme))
  const [prevTheme, setPrevTheme] = useState(baseTheme)

  if (baseTheme !== prevTheme) {
    setPrevTheme(baseTheme)
    setColors(generateAccentColors(baseTheme))
  }

  return <div style={colors}>{children}</div>
}
// ✅ useState provides semantic persistence guarantee
```

## Summary

These aren't edge cases — they're the new normal. The components that break weren't fragile. They were built for yesterday's React. We're building for tomorrow's.

- **Server-proof**: Move browser APIs into `useEffect`
- **Hydration-proof**: Inline scripts set values before paint
- **Instance-proof**: `useId` for unique, stable IDs per instance
- **Concurrent-proof**: `React.cache` deduplicates queries
- **Composition-proof**: Context over `cloneElement`
- **Portal-proof**: `ownerDocument.defaultView` instead of `window`
- **Transition-proof**: `startTransition` for `<ViewTransition>`
- **Activity-proof**: `useLayoutEffect` to clean up DOM side effects
- **Leak-proof**: `taintUniqueValue` to prevent token leaks
- **Future-proof**: `useState` over `useMemo` when correctness matters
