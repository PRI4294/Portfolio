import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { experiences } from '../../data/experience.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

function CompanyMark({ company, accent }) {
  const initial = company.charAt(0).toUpperCase()
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center font-display text-lg font-bold text-white flex-shrink-0"
      style={{
        background: `linear-gradient(135deg, ${accent}55, ${accent}15)`,
        boxShadow: `0 0 24px ${accent}30`,
        border: `1px solid ${accent}55`,
      }}
    >
      {initial}
    </div>
  )
}

function TimelineEntry({ exp, index, isLast }) {
  return (
    <motion.div
      className="relative grid grid-cols-[auto,1fr] gap-5 pb-10"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Node */}
      <div className="flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full z-10 mt-1.5"
          style={{
            background: exp.accent,
            boxShadow: `0 0 0 4px ${exp.accent}25, 0 0 18px ${exp.accent}80`,
          }}
        />
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-6 ml-3">
        <div className="flex items-start gap-4 mb-3">
          <CompanyMark company={exp.company} accent={exp.accent} />
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg text-white font-semibold leading-tight">
              {exp.role}
            </h3>
            <p
              className="font-mono text-xs mt-1"
              style={{ color: exp.accent }}
            >
              {exp.company} · {exp.type}
            </p>
          </div>
          <span className="text-[0.7rem] font-mono px-2.5 py-1 rounded-full bg-bg-surface border border-border-subtle text-slate-400 whitespace-nowrap">
            {exp.period}
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

        <ul className="space-y-1.5">
          {exp.highlights.map(h => (
            <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="mt-1 flex-shrink-0" style={{ color: exp.accent }}>▹</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="My Journey"
          title="Experience"
          intro="Roles and programs that shaped my AI engineering practice."
        />

        <div ref={containerRef} className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border-subtle/60" />
          <motion.div
            className="absolute left-2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-violet via-cyan to-violet"
            style={{ scaleY: lineScale }}
          />

          <div className="pl-1">
            {experiences.map((exp, i) => (
              <TimelineEntry
                key={exp.role + exp.company}
                exp={exp}
                index={i}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
