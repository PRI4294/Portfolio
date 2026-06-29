import { motion } from 'framer-motion'

/**
 * Reusable glassmorphism card with optional reveal animation.
 *
 *   <GlassCard delay={0.2} className="p-6">…</GlassCard>
 */
export function GlassCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  as: Tag = 'div',
  ...rest
}) {
  const MotionTag = motion(Tag)
  return (
    <MotionTag
      className={`glass-card rounded-2xl ${hover ? '' : 'hover:translate-y-0 hover:shadow-none hover:border-violet/20'} ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
