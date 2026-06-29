import { Heart, Github, Linkedin, Mail, Home } from 'lucide-react'

import { profile } from '../../data/profile.js'
import { navLinks } from '../../data/nav.js'

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-6 border-t border-border-subtle/50 mt-10">
      {/* Top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)' }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-10">
        {/* Brand */}
        <div>
          <a href="#home" aria-label="Home" className="inline-flex items-center mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #22d3ee)' }}
            >
              <Home size={17} strokeWidth={2.25} />
            </div>
          </a>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            AI Engineer building intelligent systems — from RAG pipelines to LLM-powered apps.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
            Navigate
          </h4>
          <ul className="space-y-2">
            {navLinks.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-slate-300 hover:text-cyan text-sm transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
            Elsewhere
          </h4>
          <div className="flex gap-3">
            <SocialIcon icon={Mail}     href={`mailto:${profile.email}`} label="Email" />
            <SocialIcon icon={Github}   href={profile.social.github}      label="GitHub" external />
            <SocialIcon icon={Linkedin} href={profile.social.linkedin}    label="LinkedIn" external />
          </div>
          <p className="text-slate-500 text-xs mt-5 font-mono">
            {profile.location.city} · {profile.location.timezone}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-border-subtle/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-600 text-xs flex items-center gap-1.5">
          © {new Date().getFullYear()} {profile.name} · Built with
          <Heart size={11} className="text-pink-500 fill-pink-500" />
          using React, Tailwind & Framer Motion
        </p>
        <p className="text-slate-700 text-[0.65rem] font-mono uppercase tracking-widest">
          Press ⌘K to navigate
        </p>
      </div>
    </footer>
  )
}

function SocialIcon({ icon: Icon, href, label, external = false }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-subtle text-slate-400 hover:text-white hover:border-cyan/60 transition-colors"
    >
      <Icon size={15} />
    </a>
  )
}
