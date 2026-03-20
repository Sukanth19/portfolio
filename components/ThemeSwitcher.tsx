/**
 * ThemeSwitcher Component
 * 
 * UI control for selecting between theme modes.
 * Displays all four available themes with visual indicator for active theme.
 * Responsive design adapts to all viewport sizes.
 * 
 * @see Requirements 4.1, 4.2, 4.3, 4.4, 4.5
 */

'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { ThemeMode } from '@/types/theme';

/**
 * Theme display metadata
 */
interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
}

/**
 * Available theme options with labels and icons
 */
const THEME_OPTIONS: ThemeOption[] = [
  { mode: 'light', label: 'Light', icon: '☀️' },
  { mode: 'dark', label: 'Dark', icon: '🌙' },
  { mode: 'vesper', label: 'Vesper', icon: '🌿' },
  { mode: 'miami-nights', label: 'Miami', icon: '🌴' },
];

/**
 * ThemeSwitcher component props
 */
export interface ThemeSwitcherProps {
  /**
   * Display variant (defaults to 'buttons')
   */
  variant?: 'buttons' | 'compact';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ThemeSwitcher component
 * 
 * Renders a button group allowing users to switch between theme modes.
 * Highlights the currently active theme and applies theme-aware styling.
 */
export function ThemeSwitcher({ variant = 'buttons', className = '' }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  return (
    <div
      className={`theme-switcher ${variant} ${className}`}
      role="radiogroup"
      aria-label="Theme selector"
    >
      {THEME_OPTIONS.map((option) => {
        const isActive = theme === option.mode;
        
        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={isActive ? 'true' : 'false'}
            aria-label={`${option.label} theme`}
            className={`theme-option ${isActive ? 'active' : ''}`}
            onClick={() => handleThemeChange(option.mode)}
            data-theme={option.mode}
          >
            <span className="theme-icon" aria-hidden="true">
              {option.icon}
            </span>
            <span className="theme-label">{option.label}</span>
          </button>
        );
      })}
      
      <style jsx>{`
        .theme-switcher {
          display: flex;
          gap: 0.5rem;
          padding: 0.25rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: 0.5rem;
          transition: all var(--transition-duration-normal) var(--transition-easing);
        }

        .theme-switcher.buttons {
          flex-wrap: wrap;
        }

        .theme-switcher.compact {
          flex-wrap: nowrap;
        }

        .theme-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 0.375rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-duration-fast) var(--transition-easing);
          white-space: nowrap;
        }

        .theme-option:hover {
          background: var(--color-bg-tertiary);
          color: var(--color-text-primary);
          border-color: var(--color-border-default);
        }

        .theme-option:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 2px;
        }

        .theme-option.active {
          background: var(--color-interactive-primary);
          color: var(--color-bg-primary);
          border-color: var(--color-interactive-primary);
          font-weight: 600;
        }

        .theme-option.active:hover {
          background: var(--color-interactive-hover);
          border-color: var(--color-interactive-hover);
        }

        .theme-icon {
          font-size: 1.125rem;
          line-height: 1;
        }

        .theme-label {
          line-height: 1;
        }

        /* Responsive: compact layout on small screens */
        @media (max-width: 640px) {
          .theme-switcher.buttons {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: thin;
          }

          .theme-option {
            padding: 0.5rem 0.75rem;
            font-size: 0.8125rem;
          }

          .theme-icon {
            font-size: 1rem;
          }
        }

        /* Extra small screens: icon-only mode */
        @media (max-width: 480px) {
          .theme-switcher.compact .theme-label {
            display: none;
          }

          .theme-option {
            padding: 0.5rem;
            min-width: 2.5rem;
            justify-content: center;
          }
        }

        /* Theme-specific glow effects for Miami Nights */
        :global([data-theme="miami-nights"]) .theme-option.active {
          box-shadow: 0 0 20px rgba(255, 0, 110, 0.4);
        }

        /* Theme-specific subtle effects for Vesper */
        :global([data-theme="vesper"]) .theme-option.active {
          box-shadow: 0 2px 8px rgba(168, 230, 207, 0.2);
        }
      `}</style>
    </div>
  );
}
