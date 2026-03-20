/**
 * EasterEggWrappers Component
 * 
 * Client component that handles dynamic loading of easter egg components.
 * Implements code splitting for optimal performance.
 * 
 * @see Requirements 11.5, 11.6
 */

'use client';

import dynamic from 'next/dynamic';
import { featureFlags } from '@/config/features';

// Lazy load easter egg components only when enabled
const TerminalWrapper = dynamic(
  () => import("@/components/TerminalWrapper").then(mod => ({ default: mod.TerminalWrapper })),
  { ssr: false }
);

const ScanModeWrapper = dynamic(
  () => import("@/components/ScanModeWrapper").then(mod => ({ default: mod.ScanModeWrapper })),
  { ssr: false }
);

const CommandPaletteWrapper = dynamic(
  () => import("@/components/CommandPaletteWrapper").then(mod => ({ default: mod.CommandPaletteWrapper })),
  { ssr: false }
);

interface EasterEggWrappersProps {
  children: React.ReactNode;
}

/**
 * EasterEggWrappers component
 * 
 * Conditionally renders easter egg wrapper components based on feature flags.
 * Uses dynamic imports for code splitting.
 */
export function EasterEggWrappers({ children }: EasterEggWrappersProps) {
  // Build the wrapper hierarchy based on enabled features
  let content = children;

  // Wrap with ScanMode if enabled
  if (featureFlags.enableScanMode) {
    content = <ScanModeWrapper>{content}</ScanModeWrapper>;
  }

  // Wrap with Terminal if enabled
  if (featureFlags.enableHiddenTerminal) {
    content = <TerminalWrapper>{content}</TerminalWrapper>;
  }

  // Wrap with CommandPalette if enabled
  if (featureFlags.enableCommandPalette) {
    content = <CommandPaletteWrapper>{content}</CommandPaletteWrapper>;
  }

  return <>{content}</>;
}
