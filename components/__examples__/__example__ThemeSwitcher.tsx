/**
 * ThemeSwitcher Usage Example
 * 
 * Demonstrates how to use the ThemeSwitcher component in your application.
 */

import { ThemeSwitcher } from './ThemeSwitcher';

export default function ThemeSwitcherExample() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>ThemeSwitcher Examples</h2>
      
      {/* Default button variant */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Default (Buttons)</h3>
        <ThemeSwitcher />
      </section>

      {/* Compact variant */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Compact Variant</h3>
        <ThemeSwitcher variant="compact" />
      </section>

      {/* With custom className */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>With Custom Styling</h3>
        <ThemeSwitcher className="custom-theme-switcher" />
      </section>
    </div>
  );
}
