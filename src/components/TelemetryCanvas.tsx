import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Blip {
  x: number
  y: number
  born: number
  ttl: number
}

/**
 * Radar-style telemetry backdrop: a faint dot lattice, a slow sweep,
 * and blips that fade in and out. Static single frame under reduced motion.
 */
export function TelemetryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let blips: Blip[] = []
    let lastBlip = 0

    const colors = { dot: '', sweep: '', blip: '', ring: '' }
    const readColors = () => {
      const style = getComputedStyle(document.documentElement)
      const accent = style.getPropertyValue('--accent').trim() || '#ff7a1a'
      const line = style.getPropertyValue('--line-strong').trim() || '#2e3746'
      colors.dot = line
      colors.sweep = accent
      colors.blip = accent
      colors.ring = line
    }
    readColors()

    const themeObserver = new MutationObserver(readColors)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const GAP = 56

    const drawLattice = () => {
      ctx.fillStyle = colors.dot
      ctx.globalAlpha = 0.5
      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          ctx.fillRect(x, y, 1.5, 1.5)
        }
      }
      ctx.globalAlpha = 1
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      drawLattice()
      // a few resting blips so the reduced-motion frame still feels alive
      ctx.fillStyle = colors.blip
      ctx.globalAlpha = 0.5
      for (const [fx, fy] of [
        [0.18, 0.3],
        [0.72, 0.22],
        [0.55, 0.68],
        [0.86, 0.55],
      ]) {
        ctx.beginPath()
        ctx.arc(width * fx, height * fy, 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    if (reduced) {
      drawStatic()
      return () => {
        themeObserver.disconnect()
        window.removeEventListener('resize', resize)
      }
    }

    const origin = () => ({ x: width * 0.82, y: height * 0.78 })
    const start = performance.now()

    const frame = (now: number) => {
      const t = (now - start) / 1000
      ctx.clearRect(0, 0, width, height)
      drawLattice()

      const { x: ox, y: oy } = origin()
      const radius = Math.hypot(width, height)

      // concentric range rings
      ctx.strokeStyle = colors.ring
      ctx.globalAlpha = 0.35
      ctx.lineWidth = 1
      for (const r of [90, 180, 270]) {
        ctx.beginPath()
        ctx.arc(ox, oy, r, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // sweep cone
      const angle = t * 0.45
      const grad = ctx.createConicGradient ? ctx.createConicGradient(angle, ox, oy) : null
      if (grad) {
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.04, colors.sweep + '2e')
        grad.addColorStop(0.1, 'transparent')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.arc(ox, oy, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      // sweep leading edge
      ctx.strokeStyle = colors.sweep
      ctx.globalAlpha = 0.5
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(ox + Math.cos(angle + 0.13) * radius, oy + Math.sin(angle + 0.13) * radius)
      ctx.stroke()
      ctx.globalAlpha = 1

      // spawn blips
      if (now - lastBlip > 1400 && blips.length < 7) {
        lastBlip = now
        blips.push({
          x: width * (0.08 + Math.random() * 0.84),
          y: height * (0.1 + Math.random() * 0.8),
          born: now,
          ttl: 2600 + Math.random() * 2200,
        })
      }
      blips = blips.filter((b) => now - b.born < b.ttl)

      for (const b of blips) {
        const age = (now - b.born) / b.ttl
        const alpha = age < 0.15 ? age / 0.15 : 1 - (age - 0.15) / 0.85
        ctx.fillStyle = colors.blip
        ctx.globalAlpha = alpha * 0.85
        ctx.beginPath()
        ctx.arc(b.x, b.y, 2.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = colors.blip
        ctx.globalAlpha = alpha * 0.35
        ctx.beginPath()
        ctx.arc(b.x, b.y, 2.6 + age * 16, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
