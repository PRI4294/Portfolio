import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

import { profile } from '../../data/profile.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

// Themed via URL params to match the portfolio palette
const THEME = {
  bg:    '0b1020',
  title: '22d3ee',
  text:  'e2e8f0',
  icon:  '7c3aed',
  ring:  '7c3aed',
}

function gitstats(user, type) {
  const base = 'https://github-readme-stats.vercel.app/api'
  const common = `hide_border=true&bg_color=${THEME.bg}&title_color=${THEME.title}&text_color=${THEME.text}&icon_color=${THEME.icon}`
  if (type === 'overview') return `${base}?username=${user}&show_icons=true&${common}&include_all_commits=true&count_private=true`
  if (type === 'langs')    return `${base}/top-langs/?username=${user}&layout=compact&${common}&langs_count=8`
  if (type === 'streak')   return `https://github-readme-streak-stats.herokuapp.com/?user=${user}&hide_border=true&background=${THEME.bg}&stroke=1c2444&ring=${THEME.ring}&fire=${THEME.icon}&currStreakNum=${THEME.title}&sideNums=${THEME.text}&currStreakLabel=${THEME.title}&sideLabels=${THEME.text}&dates=64748b`
  return ''
}

export default function GitHubStats() {
  // Pull username from URL if a real social.github is set; otherwise use the explicit field.
  let username = profile.githubUsername
  if (!username && profile.social.github) {
    const m = profile.social.github.match(/github\.com\/([^/?#]+)/i)
    username = m?.[1] ?? null
  }
  if (!username) return null   // graceful skip when not configured

  return (
    <section id="github" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Open Source"
          title="GitHub Activity"
          intro="A live look at what I'm shipping and the languages I work in most."
        />

        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard className="p-5">
            <StatImage src={gitstats(username, 'overview')} alt="GitHub stats overview" />
          </GlassCard>
          <GlassCard delay={0.1} className="p-5">
            <StatImage src={gitstats(username, 'langs')} alt="Top languages" />
          </GlassCard>
          <GlassCard delay={0.2} className="md:col-span-2 p-5">
            <StatImage src={gitstats(username, 'streak')} alt="Contribution streak" />
          </GlassCard>
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle text-slate-300 hover:border-cyan/60 hover:text-white transition-all text-sm font-medium"
          >
            <Github size={16} />
            Visit @{username} on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function StatImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-auto rounded-lg"
      // The remote SVG already includes its own bg, so we don't need extra styling
    />
  )
}
