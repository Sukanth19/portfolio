/**
 * Theme Configuration Definitions
 * 
 * Defines all four theme modes with complete color schemes, gradients, effects, and transitions.
 * All themes maintain WCAG AA contrast ratios (minimum 4.5:1 for text).
 * 
 * @see Requirements 1.1, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4
 */

import { ThemeConfig, ThemeMode } from '@/types/theme';

/**
 * Miami Nights Theme
 * Cyberpunk-inspired neon theme with pink-purple-cyan gradients and glow effects
 * 
 * @see Requirement 2: Miami Nights Theme Specification
 */
export const miamiNightsTheme: ThemeConfig = {
  colors: {
    background: {
      primary: '#0a0a0a',      // Very dark base (near black)
      secondary: '#1a1a1a',    // Slightly lighter for cards/sections
      tertiary: '#2a2a2a',     // Elevated elements
    },
    text: {
      primary: '#ffffff',      // Pure white for maximum contrast (21:1 ratio)
      secondary: '#e0e0e0',    // Light grey for secondary text (16.5:1 ratio)
      accent: '#ff006e',       // Neon pink for highlights
    },
    interactive: {
      primary: '#ff006e',      // Neon pink for primary actions
      secondary: '#00f5ff',    // Cyan for secondary actions
      hover: '#ff1a7f',        // Lighter pink on hover
      active: '#ff3399',       // Even lighter pink when active
    },
    border: {
      default: '#333333',      // Subtle borders
      accent: '#ff006e',       // Neon pink accent borders
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #ff006e 0%, #8b00ff 50%, #00f5ff 100%)',
    secondary: 'linear-gradient(90deg, #ff006e 0%, #00f5ff 100%)',
    accent: 'linear-gradient(180deg, #8b00ff 0%, #ff006e 100%)',
  },
  effects: {
    glow: {
      color: '#ff006e',
      blur: '20px',
    },
    shadow: {
      sm: '0 2px 8px rgba(255, 0, 110, 0.2)',
      md: '0 4px 16px rgba(255, 0, 110, 0.3)',
      lg: '0 8px 32px rgba(255, 0, 110, 0.4)',
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '600ms',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Vesper Theme
 * Elegant dark theme with charcoal base, warm beige-grey gradients, and mint-green accents
 * 
 * @see Requirement 3: Vesper Theme Specification
 */
export const vesperTheme: ThemeConfig = {
  colors: {
    background: {
      primary: '#0f0f0f',      // Deep charcoal base
      secondary: '#1a1a1a',    // Slightly lighter for depth
      tertiary: '#252525',     // Elevated surfaces
    },
    text: {
      primary: '#f5f5f5',      // Off-white for excellent contrast (15.8:1 ratio)
      secondary: '#d4d4d4',    // Light grey for secondary text (11.6:1 ratio)
      accent: '#a8e6cf',       // Mint-green (peppermint) accent
    },
    interactive: {
      primary: '#a8e6cf',      // Mint-green for primary actions
      secondary: '#d4a574',    // Warm beige for secondary actions
      hover: '#b8f0df',        // Lighter mint on hover
      active: '#98d6bf',       // Slightly darker mint when active
    },
    border: {
      default: '#3a3a3a',      // Subtle grey borders
      accent: '#a8e6cf',       // Mint-green accent borders
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #d4a574 0%, #8a8a8a 50%, #f5f5f5 100%)',
    secondary: 'linear-gradient(90deg, #d4a574 0%, #f5f5f5 100%)',
    accent: 'linear-gradient(180deg, #a8e6cf 0%, #d4a574 100%)',
  },
  effects: {
    shadow: {
      sm: '0 2px 8px rgba(168, 230, 207, 0.1)',
      md: '0 4px 16px rgba(168, 230, 207, 0.15)',
      lg: '0 8px 32px rgba(168, 230, 207, 0.2)',
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '600ms',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Dark Theme
 * Classic dark mode with neutral greys and blue accents
 * 
 * @see Requirement 1: Theme Engine Core
 */
export const darkTheme: ThemeConfig = {
  colors: {
    background: {
      primary: '#121212',      // Material Design dark surface
      secondary: '#1e1e1e',    // Elevated surface
      tertiary: '#2a2a2a',     // Higher elevation
    },
    text: {
      primary: '#ffffff',      // Pure white (16.1:1 ratio)
      secondary: '#b3b3b3',    // Medium grey (7.9:1 ratio)
      accent: '#60a5fa',       // Blue accent
    },
    interactive: {
      primary: '#60a5fa',      // Blue for primary actions
      secondary: '#818cf8',    // Indigo for secondary actions
      hover: '#93c5fd',        // Lighter blue on hover
      active: '#3b82f6',       // Darker blue when active
    },
    border: {
      default: '#404040',      // Subtle borders
      accent: '#60a5fa',       // Blue accent borders
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)',
    secondary: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
    accent: 'linear-gradient(180deg, #818cf8 0%, #60a5fa 100%)',
  },
  effects: {
    shadow: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '600ms',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Light Theme
 * Clean light mode with white background and blue accents
 * 
 * @see Requirement 1: Theme Engine Core
 */
export const lightTheme: ThemeConfig = {
  colors: {
    background: {
      primary: '#ffffff',      // Pure white
      secondary: '#f5f5f5',    // Light grey for cards
      tertiary: '#e5e5e5',     // Slightly darker for depth
    },
    text: {
      primary: '#1a1a1a',      // Near black (15.3:1 ratio)
      secondary: '#666666',    // Medium grey (5.7:1 ratio)
      accent: '#2563eb',       // Blue accent
    },
    interactive: {
      primary: '#2563eb',      // Blue for primary actions
      secondary: '#4f46e5',    // Indigo for secondary actions
      hover: '#1d4ed8',        // Darker blue on hover
      active: '#1e40af',       // Even darker blue when active
    },
    border: {
      default: '#d4d4d4',      // Light grey borders
      accent: '#2563eb',       // Blue accent borders
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    secondary: 'linear-gradient(90deg, #1d4ed8 0%, #7c3aed 100%)',
    accent: 'linear-gradient(180deg, #4f46e5 0%, #2563eb 100%)',
  },
  effects: {
    shadow: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
      md: '0 4px 16px rgba(0, 0, 0, 0.15)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.2)',
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '600ms',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Theme registry mapping theme modes to their configurations
 */
export const themes: Record<ThemeMode, ThemeConfig> = {
  'miami-nights': miamiNightsTheme,
  'vesper': vesperTheme,
  'dark': darkTheme,
  'light': lightTheme,
};

/**
 * Get theme configuration by mode
 * 
 * @param mode - The theme mode to retrieve
 * @returns The theme configuration object
 */
export function getTheme(mode: ThemeMode): ThemeConfig {
  return themes[mode];
}

/**
 * Get all available theme modes
 * 
 * @returns Array of all theme mode identifiers
 */
export function getThemeModes(): ThemeMode[] {
  return Object.keys(themes) as ThemeMode[];
}
