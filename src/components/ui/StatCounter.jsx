import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animated count-up number that triggers when scrolled into view.
 * If `value` is a string, it's rendered as-is (no animation).
 */
export function StatCounter({ value, suffix = '', duration = 1.4, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const numeric = typeof value === 'number'
  const [display, setDisplay] = useState(numeric ? 0 : value)

  useEffect(() => {
    if (!inView || !numeric) return
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.floor(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, numeric])

  return (
    <span ref={ref} className={className}>
      {display}
      {numeric && suffix}
    </span>
  )
}
