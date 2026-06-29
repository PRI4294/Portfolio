import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

import Loader            from './components/Loader.jsx'
import Navbar            from './components/layout/Navbar.jsx'
import Footer            from './components/layout/Footer.jsx'
import CommandPalette    from './components/layout/CommandPalette.jsx'
import ChatbotLauncher   from './components/layout/ChatbotLauncher.jsx'

import Hero              from './components/sections/Hero.jsx'
import About             from './components/sections/About.jsx'
import Skills            from './components/sections/Skills.jsx'
import Projects          from './components/sections/Projects.jsx'
import Experience        from './components/sections/Experience.jsx'
import Certifications    from './components/sections/Certifications.jsx'
import Contact           from './components/sections/Contact.jsx'

import { ScrollProgress }  from './components/fx/ScrollProgress.jsx'
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut.js'

export default function App() {
  const [loading, setLoading]       = useState(true)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const openPalette  = useCallback(() => setPaletteOpen(true),  [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  // Global Cmd/Ctrl+K
  useKeyboardShortcut({ key: 'k', meta: true }, openPalette)

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative bg-bg-base text-slate-200 min-h-screen">
          {/* Top reading-progress bar */}
          <ScrollProgress />

          {/* Sticky navigation */}
          <Navbar onOpenPalette={openPalette} />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>

          <Footer />

          {/* Global UI */}
          <CommandPalette open={paletteOpen} onClose={closePalette} />
          <ChatbotLauncher />
        </div>
      )}
    </>
  )
}
