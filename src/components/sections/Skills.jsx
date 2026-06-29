import { motion } from 'framer-motion'

import { skillGroups, proficiencies } from '../../data/skills.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { TechPill } from '../ui/TechPill.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="What I Know"
          title="Skills & Tech Stack"
          intro="A grouped view of the tools I use day-to-day to ship AI products from notebook to production."
        />

        {/* ── Categories ── */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {skillGroups.map((group, gi) => (
            <GlassCard key={group.category} delay={gi * 0.08} className="p-6">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-display text-lg text-white font-semibold">
                  {group.category}
                </h3>
                <div
                  className="h-1 w-10 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${group.accent}, transparent)` }}
                />
              </div>
              <p className="text-slate-500 text-xs mb-5">{group.description}</p>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3, delay: gi * 0.05 + si * 0.04 }}
                  >
                    <TechPill {...skill} accent={group.accent} />
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* ── Proficiency bars ── */}
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-7">
            <h3 className="font-display text-lg text-white font-semibold">Core Proficiency</h3>
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-slate-500">
              self-rated
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {proficiencies.map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-cyan font-mono">{item.pct}%</span>
                </div>
                <div className="h-1 bg-bg-surface rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, #7c3aed 0%, #22d3ee 100%)',
                      boxShadow: '0 0 12px rgba(34, 211, 238, 0.45)',
                    }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
