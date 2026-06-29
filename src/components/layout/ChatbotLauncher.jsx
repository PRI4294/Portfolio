import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Sparkles } from 'lucide-react'

/**
 * Custom Botpress launcher.
 * Loads index.html-injected scripts, hides their native button via CSS,
 * and triggers open/close through whichever API version is present.
 *
 * Refined: smaller footprint, subtler idle state, smoother open/close.
 * Listens for `portfolio:open-chatbot` so the Command Palette can open it too.
 */
export default function ChatbotLauncher() {
  const [open, setOpen]     = useState(false)
  const [ready, setReady]   = useState(false)
  const [hovered, setHovered] = useState(false)

  // Detect when Botpress finishes injecting onto window
  useEffect(() => {
    let timer
    const check = () => {
      if (window.botpress || window.botpressWebChat) {
        setReady(true)
      } else {
        timer = setTimeout(check, 600)
      }
    }
    check()
    return () => clearTimeout(timer)
  }, [])

  const openBot = () => {
    try {
      if (window.botpress?.open) {
        window.botpress.open()
      } else if (window.botpressWebChat?.sendEvent) {
        window.botpressWebChat.sendEvent({ type: 'show' })
      } else if (window.botpressWebChat?.toggle) {
        window.botpressWebChat.toggle()
      } else {
        // eslint-disable-next-line no-console
        console.warn('[ChatbotLauncher] Botpress API not detected yet.')
      }
      setOpen(true)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[ChatbotLauncher] open failed', e)
    }
  }

  const closeBot = () => {
    try {
      if (window.botpress?.close) window.botpress.close()
      else if (window.botpressWebChat?.sendEvent) window.botpressWebChat.sendEvent({ type: 'hide' })
      else if (window.botpressWebChat?.toggle) window.botpressWebChat.toggle()
    } catch {}
    setOpen(false)
  }

  const toggle = () => (open ? closeBot() : openBot())

  // Allow other parts of the app (e.g. CommandPalette) to open the bot
  useEffect(() => {
    const onOpen = () => openBot()
    window.addEventListener('portfolio:open-chatbot', onOpen)
    return () => window.removeEventListener('portfolio:open-chatbot', onOpen)
  }, [])

  return (
    <>
      {/* Tooltip — only on hover, slides in from the button */}
      <AnimatePresence>
        {hovered && !open && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-[1.65rem] right-[4.6rem] z-40 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card/95 backdrop-blur border border-border-subtle text-[0.72rem] text-slate-200 shadow-lg pointer-events-none whitespace-nowrap"
          >
            <Sparkles size={11} className="text-cyan" />
            Chat with my AI
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button — smaller, more subtle */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-violet via-violet to-cyan shadow-[0_8px_30px_-6px_rgba(124,58,237,0.55)] border border-white/10"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        initial={{ opacity: 0, scale: 0.5, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, type: 'spring', stiffness: 220, damping: 18 }}
        aria-label={open ? 'Close chatbot' : 'Open AI chatbot'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <X size={18} strokeWidth={2.2} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <MessageCircle size={18} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulsing ring — more subtle */}
        <span
          className="absolute inset-0 rounded-2xl animate-ping opacity-[0.12] pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #22d3ee)' }}
        />

        {/* Status dot */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-bg-base ${
            ready ? 'bg-lime' : 'bg-amber-400'
          }`}
          title={ready ? 'AI ready' : 'AI loading'}
        />
      </motion.button>
    </>
  )
}
