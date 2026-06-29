import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently active based on scroll position.
 * Pass an array of section ids; returns the id of the section most in view.
 */
export function useScrollSpy(ids, { offset = 120 } = {}) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY + offset
        let next = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.offsetTop <= y) next = id
        }
        setActive(next)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}
