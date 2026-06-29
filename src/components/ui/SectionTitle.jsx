import { motion } from 'framer-motion'

/**
 * Standardised section header with an eyebrow label, title, and optional intro.
 */
export function SectionTitle({ eyebrow, title, intro, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  return (
    <motion.div
      className={`flex flex-col gap-3 mb-14 ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight section-title">
        {title}
      </h2>
      {intro && (
        <p className="text-slate-400 max-w-xl text-base mt-2 leading-relaxed">
          {intro}
        </p>
      )}
    </motion.div>
  )
}
