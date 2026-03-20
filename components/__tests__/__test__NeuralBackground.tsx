/**
 * NeuralBackground Component Test
 * 
 * Simple test to verify the NeuralBackground component renders correctly
 * and integrates with the theme system.
 */

'use client';

import { NeuralBackground } from './NeuralBackground';
import { ThemeProvider } from './ThemeProvider';

export default function TestNeuralBackground() {
  return (
    <ThemeProvider defaultTheme="miami-nights">
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <NeuralBackground nodeCount={30} animationSpeed={0.5} opacity={0.2} />
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
        }}>
          <h1>NeuralBackground Test</h1>
          <p>You should see animated nodes and connections in the background.</p>
          <p>The colors should adapt to the Miami Nights theme.</p>
        </div>
      </div>
    </ThemeProvider>
  );
}
