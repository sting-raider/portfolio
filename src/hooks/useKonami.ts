import { useEffect, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonami(onUnlock: () => void) {
  const progress = useRef(0)
  const callback = useRef(onUnlock)
  callback.current = onUnlock

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      progress.current = key === SEQUENCE[progress.current] ? progress.current + 1 : 0
      if (progress.current === SEQUENCE.length) {
        progress.current = 0
        callback.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
