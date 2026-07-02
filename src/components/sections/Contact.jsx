import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Download, Send, MapPin, Copy, Check } from 'lucide-react'

import { profile } from '../../data/profile.js'
import { SectionTitle } from '../ui/SectionTitle.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { MagneticButton } from '../ui/MagneticButton.jsx'
import { GridBackground } from '../fx/GridBackground.jsx'

const contactCards = [
  { key: 'email',    icon: Mail,     label: 'Email',    accent: '#7c3aed' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', accent: '#22d3ee' },
  { key: 'github',   icon: Github,   label: 'GitHub',   accent: '#ec4899' },
]

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const ta = document.createElement('textarea')
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
  return Promise.resolve()
}

function ContactCard({ icon: Icon, label, value, href, accent, external = false, allowCopy = false }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await copyToClipboard(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -3 }}
      className="glass-card group w-full flex items-center gap-3 p-4 rounded-2xl relative overflow-hidden min-w-0"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
      >
        <Icon size={18} style={{ color: accent }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] uppercase tracking-widest text-slate-500 font-mono">{label}</p>
        <p className="text-white text-sm font-medium truncate group-hover:text-cyan-soft transition-colors">
          {value}
        </p>
      </div>
      {allowCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="text-slate-500 hover:text-cyan transition-colors p-2"
          aria-label="Copy email"
        >
          {copied ? <Check size={14} className="text-lime" /> : <Copy size={14} />}
        </button>
      )}
    </motion.a>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const valueFor = {
    email:    profile.email,
    linkedin: profile.social.linkedin,
    github:   profile.social.github,
  }
  const hrefFor = {
    email:    `mailto:${profile.email}`,
    linkedin: profile.social.linkedin,
    github:   profile.social.github,
  }

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <GridBackground />

      <div className="relative max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Let's Connect"
          title="Get In Touch"
          intro={profile.availability}
        />

        <div className="grid md:grid-cols-2 gap-8 md:items-stretch">
          {/* ── Left — contact tiles ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start gap-2 text-slate-400 text-sm">
              <MapPin size={14} className="text-cyan flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{profile.location.city} · {profile.location.timezone} · Open to remote</span>
            </div>

            {contactCards.map((c) => (
              <ContactCard
                key={c.key}
                icon={c.icon}
                label={c.label}
                value={valueFor[c.key]}
                href={hrefFor[c.key]}
                accent={c.accent}
                external={c.key !== 'email'}
                allowCopy={c.key === 'email'}
              />
            ))}

            <a
              href={profile.resume}
              download
              className="mt-auto w-full relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[0.82rem] tracking-tight text-white bg-gradient-to-r from-violet via-violet to-cyan border border-white/10 shadow-[0_8px_30px_-8px_rgba(124,58,237,0.5)] hover:shadow-[0_10px_40px_-6px_rgba(34,211,238,0.55)] transition-[box-shadow] duration-300 select-none"
            >
              <Download size={15} className="opacity-90" />
              Download Resume
            </a>
          </motion.div>

          {/* ── Right — form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg text-white font-semibold">Send a message</h3>
              <span className="text-[0.7rem] font-mono uppercase tracking-widest text-slate-500">
                opens your mail client
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" />
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-slate-400 text-xs mb-1.5 block font-mono uppercase tracking-widest">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity…"
                required
                rows={5}
                className="flex-1 w-full bg-bg-base/60 border border-border-subtle focus:border-cyan/70 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              className="glow-btn mt-auto w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-violet to-cyan"
            >
              {sent ? (
                <>
                  <Check size={16} /> Mail client opened
                </>
              ) : (
                <>
                  <Send size={15} /> Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-slate-400 text-xs mb-1.5 block font-mono uppercase tracking-widest">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-bg-base/60 border border-border-subtle focus:border-cyan/70 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
      />
    </div>
  )
}
