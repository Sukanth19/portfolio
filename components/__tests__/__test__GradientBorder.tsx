/**
 * Quick integration test for GradientBorder
 * Verifies the component can be imported and rendered with different configurations
 */

'use client';

import { GradientBorder } from './GradientBorder';
import { ThemeProvider } from './ThemeProvider';

export default function TestGradientBorder() {
  return (
    <ThemeProvider>
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h1>GradientBorder Integration Test</h1>
        
        <section>
          <h2>Default Configuration</h2>
          <GradientBorder>
            <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)' }}>
              <p>Content with default gradient border (primary, 2px, 8px radius)</p>
            </div>
          </GradientBorder>
        </section>

        <section>
          <h2>Custom Border Width</h2>
          <GradientBorder borderWidth={4}>
            <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)' }}>
              <p>Content with 4px border width</p>
            </div>
          </GradientBorder>
        </section>

        <section>
          <h2>Custom Border Radius</h2>
          <GradientBorder borderRadius={16}>
            <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)' }}>
              <p>Content with 16px border radius</p>
            </div>
          </GradientBorder>
        </section>

        <section>
          <h2>Secondary Gradient</h2>
          <GradientBorder gradient="secondary">
            <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)' }}>
              <p>Content with secondary gradient</p>
            </div>
          </GradientBorder>
        </section>

        <section>
          <h2>Accent Gradient</h2>
          <GradientBorder gradient="accent">
            <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)' }}>
              <p>Content with accent gradient</p>
            </div>
          </GradientBorder>
        </section>

        <section>
          <h2>Combined Custom Props</h2>
          <GradientBorder borderWidth={3} borderRadius={20} gradient="accent">
            <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)' }}>
              <p>Content with 3px border, 20px radius, and accent gradient</p>
            </div>
          </GradientBorder>
        </section>
      </div>
    </ThemeProvider>
  );
}
