import { useEffect, useRef } from 'react'

/**
 * Subtle "magnetic" cursor pull for interactive elements.
 * Returns a ref to attach to the element you want to pull toward the pointer.
 *
 * Honors prefers-reduced-motion and disables on touch / coarse pointers.
 */
export function useMagnetic({ strength = 0.25, radius = 80 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on touch / reduced motion
    const supportsHover = window.matchMedia('(hover: hover)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reduced) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        raf = requestAnimationFrame(animate)
      } else {
        raf = 0
      }
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < rect.width / 2 + radius) {
        targetX = dx * strength
        targetY = dy * strength
        if (!raf) raf = requestAnimationFrame(animate)
      }
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      if (!raf) raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, radius])

  return ref
}
