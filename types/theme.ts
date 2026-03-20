/**
 * Theme Type Definitions
 * 
 * Defines all theme-related types and interfaces for the portfolio website.
 * Supports four theme modes: light, dark, vesper, and miami-nights.
 * 
 * @see Requirements 1.1, 12.2, 12.3
 */

/**
 * Available theme modes for the portfolio
 */
export type ThemeMode = 'light' | 'dark' | 'vesper' | 'miami-nights';

/**
 * Complete theme configuration including colors, gradients, effects, and transitions
 */
export interface ThemeConfig {
  colors: ThemeColors;
  gradients: ThemeGradients;
  effects: ThemeEffects;
  transitions: ThemeTransitions;
}

/**
 * Color palette for a theme mode
 */
export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  interactive: {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
  };
  border: {
    default: string;
    accent: string;
  };
}

/**
 * CSS gradient definitions for theme
 */
export interface ThemeGradients {
  primary: string;
  secondary: string;
  accent: string;
}

/**
 * Visual effects configuration for theme
 */
export interface ThemeEffects {
  glow?: {
    color: string;
    blur: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
}

/**
 * Animation and transition timing configuration
 */
export interface ThemeTransitions {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: string;
}

/**
 * Theme context value provided by ThemeProvider
 */
export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeConfig: ThemeConfig;
}
