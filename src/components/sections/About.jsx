import { motion } from 'framer-motion'
import { MapPin, Sparkles, PenTool, Github, Linkedin, Mail, ArrowUpRight, Rocket } from 'lucide-react'

import { profile } from '../../data/profile.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { TechPill } from '../ui/TechPill.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

const focusStack = [
  { name: 'LangChain',   icon: 'LangChain',    accent: '#7c3aed' },
  { name: 'PyTorch',     icon: 'TensorFlow',   accent: '#22d3ee' },
  { name: 'Python',      icon: 'Python',       accent: '#facc15' },
  { name: 'HuggingFace', icon: 'DeepLearning', accent: '#a3e635' },
  { name: 'FastAPI',     icon: 'Flask',        accent: '#ec4899' },
  { name: 'FAISS',       icon: 'FAISS',        accent: '#f97316' },
]

function Avatar({ size }) {
  if (profile.photo) {
    return (
      <img
        src={profile.photo}
        alt={profile.name}
        className={`${size} object-cover object-center rounded-2xl border border-violet/30 flex-shrink-0`}
        loading="eager"
      />
    )
  }
  return (
    <div
      className={`${size} flex-shrink-0 flex items-center justify-center font-display text-6xl font-bold text-white rounded-2xl`}
      style={{ background: 'linear-gradient(135deg, #7c3aed, #22d3ee)' }}
    >
      {profile.shortName[0]}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Who I Am"
          title="About Me"
          intro="A snapshot of how I work, where I'm based, and what I'm building right now."
        />

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(170px,_auto)]">
          {/* Tile A — hero (spans 2x2) */}
          <GlassCard className="md:col-span-2 md:row-span-2 p-7 flex flex-col">
            <div className="flex items-start gap-5 mb-5">
              <Avatar size="w-36 h-36 flex-shrink-0" />
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{profile.name}</h3>
                <p className="text-cyan text-sm font-mono mt-1">{profile.title}</p>
                <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1.5">
                  <MapPin size={11} /> {profile.location.city} · {profile.location.timezone}
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-[0.95rem] leading-relaxed mb-3.5">
              {profile.bio.about}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {profile.bio.aboutSecondary}{' '}
              I love crafting solutions that are both technically rigorous and genuinely useful.
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-5">
              {['B.Tech IT Graduate', 'AI Engineer @ Biz4Group', 'Production AI Systems', 'Open Source'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[0.7rem] font-mono bg-violet/10 border border-violet/25 text-violet-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Tile B — Currently building */}
          <GlassCard delay={0.1} className="p-6 flex flex-col">
            <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-lime-soft font-mono mb-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              Currently building
            </div>
            <p className="text-white text-sm leading-relaxed flex-1">
              {profile.currentlyBuilding}
            </p>
            <Rocket size={20} className="text-lime mt-3 self-end opacity-70" />
          </GlassCard>

          {/* Tile C — Location */}
          <GlassCard delay={0.15} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-cyan font-mono mb-3">
                <MapPin size={12} />
                Location
              </div>
              <p className="font-display text-xl text-white font-semibold">{profile.location.city}</p>
              <p className="text-slate-400 text-xs mt-1 font-mono">{profile.location.timezone}</p>
            </div>
            {profile.location.remote && (
              <span className="inline-flex items-center gap-1.5 mt-4 px-2.5 py-1 rounded-full text-[0.65rem] font-mono bg-cyan/10 border border-cyan/30 text-cyan-soft self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                Open to remote
              </span>
            )}
          </GlassCard>

          {/* Tile D — Stack focus */}
          <GlassCard delay={0.2} className="md:col-span-2 p-6">
            <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-violet-soft font-mono mb-4">
              <Sparkles size={12} />
              Stack focus
            </div>
            <div className="flex flex-wrap gap-2.5">
              {focusStack.map(t => (
                <TechPill key={t.name} {...t} />
              ))}
            </div>
          </GlassCard>

          {/* Tile E — Beyond code */}
          <GlassCard delay={0.25} className="p-6">
            <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-pink-400 font-mono mb-3">
              <PenTool size={12} />
              Beyond code
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Playing guitar 🎸, sketching ✏️, exploring the frontier of generative models,
              and contributing to open source when not shipping AI at work.
            </p>
          </GlassCard>

          {/* Tile F — Connect */}
          <GlassCard delay={0.3} className="md:col-span-3 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[0.7rem] uppercase tracking-widest text-slate-500 font-mono mb-1">
                  Let's connect
                </div>
                <p className="text-white text-base">
                  Reach out for AI/ML roles, freelance, or research collaborations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <SocialChip icon={Mail}     label="Email"    href={`mailto:${profile.email}`} />
                <SocialChip icon={Github}   label="GitHub"   href={profile.social.github} external />
                <SocialChip icon={Linkedin} label="LinkedIn" href={profile.social.linkedin} external />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

function SocialChip({ icon: Icon, label, href, external = false }) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2 }}
      className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border-subtle bg-bg-surface/60 text-sm text-slate-200 hover:border-cyan/60 hover:text-white transition-colors"
    >
      <Icon size={14} className="text-cyan-soft" />
      {label}
      <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  )
}
