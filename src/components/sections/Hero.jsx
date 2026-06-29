import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown, Download, ArrowRight, Sparkles } from 'lucide-react'

import { profile } from '../../data/profile.js'
import { heroMarquee } from '../../data/skills.js'
import { NeuralBackground } from '../fx/NeuralBackground.jsx'
import { GradientText } from '../ui/GradientText.jsx'
import { MagneticButton } from '../ui/MagneticButton.jsx'
import { StatCounter } from '../ui/StatCounter.jsx'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-aurora overflow-hidden pt-28 pb-24 px-6"
    >
      {/* Animated AI background */}
      <NeuralBackground />

      {/* Glow orbs (slightly softened) */}
      <div
        className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl pointer-events-none animate-aurora"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[24rem] h-[24rem] rounded-full opacity-15 blur-3xl pointer-events-none animate-aurora"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)', animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.35fr,1fr] gap-14 lg:gap-12 items-center">
        {/* ── LEFT ── */}
        <div className="flex flex-col">
          {/* Availability pill */}
          <motion.div
            className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lime/30 bg-lime/5 mb-9 backdrop-blur-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
            </span>
            <span className="text-[0.72rem] font-mono text-lime-soft tracking-wide">
              {profile.availabilityShort}
            </span>
          </motion.div>

          {/* Name — dominant, premium */}
          <motion.h1
            className="font-display font-bold text-white leading-[1.02] tracking-tight mb-6
                       text-5xl sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.85rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <span className="block font-medium text-slate-300/90 text-2xl sm:text-3xl md:text-4xl mb-3 tracking-normal">
              Hi, I'm
            </span>
            <GradientText>{profile.shortName}</GradientText>
          </motion.h1>

          {/* Rotating role — secondary but impactful (~28% smaller than name's md size) */}
          <motion.div
            className="font-display font-semibold text-cyan-soft mb-8
                       text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight min-h-[1.6em]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-slate-500 font-normal mr-1.5">{'>'}</span>
            <TypeAnimation
              sequence={profile.roles.flatMap((r) => [r, 1900])}
              wrapper="span"
              speed={55}
              deletionSpeed={75}
              repeat={Infinity}
              cursor={true}
            />
          </motion.div>

          {/* Bio — narrower for better hierarchy */}
          <motion.p
            className="text-slate-400 text-[0.95rem] sm:text-base leading-[1.7] max-w-md mb-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            {profile.bio.hero}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3.5 items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <MagneticButton href="#projects" variant="primary" iconRight={ArrowRight}>
              Explore Projects
            </MagneticButton>
            <MagneticButton href={profile.resume} variant="secondary" icon={Download} download>
              Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── RIGHT — stats card ── */}
        <motion.div
          className="hidden lg:block relative"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="relative rounded-3xl p-7 bg-bg-card/40 backdrop-blur-xl border border-border-subtle/70 shadow-[0_10px_50px_-15px_rgba(124,58,237,0.35)] transition-all duration-500 hover:border-cyan/30 hover:shadow-[0_10px_60px_-15px_rgba(34,211,238,0.35)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-[0.22em] text-cyan-soft/90">
                <Sparkles size={12} />
                By the numbers
              </div>
              <span className="text-[0.6rem] font-mono uppercase tracking-widest text-slate-600">
                snapshot
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {profile.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border-subtle/70 bg-bg-surface/40 p-4 transition-all duration-300 hover:border-violet/40 hover:bg-bg-surface/70 hover:-translate-y-0.5"
                >
                  <div className="font-display text-[1.7rem] leading-none font-bold tracking-tight">
                    <StatCounter
                      value={s.value}
                      suffix={s.suffix}
                      className="bg-gradient-to-br from-violet-soft via-cyan-soft to-violet-soft bg-clip-text text-transparent"
                    />
                  </div>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-slate-400 mt-2 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="mt-6 pt-5 border-t border-border-subtle/60">
              <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 mb-2 font-mono">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime" />
                </span>
                Availability
              </div>
              <p className="text-[0.84rem] text-slate-300 leading-relaxed">
                {profile.availability}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee tech strip */}
      <div className="absolute bottom-14 left-0 right-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...heroMarquee, ...heroMarquee].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-mono text-xs uppercase tracking-[0.3em] text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-600 hover:text-cyan transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  )
}
