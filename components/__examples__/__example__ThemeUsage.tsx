/**
 * Example usage of ThemeProvider and useTheme hook
 * 
 * This file demonstrates how to use the theme system in components.
 * Delete this file after reviewing the examples.
 */

'use client';

import { useTheme } from './ThemeProvider';

/**
 * Example component showing how to access theme context
 */
export function ExampleThemeUsage() {
  const { theme, setTheme, themeConfig } = useTheme();

  return (
    <div style={{ 
      backgroundColor: themeConfig.colors.background.primary,
      color: themeConfig.colors.text.primary,
      padding: '2rem',
    }}>
      <h2>Current Theme: {theme}</h2>
      
      <div style={{ marginTop: '1rem' }}>
        <button 
          onClick={() => setTheme('light')}
          style={{
            backgroundColor: themeConfig.colors.interactive.primary,
            color: '#fff',
            padding: '0.5rem 1rem',
            margin: '0.25rem',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
        >
          Light
        </button>
        
        <button 
          onClick={() => setTheme('dark')}
          style={{
            backgroundColor: themeConfig.colors.interactive.primary,
            color: '#fff',
            padding: '0.5rem 1rem',
            margin: '0.25rem',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
        >
          Dark
        </button>
        
        <button 
          onClick={() => setTheme('vesper')}
          style={{
            backgroundColor: themeConfig.colors.interactive.primary,
            color: '#fff',
            padding: '0.5rem 1rem',
            margin: '0.25rem',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
        >
          Vesper
        </button>
        
        <button 
          onClick={() => setTheme('miami-nights')}
          style={{
            backgroundColor: themeConfig.colors.interactive.primary,
            color: '#fff',
            padding: '0.5rem 1rem',
            margin: '0.25rem',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
        >
          Miami Nights
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>Theme Colors:</h3>
        <pre style={{ 
          backgroundColor: themeConfig.colors.background.secondary,
          padding: '1rem',
          borderRadius: '0.25rem',
          overflow: 'auto',
        }}>
          {JSON.stringify(themeConfig.colors, null, 2)}
        </pre>
      </div>
    </div>
  );
}

/**
 * Example of using CSS custom properties set by ThemeProvider
 */
export function ExampleCSSVariables() {
  return (
    <div style={{
      backgroundColor: 'var(--color-bg-secondary)',
      color: 'var(--color-text-primary)',
      padding: '2rem',
      border: '2px solid var(--color-border-accent)',
      borderRadius: '0.5rem',
      boxShadow: 'var(--effect-shadow-md)',
    }}>
      <h2 style={{ color: 'var(--color-text-accent)' }}>
        Using CSS Custom Properties
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        This component uses CSS custom properties set by ThemeProvider.
        The colors automatically update when the theme changes.
      </p>
      <button style={{
        backgroundColor: 'var(--color-interactive-primary)',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        transition: 'background-color var(--transition-duration-fast) var(--transition-easing)',
      }}>
        Interactive Button
      </button>
    </div>
  );
}
