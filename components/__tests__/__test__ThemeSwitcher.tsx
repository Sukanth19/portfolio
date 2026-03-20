/**
 * Quick integration test for ThemeSwitcher
 * Verifies the component can be imported and rendered
 */

'use client';

import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemeProvider } from './ThemeProvider';

export default function TestThemeSwitcher() {
  return (
    <ThemeProvider>
      <div style={{ padding: '2rem' }}>
        <h1>ThemeSwitcher Integration Test</h1>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
