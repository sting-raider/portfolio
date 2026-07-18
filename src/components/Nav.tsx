import { useState } from 'react'
import { CrabMark } from './Crab'

const LINKS = [
  { href: '#systems', label: 'SYSTEMS' },
  { href: '#manifest', label: 'MANIFEST' },
  { href: '#operator', label: 'OPERATOR' },
  { href: '#comms', label: 'COMMS' },
]

export function Nav({ onOpenConsole }: { onOpenConsole: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="nav">
        <a className="nav-brand" href="#top" aria-label="Back to top">
          <CrabMark />
          MISSION&nbsp;CONTROL
        </a>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <span className="nav-status">
            <i className="dot" aria-hidden="true" /> ALL SYSTEMS NOMINAL
          </span>
          <button
            className="nav-console"
            onClick={onOpenConsole}
            aria-label="Open operator console"
            title="Open console (`)"
          >
            ~
          </button>
          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="nav-mobile" aria-label="Sections (mobile)">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </>
  )
}
