/**
 * Example usage of GradientBorder component
 * Demonstrates various configurations and use cases
 */

'use client';

import { GradientBorder } from './GradientBorder';
import { ThemeProvider } from './ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function GradientBorderExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen p-8" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header with theme switcher */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              GradientBorder Examples
            </h1>
            <ThemeSwitcher />
          </div>

          {/* Example 1: Project Card */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Project Card with Primary Gradient
            </h2>
            <GradientBorder borderWidth={2} borderRadius={12} gradient="primary">
              <div className="p-6" style={{ background: 'var(--color-bg-secondary)' }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  Portfolio Website
                </h3>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  A visually striking personal portfolio with dynamic theming and smooth animations.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-sm rounded" style={{ 
                    background: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-accent)'
                  }}>
                    Next.js
                  </span>
                  <span className="px-3 py-1 text-sm rounded" style={{ 
                    background: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-accent)'
                  }}>
                    TypeScript
                  </span>
                  <span className="px-3 py-1 text-sm rounded" style={{ 
                    background: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-accent)'
                  }}>
                    Tailwind
                  </span>
                </div>
              </div>
            </GradientBorder>
          </section>

          {/* Example 2: Highlighted Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Highlighted Section with Secondary Gradient
            </h2>
            <GradientBorder borderWidth={3} borderRadius={16} gradient="secondary">
              <div className="p-8 text-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-accent)' }}>
                  Featured Content
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  This section uses a thicker border and secondary gradient for emphasis.
                </p>
              </div>
            </GradientBorder>
          </section>

          {/* Example 3: Accent Border */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Call-to-Action with Accent Gradient
            </h2>
            <GradientBorder borderWidth={2} borderRadius={8} gradient="accent">
              <div className="p-6 flex items-center justify-between" style={{ background: 'var(--color-bg-secondary)' }}>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    Get in Touch
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Let&apos;s discuss your next project
                  </p>
                </div>
                <button 
                  className="px-6 py-2 rounded font-medium transition-colors"
                  style={{ 
                    background: 'var(--color-interactive-primary)',
                    color: 'var(--color-bg-primary)'
                  }}
                >
                  Contact
                </button>
              </div>
            </GradientBorder>
          </section>

          {/* Example 4: Grid of Cards */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Grid Layout with Mixed Gradients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GradientBorder gradient="primary">
                <div className="p-4 h-32 flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
                  <span style={{ color: 'var(--color-text-primary)' }}>Primary</span>
                </div>
              </GradientBorder>
              <GradientBorder gradient="secondary">
                <div className="p-4 h-32 flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
                  <span style={{ color: 'var(--color-text-primary)' }}>Secondary</span>
                </div>
              </GradientBorder>
              <GradientBorder gradient="accent">
                <div className="p-4 h-32 flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
                  <span style={{ color: 'var(--color-text-primary)' }}>Accent</span>
                </div>
              </GradientBorder>
            </div>
          </section>

          {/* Example 5: Nested Borders */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Nested Gradient Borders
            </h2>
            <GradientBorder borderWidth={3} borderRadius={16} gradient="primary">
              <div className="p-6" style={{ background: 'var(--color-bg-secondary)' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  Outer Border
                </h3>
                <GradientBorder borderWidth={2} borderRadius={8} gradient="accent">
                  <div className="p-4" style={{ background: 'var(--color-bg-tertiary)' }}>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                      Inner content with nested gradient border
                    </p>
                  </div>
                </GradientBorder>
              </div>
            </GradientBorder>
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
}
