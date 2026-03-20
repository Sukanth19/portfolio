# ProjectCard Component

## Overview

The `ProjectCard` component displays individual project information in a card layout with theme-aware styling, hover effects, and gradient borders.

## Features

- **Optimized Images**: Uses Next.js Image component for automatic optimization
- **Theme-Aware**: Adapts colors and styling based on active theme
- **Hover Effects**: Elevation effect on hover with smooth transitions
- **Gradient Borders**: Integrates GradientBorder component for theme-aware borders
- **Interactive Links**: GitHub and live demo links with proper accessibility
- **Keyboard Navigation**: Full keyboard support with Enter/Space key handling
- **Responsive Design**: Adapts to all viewport sizes

## Props

```typescript
interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  order: number;
}
```

## Usage

```tsx
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/data';

function MyComponent() {
  const handleClick = (project) => {
    console.log('Project clicked:', project);
  };

  return (
    <ProjectCard 
      project={projects[0]} 
      onClick={handleClick}
    />
  );
}
```

## Accessibility

- Uses semantic HTML with proper ARIA labels
- Supports keyboard navigation (Enter/Space to activate)
- Provides descriptive alt text for images
- Maintains focus indicators
- Links have descriptive aria-labels

## Requirements

**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 11.3**

- 6.1: Card-based layout for projects
- 6.2: Displays title, description, technology stack, and links
- 6.3: Links to GitHub repository and live deployment
- 6.4: Hover elevation effect
- 6.5: Theme-aware gradient borders
- 11.3: Optimized images using Next.js Image component
