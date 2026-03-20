# NeuralBackground Component

## Overview

The `NeuralBackground` component renders a subtle animated background with nodes and connections that adapt to the active theme. It uses the Canvas API for efficient rendering and provides a non-intrusive visual enhancement.

## Requirements

- **9.1**: Render animated nodes or graph elements
- **9.2**: Remain subtle and non-intrusive to content readability
- **9.3**: Adapt colors to the active theme mode
- **9.4**: Animate smoothly without impacting page performance
- **9.5**: Be visible but not distracting from primary content

## Props

```typescript
interface NeuralBackgroundProps {
  nodeCount?: number;        // Number of nodes to render (default: 50)
  animationSpeed?: number;   // Speed of node movement (default: 0.3)
  opacity?: number;          // Opacity of nodes and connections (default: 0.15)
}
```

## Usage

```tsx
import { NeuralBackground } from '@/components/NeuralBackground';

export default function Page() {
  return (
    <>
      <NeuralBackground />
      {/* Your content */}
    </>
  );
}
```

### Custom Configuration

```tsx
<NeuralBackground 
  nodeCount={75} 
  animationSpeed={0.5} 
  opacity={0.2} 
/>
```

## Features

- **Theme Integration**: Automatically adapts node and connection colors based on the active theme
- **Performance Optimized**: Uses Canvas API with requestAnimationFrame for smooth 60fps animation
- **Responsive**: Automatically resizes to match viewport dimensions
- **Non-Intrusive**: Fixed positioning with low z-index and pointer-events disabled
- **Accessible**: Marked with aria-hidden to prevent screen reader interference

## Implementation Details

### Node Behavior

- Nodes move continuously in random directions
- Nodes bounce off viewport edges
- Each node has a random radius between 1-3px

### Connection Logic

- Connections are drawn between nodes within 150px distance
- Connection opacity fades based on distance
- Uses theme's secondary interactive color

### Theme Colors

- **Nodes**: Uses `themeConfig.colors.interactive.primary`
- **Connections**: Uses `themeConfig.colors.interactive.secondary`

## Performance Considerations

- Canvas rendering is more efficient than SVG for many animated elements
- Animation frame is cancelled on component unmount
- Resize listener is properly cleaned up
- Low opacity ensures minimal visual impact on content readability
