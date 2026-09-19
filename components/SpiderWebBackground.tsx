'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface SpiderWebBackgroundProps {
  className?: string
  style?: CSSProperties
}

const LIGHT_RGB = '82, 82, 92'
const DARK_RGB = '184, 184, 189'

// A deterministic value keeps the hand-drawn web stable after a resize.
function hash01(n: number) {
  let x = (n | 0) + 0x9e3779b9
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b)
  x ^= x >>> 13
  x = Math.imul(x, 0xc2b2ae35)
  x ^= x >>> 16
  return (x >>> 0) / 4294967296
}

/**
 * A static Canvas 2D web. Its movement is a CSS transform rather than a
 * redraw loop, allowing the browser compositor to animate it smoothly.
 */
export default function SpiderWebBackground({
  className = '',
  style,
}: SpiderWebBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasElement = canvasRef.current
    const context = canvasElement?.getContext('2d')
    if (!canvasElement || !context) return
    const canvas: HTMLCanvasElement = canvasElement
    const ctx: CanvasRenderingContext2D = context

    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches
    const radials = isSmallScreen ? 9 : 13
    const rings = isSmallScreen ? 6 : 8
    const dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.5 : 2)

    function draw() {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (!width || !height) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const dark = document.documentElement.classList.contains('dark')
      const rgb = dark ? DARK_RGB : LIGHT_RGB
      const anchorX = width * 1.02
      const anchorY = -height * 0.18
      const maxRadius =
        Math.hypot(anchorX + width * 0.05, anchorY - height * 1.05) + 24

      const angleAt = (index: number) =>
        ((96 + (80 * index) / Math.max(radials - 1, 1)) * Math.PI) / 180
      const ringFraction = (index: number) =>
        0.16 + 0.76 * Math.pow(index / Math.max(rings - 1, 1), 1.15)
      const pointAt = (radial: number, ring: number) => {
        const angle = angleAt(radial)
        const radius =
          maxRadius *
          ringFraction(ring) *
          (1 + (hash01(radial * 131 + ring * 1973 + 7) - 0.5) * 0.07)
        return {
          x: anchorX + Math.cos(angle) * radius,
          y: anchorY + Math.sin(angle) * radius,
          dx: Math.cos(angle),
          dy: Math.sin(angle),
        }
      }

      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${rgb},${dark ? 0.22 : 0.15})`
      for (let radial = 0; radial < radials; radial++) {
        const angle = angleAt(radial)
        ctx.beginPath()
        ctx.moveTo(anchorX, anchorY)
        ctx.lineTo(
          anchorX + Math.cos(angle) * maxRadius,
          anchorY + Math.sin(angle) * maxRadius,
        )
        ctx.stroke()
      }

      ctx.strokeStyle = `rgba(${rgb},${dark ? 0.18 : 0.12})`
      for (let ring = 0; ring < rings; ring++) {
        ctx.beginPath()
        let previous = pointAt(0, ring)
        ctx.moveTo(previous.x, previous.y)
        for (let radial = 1; radial < radials; radial++) {
          const point = pointAt(radial, ring)
          const sag = Math.hypot(point.x - previous.x, point.y - previous.y) * 0.05
          ctx.quadraticCurveTo(
            (previous.x + point.x) / 2 + point.dx * sag,
            (previous.y + point.y) / 2 + point.dy * sag,
            point.x,
            point.y,
          )
          previous = point
        }
        ctx.stroke()
      }

      const dewCount = isSmallScreen ? 4 : 7
      ctx.fillStyle = `rgba(${rgb},${dark ? 0.38 : 0.3})`
      for (let dew = 0; dew < dewCount; dew++) {
        const point = pointAt(
          1 + Math.floor(hash01(dew * 91 + 13) * (radials - 2)),
          1 + Math.floor(hash01(dew * 57 + 29) * (rings - 1)),
        )
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.1 + hash01(dew * 31 + 7) * 0.9, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let resizeQueued = false
    const resizeObserver = new ResizeObserver(() => {
      if (resizeQueued) return
      resizeQueued = true
      requestAnimationFrame(() => {
        resizeQueued = false
        draw()
      })
    })
    resizeObserver.observe(canvas)

    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    draw()

    return () => {
      resizeObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className={`spider-web-sway pointer-events-none inset-0 h-full w-full ${className}`}
      style={style}
    />
  )
}
