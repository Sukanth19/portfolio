'use client'

import { useState, useEffect } from 'react'
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
import { LabSection } from '@/components/LabSection'
import { TerminalNew } from '@/components/TerminalNew'
import { Footer } from '@/components/Footer'
import { SettingsPanel } from '@/components/SettingsPanel'
import { useKeyboard } from '@/hooks/useKeyboard'

export default function Home() {
  const [booted, setBooted] = useState(false)
  const [showBootSequence, setShowBootSequence] = useState(true)
  const { commandPaletteOpen, setCommandPaletteOpen } = useKeyboard()

  useEffect(() => {
    // Check if user has seen boot sequence before
    const hasSeenBoot = localStorage.getItem('hasSeenBoot')
    if (hasSeenBoot) {
      setShowBootSequence(false)
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

  return (
    <>
      {showBootSequence && !booted && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {booted && (
        <main className="relative min-h-screen">
          <CursorSystem />
          <BackgroundSystem />
          <EnvironmentSystem />
          <Navigation onNavigate={handleNavigate} />
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onNavigate={handleNavigate}
          />

          <div id="hero">
            <Hero />
          </div>
          
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechStackSection />
          <LabSection />
          <Footer />
          <SettingsPanel />
          <TerminalNew initialState="minimized" />
        </main>
      )}
    </>
  )
}
