/**
 * ThemeProvider Context Component
 * 
 * Manages global theme state for the portfolio website.
 * Provides theme context to all child components with localStorage persistence.
 * 
 * @see Requirements 1.2, 1.5, 1.6, 13.4
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeMode, ThemeConfig } from '@/types/theme';
import { getTheme } from '@/config/themes';

/**
 * Theme context value interface
 */
interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeConfig: ThemeConfig;
}

/**
 * ThemeProvider props interface
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * localStorage key for theme persistence
 */
const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Default theme mode
 */
const DEFAULT_THEME: ThemeMode = 'dark';

/**
 * ThemeProvider component
 * 
 * Manages theme state, persistence, and DOM application.
 * Wraps the application to provide theme context to all components.
 */
export function ThemeProvider({ children, defaultTheme = DEFAULT_THEME }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Restore theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    
    if (storedTheme && isValidTheme(storedTheme)) {
      setThemeState(storedTheme);
    }
    
    setMounted(true);
  }, []);

  // Apply theme to DOM whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    const themeConfig = getTheme(theme);
    applyThemeToDOM(theme, themeConfig);
  }, [theme, mounted]);

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  const themeConfig = getTheme(theme);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    themeConfig,
  };

  // Prevent flash of unstyled content by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * @throws Error if used outside ThemeProvider
 * @returns Theme context value
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * Validate if a string is a valid theme mode
 */
function isValidTheme(theme: string): theme is ThemeMode {
  return ['light', 'dark', 'vesper', 'miami-nights'].includes(theme);
}

/**
 * Apply theme configuration to DOM
 * 
 * Sets CSS custom properties on the document root for theme colors,
 * gradients, effects, and transitions.
 */
function applyThemeToDOM(theme: ThemeMode, config: ThemeConfig) {
  const root = document.documentElement;
  
  // Set theme mode as data attribute for CSS selectors
  root.setAttribute('data-theme', theme);
  
  // Apply background colors
  root.style.setProperty('--color-bg-primary', config.colors.background.primary);
  root.style.setProperty('--color-bg-secondary', config.colors.background.secondary);
  root.style.setProperty('--color-bg-tertiary', config.colors.background.tertiary);
  
  // Apply text colors
  root.style.setProperty('--color-text-primary', config.colors.text.primary);
  root.style.setProperty('--color-text-secondary', config.colors.text.secondary);
  root.style.setProperty('--color-text-accent', config.colors.text.accent);
  
  // Apply interactive colors
  root.style.setProperty('--color-interactive-primary', config.colors.interactive.primary);
  root.style.setProperty('--color-interactive-secondary', config.colors.interactive.secondary);
  root.style.setProperty('--color-interactive-hover', config.colors.interactive.hover);
  root.style.setProperty('--color-interactive-active', config.colors.interactive.active);
  
  // Apply border colors
  root.style.setProperty('--color-border-default', config.colors.border.default);
  root.style.setProperty('--color-border-accent', config.colors.border.accent);
  
  // Apply gradients
  root.style.setProperty('--gradient-primary', config.gradients.primary);
  root.style.setProperty('--gradient-secondary', config.gradients.secondary);
  root.style.setProperty('--gradient-accent', config.gradients.accent);
  
  // Apply effects
  if (config.effects.glow) {
    root.style.setProperty('--effect-glow-color', config.effects.glow.color);
    root.style.setProperty('--effect-glow-blur', config.effects.glow.blur);
  }
  
  root.style.setProperty('--effect-shadow-sm', config.effects.shadow.sm);
  root.style.setProperty('--effect-shadow-md', config.effects.shadow.md);
  root.style.setProperty('--effect-shadow-lg', config.effects.shadow.lg);
  
  // Apply transitions
  root.style.setProperty('--transition-duration-fast', config.transitions.duration.fast);
  root.style.setProperty('--transition-duration-normal', config.transitions.duration.normal);
  root.style.setProperty('--transition-duration-slow', config.transitions.duration.slow);
  root.style.setProperty('--transition-easing', config.transitions.easing);
  
  // Apply background color to body for smooth transitions
  document.body.style.backgroundColor = config.colors.background.primary;
  document.body.style.color = config.colors.text.primary;
  document.body.style.transition = `background-color ${config.transitions.duration.normal} ${config.transitions.easing}, color ${config.transitions.duration.normal} ${config.transitions.easing}`;
}
