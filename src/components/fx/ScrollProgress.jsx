import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gradient progress bar at the very top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.1,
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-gradient-to-r from-violet via-cyan to-violet"
      aria-hidden="true"
    />
  )
}
