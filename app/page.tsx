'use client'

import { useState, useEffect } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { BootSequence } from '@/components/BootSequence'
import { CursorSystem } from '@/components/interactive/CursorSystem'
import { BackgroundSystem } from '@/components/interactive/BackgroundSystem'
import { EnvironmentSystem } from '@/components/interactive/EnvironmentSystem'
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

export default function Home() {
  // Content always renders (and is server-rendered); the boot sequence is an overlay on top
  const [booted, setBooted] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

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

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
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

    if (section === 'terminal') {
      window.dispatchEvent(new CustomEvent('toggleTerminal'))
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

  return (
    // One easing curve for every animation that doesn't set its own; honours prefers-reduced-motion
    <MotionConfig transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} reducedMotion="user">
      {!booted && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-crimson via-lavender to-purple-deep z-[60]"
        style={{ scaleX: scrollProgress }}
      />

      <main className="relative min-h-screen">
        {/* Effect systems start after boot so they don't compete with it (they also read window while rendering) */}
        {booted && (
          <>
            <CursorSystem />
            <BackgroundSystem />
            <EnvironmentSystem />
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
    </MotionConfig>
  )
}
