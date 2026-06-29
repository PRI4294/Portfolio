import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Hash, Link2, Copy, MessageSquare } from 'lucide-react'

import { paletteItems } from '../../data/nav.js'

const iconForGroup = {
  Navigate:  Hash,
  Connect:   Link2,
  Resources: Copy,
}

const ICONS = {
  scroll:   Hash,
  open:     Link2,
  copy:     Copy,
  chatbot:  MessageSquare,
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef  = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return paletteItems
    return paletteItems.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q),
    )
  }, [query])

  // Reset on open / collapse
  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      // focus next tick (after motion renders)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setCursor(0)
  }, [query])

  // Keyboard interactions
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursor((c) => Math.min(c + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursor((c) => Math.max(c - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[cursor]) runItem(filtered[cursor])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, cursor, filtered, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  // Ensure highlighted item stays in view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-cursor="${cursor}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const runItem = (item) => {
    const a = item.action
    if (a.type === 'scroll') {
      const el = document.getElementById(a.target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (a.type === 'open') {
      if (a.url) window.open(a.url, a.url.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer')
    } else if (a.type === 'copy') {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(a.value)
    } else if (a.type === 'chatbot') {
      window.dispatchEvent(new CustomEvent('portfolio:open-chatbot'))
    }
    onClose()
  }

  // Group rendering
  let lastGroup = null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-xl rounded-2xl border border-border-subtle bg-bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle">
              <Search size={16} className="text-slate-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, links, actions…"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-slate-600"
              />
              <kbd className="text-[0.65rem] font-mono px-1.5 py-0.5 rounded border border-border-subtle text-slate-500">
                ESC
              </kbd>
            </div>

            {/* List */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-6 py-8 text-center text-slate-500 text-sm">
                  No matches for <span className="text-cyan font-mono">{query}</span>
                </div>
              )}

              {filtered.map((item, i) => {
                const showHeader = item.group !== lastGroup
                lastGroup = item.group
                const ItemIcon = ICONS[item.action.type] ?? iconForGroup[item.group]
                const active = i === cursor

                return (
                  <div key={`${item.group}-${item.label}`}>
                    {showHeader && (
                      <div className="px-4 pt-3 pb-1 text-[0.65rem] font-mono uppercase tracking-widest text-slate-600">
                        {item.group}
                      </div>
                    )}
                    <button
                      data-cursor={i}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => runItem(item)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? 'bg-violet/15 text-white'
                          : 'text-slate-300 hover:bg-violet/10'
                      }`}
                    >
                      {ItemIcon && <ItemIcon size={14} className={active ? 'text-cyan' : 'text-slate-500'} />}
                      <span className="flex-1">{item.label}</span>
                      {active && <ArrowRight size={13} className="text-cyan" />}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border-subtle text-[0.65rem] font-mono text-slate-600">
              <span>↑ ↓ navigate · ↵ select</span>
              <span>⌘K opens this</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
