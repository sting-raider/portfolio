import { useEffect, useRef, useState } from 'react'
import { BOOT_LINES, executeCommand, type CommandAction } from '../console/commands'

interface Line {
  kind: 'in' | 'out'
  text: string
}

interface ConsoleOverlayProps {
  open: boolean
  onClose: () => void
  onAction: (action: CommandAction) => void
}

export function ConsoleOverlay({ open, onClose, onAction }: ConsoleOverlayProps) {
  const [lines, setLines] = useState<Line[]>(() =>
    BOOT_LINES.map((text) => ({ kind: 'out' as const, text })),
  )
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      // let the slide-in finish before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight })
  }, [lines, open])

  if (!open) return null

  const submit = () => {
    const result = executeCommand(input)
    const echo: Line = { kind: 'in', text: `operator@deck:~$ ${input}` }
    const out: Line[] = result.lines.map((text) => ({ kind: 'out' as const, text }))

    if (result.action?.type === 'clear') {
      setLines([])
    } else {
      setLines((prev) => [...prev, echo, ...out])
    }
    if (result.action && result.action.type !== 'clear') {
      onAction(result.action)
    }
    if (input.trim()) {
      setHistory((prev) => [input, ...prev].slice(0, 50))
    }
    setHistoryIdx(-1)
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, history.length - 1)
      if (history[next]) {
        setHistoryIdx(next)
        setInput(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = historyIdx - 1
      setHistoryIdx(next)
      setInput(next >= 0 ? history[next] : '')
    }
  }

  return (
    <div
      className="console"
      role="dialog"
      aria-label="Operator console"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="console-head">
        <i className="dot" aria-hidden="true" />
        OPERATOR CONSOLE — type `help`
        <button className="console-close" onClick={onClose} aria-label="Close console">
          ESC
        </button>
      </div>
      <div className="console-out" ref={outRef}>
        {lines.map((line, i) => (
          <p className={`console-line console-line--${line.kind}`} key={i}>
            {line.text}
          </p>
        ))}
      </div>
      <div className="console-input-row">
        <span className="console-prompt" aria-hidden="true">
          operator@deck:~$
        </span>
        <input
          ref={inputRef}
          className="console-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Console input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
