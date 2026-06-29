import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command, Home } from 'lucide-react'

import { navLinks } from '../../data/nav.js'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'
import { MagneticButton } from '../ui/MagneticButton.jsx'

export default function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const active = useScrollSpy(navLinks.map(l => l.href.slice(1)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background,border-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? 'py-3 bg-bg-base/65 backdrop-blur-2xl border-b border-border-subtle/50 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center group" aria-label="Home">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-glow-violet transition-transform duration-300 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #22d3ee)' }}
          >
            <Home size={17} strokeWidth={2.25} />
          </div>
        </a>

        {/* Desktop links — single onMouseLeave on the wrapper */}
        <div
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map(link => {
            const id = link.href.slice(1)
            const isActive  = active  === id
            const isHovered = hovered === id

            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHovered(id)}
                className="relative px-3.5 py-2 text-[0.82rem] font-medium tracking-tight transition-colors duration-200"
              >
                {/* Animated hover pill */}
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className={`relative z-10 transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}>
                  {link.label}
                </span>

                {/* Animated active underline (shared layoutId for smooth slide) */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-violet to-cyan"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          {/* Cmd+K trigger */}
          <button
            onClick={onOpenPalette}
            className="hidden sm:inline-flex items-center gap-1.5 text-[0.7rem] font-mono text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-border-subtle/70 hover:border-cyan/40 bg-bg-surface/30 hover:bg-bg-surface/60 transition-all duration-200"
            aria-label="Open command palette"
          >
            <Command size={11} />
            <span className="opacity-80">K</span>
          </button>

          {/* Hire Me */}
          <MagneticButton
            href="#contact"
            variant="primary"
            className="hidden md:inline-flex !px-4 !py-2 !text-[0.75rem]"
          >
            Hire Me
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-bg-surface/95 backdrop-blur-xl border-t border-border-subtle px-6 py-5 flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-cyan font-medium text-sm transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet to-cyan"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
