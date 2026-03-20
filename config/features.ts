/**
 * Feature Flags Configuration
 * 
 * Controls optional features and easter eggs in the portfolio.
 * Set flags to true/false to enable/disable features.
 * 
 * @see Requirement 13.4
 */

export interface FeatureFlags {
  enableCommandPalette: boolean;
  enableScanMode: boolean;
  enableNeuralBackground: boolean;
  enableHiddenTerminal: boolean;
}

export const featureFlags: FeatureFlags = {
  enableCommandPalette: true,
  enableScanMode: true,
  enableNeuralBackground: true,
  enableHiddenTerminal: true,
};
