import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, Star } from 'lucide-react'

import { projects } from '../../data/projects.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { TechPill } from '../ui/TechPill.jsx'
import { NumberedTag } from '../ui/NumberedTag.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

function ProjectThumbnail({ project }) {
  const [imgFailed, setImgFailed] = useState(false)
  const thumbPath = `/projects/${project.slug}.png`

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border-subtle group/thumb">
      {/* Optional real screenshot */}
      {!imgFailed && (
        <img
          src={thumbPath}
          alt={project.title}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/thumb:scale-105 transition-transform duration-700"
        />
      )}

      {/* Gradient placeholder shown if no screenshot exists */}
      {imgFailed && (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
          <div className="absolute inset-0 bg-bg-base/30" />
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-7xl drop-shadow-2xl transition-transform duration-700 group-hover/thumb:scale-110"
              style={{ filter: `drop-shadow(0 0 24px ${project.accent}80)` }}
            >
              {project.icon}
            </div>
          </div>
        </>
      )}

      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-wider backdrop-blur-md"
          style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}55`, color: project.accent }}
        >
          <Star size={10} /> Featured
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-card to-transparent" />
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="glass-card rounded-3xl p-5 group flex flex-col"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <ProjectThumbnail project={project} />

      <div className="pt-5 px-1 flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-2">
          <NumberedTag number={index + 1} accent={project.accent} />
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(90deg, ${project.accent}55, transparent)` }}
          />
        </div>

        <h3 className="font-display text-xl text-white font-bold leading-snug mb-1.5 group-hover:text-cyan-soft transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {project.tagline}
        </p>

        {/* Problem / Outcome trio */}
        <div className="space-y-3 mb-5">
          <CaseLabel label="Problem" value={project.problem} />
          <CaseLabel label="Outcome" value={project.outcome} accent={project.accent} highlight />
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map(s => (
            <TechPill key={s} name={s} accent={project.accent} size="sm" />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center pt-4 mt-auto border-t border-border-subtle/60">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            <Github size={14} />
            View on GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function CaseLabel({ label, value, accent = '#94a3b8', highlight = false }) {
  return (
    <div>
      <div
        className="text-[0.62rem] font-mono uppercase tracking-[0.25em] mb-1"
        style={{ color: highlight ? accent : '#64748b' }}
      >
        / {label}
      </div>
      <p className={`text-sm leading-relaxed ${highlight ? 'text-white' : 'text-slate-400'}`}>
        {value}
      </p>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects"
          intro="A handful of AI/ML projects framed as mini case studies — the problem, the stack, and the outcome."
        />

        <div className="grid md:grid-cols-2 gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/PRI4294"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle text-slate-300 hover:border-cyan/60 hover:text-white transition-all text-sm font-medium"
          >
            <Github size={16} />
            See all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
