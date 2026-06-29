import { Award, GraduationCap, PenTool, Github, ExternalLink } from 'lucide-react'

import { certifications } from '../../data/certifications.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

const iconMap = {
  award:      Award,
  graduation: GraduationCap,
  pen:        PenTool,
  github:     Github,
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Credentials"
          title="Certifications & Achievements"
          intro="Programs, awards, and recognition along the way."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c, i) => {
            const Icon = iconMap[c.icon] ?? Award
            return (
              <GlassCard key={c.title} delay={i * 0.07} className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${c.accent}30, ${c.accent}10)`,
                      border: `1px solid ${c.accent}50`,
                    }}
                  >
                    <Icon size={18} style={{ color: c.accent }} />
                  </div>
                  <span className="text-[0.7rem] font-mono text-slate-500 px-2.5 py-1 rounded-full bg-bg-surface border border-border-subtle">
                    {c.year}
                  </span>
                </div>

                <h3 className="font-display text-base text-white font-semibold leading-snug mb-1">
                  {c.title}
                </h3>
                <p
                  className="text-xs font-mono mb-3"
                  style={{ color: c.accent }}
                >
                  {c.issuer}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-auto">{c.description}</p>

                {c.credentialFile && (
                  <a
                    href={c.credentialFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-[0.72rem] font-mono transition-colors"
                    style={{ color: c.accent }}
                  >
                    <ExternalLink size={11} />
                    View Certificate
                  </a>
                )}
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
