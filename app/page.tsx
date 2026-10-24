'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BootSequence } from '@/components/BootSequence'
import { CursorSystem } from '@/components/interactive/CursorSystem'
import { BackgroundSystem } from '@/components/interactive/BackgroundSystem'
import { EnvironmentSystem } from '@/components/interactive/EnvironmentSystem'
import { GlitchEffect } from '@/components/effects/GlitchEffect'
import { Navigation } from '@/components/Navigation'
import { CommandPalette } from '@/components/CommandPalette'
import { Hero } from '@/components/Hero'
import { AboutSection } from '@/components/AboutSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { TechStackSection } from '@/components/TechStackSection'
import { BuildLogSection } from '@/components/BuildLogSection'
import { TopRepositories } from '@/components/TopRepositories'
import { LabSection } from '@/components/LabSection'
import { TerminalNew } from '@/components/TerminalNew'
import { Footer } from '@/components/Footer'
import { SettingsPanel } from '@/components/SettingsPanel'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useKonamiCode } from '@/hooks/useKonamiCode'

export default function Home() {
  // Content always renders (and is server-rendered); the boot sequence is an overlay on top
  const [booted, setBooted] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [konamiToast, setKonamiToast] = useState(false)
  const { commandPaletteOpen, setCommandPaletteOpen } = useKeyboard()

  useEffect(() => {
    // Check if user has seen boot sequence before
    const hasSeenBoot = localStorage.getItem('hasSeenBoot')
    if (hasSeenBoot) {
      setBooted(true)
    }

    // Listen for ESC key to skip boot
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !booted) {
        handleBootComplete()
      }
    }

    // Listen for glitch toggle
    const handleGlitchToggle = () => {
      setGlitchActive(prev => !prev)
    }

    window.addEventListener('keydown', handleEscape)
    window.addEventListener('toggleGlitch', handleGlitchToggle)
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      window.removeEventListener('toggleGlitch', handleGlitchToggle)
    }
  }, [booted])

  // Keep the page from scrolling behind the boot overlay
  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden'
  }, [booted])

  const handleBootComplete = () => {
    setBooted(true)
    localStorage.setItem('hasSeenBoot', 'true')
  }

  const handleNavigate = (section: string) => {
    if (section === 'command') {
      setCommandPaletteOpen(true)
      return
    }

    const sectionId = section === 'system' ? 'hero' : section
    const element = document.getElementById(sectionId)
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (section === 'system') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Konami Code Easter Egg
  useKonamiCode(() => {
    // Enable glitch mode and show snake game
    setGlitchActive(true)
    setKonamiToast(true)
    setTimeout(() => setKonamiToast(false), 3000)
  })

  return (
    <>
      {!booted && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      <AnimatePresence>
        {konamiToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            className="fixed top-1/2 left-1/2 z-[10000] rounded-lg bg-lavender/95 px-10 py-5 font-mono font-bold text-void shadow-[0_0_30px_rgba(184,174,216,0.8)]"
          >
            🎮 KONAMI CODE ACTIVATED! Unlocking retro mode...
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen">
        {/* Effect systems start after boot so they don't compete with it (they also read window while rendering) */}
        {booted && (
          <>
            <CursorSystem />
            <BackgroundSystem />
            <EnvironmentSystem />
            <GlitchEffect isActive={glitchActive} />
          </>
        )}
        <Navigation onNavigate={handleNavigate} />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onNavigate={handleNavigate}
        />

        <div id="hero">
          {/* Remount after boot so the intro animation plays once the overlay is gone */}
          <Hero key={booted ? 'booted' : 'booting'} />
        </div>
        
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechStackSection />
        <LabSection />
        <BuildLogSection />
        <TopRepositories />
        <Footer />
        <SettingsPanel />
        <TerminalNew initialState="minimized" />
      </main>
    </>
  )
}
