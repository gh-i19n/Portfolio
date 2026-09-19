'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface SpiderWebBackgroundProps {
  className?: string
  style?: CSSProperties
}

// Deterministic PRNG so the web geometry is stable across resizes/paints.
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const LIGHT_RGB = '82, 82, 92' // --muted-foreground (light)
const DARK_RGB = '184, 184, 189' // --muted-foreground (dark)

interface DewDrop {
  radial: number
  ring: number
  r: number
  phase: number
}

interface Pluck {
  x: number
  y: number
  t0: number
}

/**
 * Subtle animated spider-web backdrop rendered on Canvas 2D.
 * Corner-anchored, theme-aware, pauses offscreen / in background tabs,
 * respects prefers-reduced-motion, and degrades gracefully on slow devices.
 */
export default function SpiderWebBackground({
  className = '',
  style,
}: SpiderWebBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const context = canvasEl.getContext('2d')
    if (!context) return
    // Hoist into non-nullable locals so closures below stay type-safe.
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = context

    const host = canvas.parentElement ?? canvas
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches

    // ---- tunable state (refs, never re-render) ----
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.5 : 2)
    let degraded = false
    let slowFrames = 0
    let emaDt = 16

    const RADIALS = isSmallScreen ? 9 : 13
    const RINGS = isSmallScreen ? 6 : 8

    // Anchor sits just offscreen past the top-right corner.
    let ax = 0
    let ay = 0
    let maxR = 0
    let jitter: number[][] = []
    let dews: DewDrop[] = []
    let pluck: Pluck | null = null
    let lastPluckAt = 0

    let dark = document.documentElement.classList.contains('dark')
    let raf = 0
    let running = false
    let lastT = 0

    const rand = mulberry32(20260919)

    function buildGeometry() {
      ax = w * 1.02
      ay = -h * 0.18
      // Reach past the far (bottom-left) corner so threads exit the canvas.
      maxR = Math.hypot(ax + w * 0.05, ay - h * 1.05) + 24

      jitter = Array.from({ length: RINGS }, (_, j) =>
        Array.from({ length: RADIALS }, (_, i) => {
          void i
          void j
          return 1 + (rand() - 0.5) * 0.07
        }),
      )

      const dewRand = mulberry32(77)
      dews = Array.from({ length: isSmallScreen ? 4 : 7 }, () => ({
        radial: 1 + Math.floor(dewRand() * (RADIALS - 2)),
        ring: 1 + Math.floor(dewRand() * (RINGS - 1)),
        r: 1.1 + dewRand() * 0.9,
        phase: dewRand() * Math.PI * 2,
      }))
    }

    function resize() {
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      if (!cw || !ch) return
      w = cw
      h = ch
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGeometry()
      if (reducedMotion || !running) draw(0)
    }

    const angleAt = (i: number) =>
      ((96 + (80 * i) / Math.max(RADIALS - 1, 1)) * Math.PI) / 180

    const ringFrac = (j: number) =>
      0.16 + 0.76 * Math.pow(j / Math.max(RINGS - 1, 1), 1.15)

    function ringPoint(i: number, j: number, t: number) {
      const a = angleAt(i)
      const dx = Math.cos(a)
      const dy = Math.sin(a)
      const r = maxR * ringFrac(j) * jitter[j][i]
      let x = ax + dx * r
      let y = ay + dy * r

      // Ambient sway — outer threads drift more.
      const swayAmp = 1 + 3 * (r / maxR)
      const sway = Math.sin(t * 0.9 + i * 0.7 + j * 1.3) * swayAmp
      x += -dy * sway
      y += dx * sway

      // Cursor pluck ripple.
      if (pluck) {
        const age = (t - pluck.t0) / 1000
        if (age >= 0 && age < 1.4) {
          const d = Math.hypot(x - pluck.x, y - pluck.y) / maxR
          const disp =
            9 *
            Math.sin(26 * d - age * 16) *
            Math.exp(-3.5 * d) *
            Math.exp(-2.4 * age)
          x += dx * disp
          y += dy * disp
        } else if (age >= 1.4) {
          pluck = null
        }
      }
      return { x, y, dx, dy }
    }

    function draw(nowMs: number) {
      const t = nowMs / 1000
      ctx.clearRect(0, 0, w, h)
      const rgb = dark ? DARK_RGB : LIGHT_RGB

      // Radial threads (structural — static).
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${rgb},${dark ? 0.22 : 0.15})`
      ctx.beginPath()
      for (let i = 0; i < RADIALS; i++) {
        const a = angleAt(i)
        ctx.moveTo(ax, ay)
        ctx.lineTo(ax + Math.cos(a) * maxR, ay + Math.sin(a) * maxR)
      }
      ctx.stroke()

      // Concentric arcs with a slight hand-drawn sag between radials.
      ctx.strokeStyle = `rgba(${rgb},${dark ? 0.18 : 0.12})`
      for (let j = 0; j < RINGS; j++) {
        ctx.beginPath()
        let prev = ringPoint(0, j, t)
        ctx.moveTo(prev.x, prev.y)
        for (let i = 1; i < RADIALS; i++) {
          const p = ringPoint(i, j, t)
          const mx = (prev.x + p.x) / 2
          const my = (prev.y + p.y) / 2
          const sag = Math.hypot(p.x - prev.x, p.y - prev.y) * 0.05
          ctx.quadraticCurveTo(
            mx + p.dx * sag,
            my + p.dy * sag,
            p.x,
            p.y,
          )
          prev = p
        }
        ctx.stroke()
      }

      // Dew drops — slow shimmer, no shadowBlur (mobile-GPU friendly).
      for (const d of dews) {
        const p = ringPoint(d.radial, d.ring, t)
        const alpha = (dark ? 0.4 : 0.32) + 0.18 * Math.sin(t * 1.4 + d.phase)
        ctx.fillStyle = `rgba(${rgb},${Math.max(alpha, 0.08)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop(now: number) {
      if (!running) return
      // Adaptive quality: sustained slow frames -> drop to DPR 1.
      if (!reducedMotion) {
        const dt = now - lastT
        lastT = now
        if (dt > 0 && dt < 250) {
          emaDt = emaDt * 0.95 + dt * 0.05
          if (emaDt > 26 && !degraded) {
            slowFrames += 1
            if (slowFrames > 60) {
              degraded = true
              dpr = 1
              resize()
            }
          } else if (emaDt <= 26) {
            slowFrames = 0
          }
        }
      }
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    function start() {
      if (running || reducedMotion) return
      running = true
      lastT = performance.now()
      raf = requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    // ---- wiring ----
    let resizeQueued = false
    const ro = new ResizeObserver(() => {
      if (resizeQueued) return
      resizeQueued = true
      requestAnimationFrame(() => {
        resizeQueued = false
        resize()
      })
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else {
        const rect = canvas.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) start()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastPluckAt < 140) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < -40 || y < -40 || x > rect.width + 40 || y > rect.height + 40)
        return
      if (
        pluck &&
        Math.hypot(x - pluck.x, y - pluck.y) < 24 &&
        now - lastPluckAt < 400
      )
        return
      lastPluckAt = now
      pluck = { x, y, t0: now }
      // Wake the loop for the ripple if it was idle.
      if (!running && !reducedMotion) start()
    }
    host.addEventListener('pointermove', onPointerMove, { passive: true })

    const mo = new MutationObserver(() => {
      dark = document.documentElement.classList.contains('dark')
      if (reducedMotion) draw(0)
    })
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    resize()
    if (reducedMotion) {
      draw(0)
    } else {
      start()
    }

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={style}
    />
  )
}
