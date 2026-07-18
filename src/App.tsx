import { useCallback, useEffect, useRef, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Systems } from './components/Systems'
import { Manifest } from './components/Manifest'
import { Operator } from './components/Operator'
import { Comms } from './components/Comms'
import { ConsoleOverlay } from './components/ConsoleOverlay'
import { Toast } from './components/Toast'
import { CrabActor } from './components/Crab'
import { useKonami } from './hooks/useKonami'
import { useReducedMotion } from './hooks/useReducedMotion'
import { DEFAULT_THEME, THEMES, type CommandAction, type ThemeName } from './console/commands'

const THEME_KEY = 'mission-control-theme'

function readInitialTheme(): ThemeName {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved && (THEMES as readonly string[]).includes(saved)) return saved as ThemeName
  } catch {
    /* storage unavailable — fall through */
  }
  return DEFAULT_THEME
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>(readInitialTheme)
  const [consoleOpen, setConsoleOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [crabs, setCrabs] = useState<number[]>([])
  const reducedMotion = useReducedMotion()
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const crabId = useRef(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [theme])

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(null), 3400)
  }, [])

  const spawnCrabs = useCallback(
    (count: number) => {
      if (reducedMotion) {
        showToast('🦀 the crab waves hello (motion-reduced, so it stays put)')
        return
      }
      const ids = Array.from({ length: count }, () => ++crabId.current)
      setCrabs((prev) => [...prev, ...ids])
    },
    [reducedMotion, showToast],
  )

  const removeCrab = useCallback((id: number) => {
    setCrabs((prev) => prev.filter((c) => c !== id))
  }, [])

  useKonami(
    useCallback(() => {
      spawnCrabs(5)
      showToast('FERRIS PROTOCOL ENGAGED — 🦀🦀🦀🦀🦀')
    }, [spawnCrabs, showToast]),
  )

  // global console toggle: backtick / tilde, Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setConsoleOpen((v) => !v)
      } else if (e.key === 'Escape') {
        setConsoleOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleAction = useCallback(
    (action: CommandAction) => {
      switch (action.type) {
        case 'theme':
          setTheme(action.name)
          showToast(`theme → ${action.name}`)
          break
        case 'open':
          window.open(action.url, '_blank', 'noopener,noreferrer')
          break
        case 'crab':
          spawnCrabs(1)
          break
        case 'exit':
          setConsoleOpen(false)
          break
        case 'clear':
          break
      }
    },
    [showToast, spawnCrabs],
  )

  return (
    <>
      <a className="skip-link" href="#systems">
        SKIP TO SYSTEMS
      </a>
      <Nav onOpenConsole={() => setConsoleOpen(true)} />
      <main>
        <Hero />
        <Systems />
        <Manifest />
        <Operator />
        <Comms />
      </main>
      <ConsoleOverlay
        open={consoleOpen}
        onClose={() => setConsoleOpen(false)}
        onAction={handleAction}
      />
      <Toast message={toast} />
      {crabs.map((id) => (
        <CrabActor key={id} onDone={() => removeCrab(id)} />
      ))}
    </>
  )
}
