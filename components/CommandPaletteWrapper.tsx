/**
 * CommandPaletteWrapper Component
 * 
 * Wraps the application and provides global keyboard shortcuts for the Command Palette.
 * Handles Ctrl+K / Cmd+K to open palette, Escape to close.
 * Defines navigation and theme switching commands.
 * 
 * @see Requirements 15.1, 15.4, 15.5
 */

'use client';

import React, { useState, useEffect } from 'react';
import { CommandPalette, Command } from './CommandPalette';
import { useTheme } from './ThemeProvider';
import { ThemeMode } from '@/types/theme';

/**
 * CommandPaletteWrapper props interface
 */
interface CommandPaletteWrapperProps {
  children: React.ReactNode;
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80;
    const targetPosition = element.offsetTop - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * CommandPaletteWrapper component
 * 
 * Provides global keyboard listener for command palette activation and manages palette state.
 */
export function CommandPaletteWrapper({ children }: CommandPaletteWrapperProps) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { setTheme } = useTheme();

  // Define all available commands
  const commands: Command[] = [
    // Navigation commands
    {
      id: 'nav-home',
      label: 'Go to Home',
      description: 'Navigate to the hero section',
      category: 'Navigation',
      action: () => scrollToSection('hero'),
    },
    {
      id: 'nav-about',
      label: 'Go to About',
      description: 'Navigate to the about section',
      category: 'Navigation',
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      description: 'Navigate to the projects section',
      category: 'Navigation',
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-skills',
      label: 'Go to Skills',
      description: 'Navigate to the skills section',
      category: 'Navigation',
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-contact',
      label: 'Go to Contact',
      description: 'Navigate to the contact section',
      category: 'Navigation',
      action: () => scrollToSection('contact'),
    },
    // Theme switching commands
    {
      id: 'theme-light',
      label: 'Switch to Light Theme',
      description: 'Change theme to light mode',
      category: 'Theme',
      action: () => setTheme('light' as ThemeMode),
    },
    {
      id: 'theme-dark',
      label: 'Switch to Dark Theme',
      description: 'Change theme to dark mode',
      category: 'Theme',
      action: () => setTheme('dark' as ThemeMode),
    },
    {
      id: 'theme-vesper',
      label: 'Switch to Vesper Theme',
      description: 'Change theme to vesper mode',
      category: 'Theme',
      action: () => setTheme('vesper' as ThemeMode),
    },
    {
      id: 'theme-miami',
      label: 'Switch to Miami Nights Theme',
      description: 'Change theme to miami nights mode',
      category: 'Theme',
      action: () => setTheme('miami-nights' as ThemeMode),
    },
    // Scroll commands
    {
      id: 'scroll-top',
      label: 'Scroll to Top',
      description: 'Scroll to the top of the page',
      category: 'Navigation',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      id: 'scroll-bottom',
      label: 'Scroll to Bottom',
      description: 'Scroll to the bottom of the page',
      category: 'Navigation',
      action: () => window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth' 
      }),
    },
  ];

  useEffect(() => {
    /**
     * Handle global keyboard events
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
      
      // Escape to close command palette
      if (e.key === 'Escape' && isPaletteOpen) {
        e.preventDefault();
        setIsPaletteOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPaletteOpen]);

  return (
    <>
      {children}
      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)}
        commands={commands}
      />
    </>
  );
}
