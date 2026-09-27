'use client'

import { useState, useEffect } from 'react'
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
import { LabSection } from '@/components/LabSection'
import { EnvironmentSection } from '@/components/EnvironmentSection'
import { TerminalNew } from '@/components/TerminalNew'
import { Footer } from '@/components/Footer'
import { SettingsPanel } from '@/components/SettingsPanel'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useKonamiCode } from '@/hooks/useKonamiCode'

export default function Home() {
  const [booted, setBooted] = useState(false)
  const [showBootSequence, setShowBootSequence] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)
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
    // Show a fun notification
    const notification = document.createElement('div')
    notification.innerHTML = '🎮 KONAMI CODE ACTIVATED! Unlocking retro mode...'
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(184, 174, 216, 0.95);
      color: #0a0a0d;
      padding: 20px 40px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
      z-index: 10000;
      box-shadow: 0 0 30px rgba(184, 174, 216, 0.8);
      animation: fadeInOut 3s ease-in-out;
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 3000)

    // Add CSS animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
    `
    document.head.appendChild(style)
  })

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
          <GlitchEffect isActive={glitchActive} />
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
          <EnvironmentSection />
          <Footer />
          <SettingsPanel />
          <TerminalNew initialState="minimized" />
        </main>
      )}
    </>
  )
}
