import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

/**
 * Canvas-based neural-network background.
 * Tuned to support content (not compete with it):
 *   - lower node count
 *   - softer node + connection opacity
 *   - subtle mouse-parallax for depth
 *   - pauses when tab hidden, honors prefers-reduced-motion
 */
export function NeuralBackground({ density = 'auto' }) {
  const wrapperRef = useRef(null)
  const canvasRef  = useRef(null)
  const reduced    = useReducedMotion()

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas  = canvasRef.current
    if (!canvas || !wrapper) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0
    let nodes = []
    let raf = 0
    let hidden = false

    // Mouse parallax target / current (subtle ±10px translate of the canvas wrapper)
    let parallaxTx = 0, parallaxTy = 0
    let parallaxCx = 0, parallaxCy = 0

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    // Nudged back up slightly from 40/18 → 46/22 for a touch more presence
    const nodeCount = density === 'auto' ? (isMobile ? 22 : 46) : density
    const maxDist   = isMobile ? 130 : 175

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      nodes = Array.from({ length: nodeCount }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: 0.9 + Math.random() * 1.6,
        // depth ∈ [0.6, 1] — used to give a sense of front/back layering
        depth: 0.6 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Soft radial glow underlay (slightly more present)
      const grad = ctx.createRadialGradient(w * 0.3, h * 0.4, 50, w * 0.5, h * 0.5, Math.max(w, h) * 0.7)
      grad.addColorStop(0, 'rgba(124, 58, 237, 0.09)')
      grad.addColorStop(1, 'rgba(6, 8, 15, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Update nodes
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          n.pulse += 0.012
        }
      }

      // Connections first (so nodes sit on top)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < maxDist) {
            // line opacity nudged from 0.22 → 0.28 (still well below original 0.32)
            const opacity = (1 - dist / maxDist) * 0.28 * ((a.depth + b.depth) / 2)
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const p = (Math.sin(n.pulse) + 1) * 0.5 // 0..1
        const radius = (n.r + p * 0.9) * n.depth
        // base alpha nudged from 0.32 → 0.40, pulse from 0.25 → 0.30
        const alpha = (0.40 + p * 0.30) * n.depth

        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`
        ctx.fill()

        // Outer halo (slightly more visible cyan)
        ctx.beginPath()
        ctx.arc(n.x, n.y, radius * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${0.07 * p * n.depth})`
        ctx.fill()
      }

      // Smooth parallax of the canvas wrapper
      parallaxCx += (parallaxTx - parallaxCx) * 0.08
      parallaxCy += (parallaxTy - parallaxCy) * 0.08
      wrapper.style.transform = `translate3d(${parallaxCx.toFixed(2)}px, ${parallaxCy.toFixed(2)}px, 0)`

      if (!hidden) raf = requestAnimationFrame(draw)
    }

    const onMouse = (e) => {
      // ±10px max translate of the canvas relative to cursor position
      const nx = (e.clientX / window.innerWidth)  - 0.5
      const ny = (e.clientY / window.innerHeight) - 0.5
      parallaxTx = nx * 14
      parallaxTy = ny * 10
    }

    const onVisibility = () => {
      hidden = document.hidden
      if (!hidden) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    }

    const onResize = () => {
      cancelAnimationFrame(raf)
      resize()
      seed()
      raf = requestAnimationFrame(draw)
    }

    resize()
    seed()
    raf = requestAnimationFrame(draw)

    const supportsHover = window.matchMedia('(hover: hover)').matches
    if (supportsHover && !reduced) window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, density])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ transition: 'opacity .4s' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Vignette fade so the bg melts into content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(6,8,15,0.55) 80%)',
        }}
      />
    </div>
  )
}
