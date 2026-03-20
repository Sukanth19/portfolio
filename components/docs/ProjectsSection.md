# ProjectsSection Component

## Overview

The `ProjectsSection` component displays portfolio projects in a responsive grid layout with staggered animations.

## Features

- **Responsive Grid**: 1 column on mobile, 2 columns on tablet, 3 columns on desktop
- **Staggered Animations**: Cards animate in sequence using AnimatedElement
- **Theme-Aware**: Adapts to active theme configuration
- **Modal Integration**: Optional click handler for project details modal
- **Featured Filter**: Option to show only featured projects

## Props

```typescript
interface ProjectsSectionProps {
  onProjectClick?: (project: Project) => void;
  showFeaturedOnly?: boolean;
}
```

## Usage

### Basic Usage

```tsx
import { ProjectsSection } from '@/components/ProjectsSection';

function MyPage() {
  return <ProjectsSection />;
}
```

### With Modal Integration

```tsx
import { ProjectsSection } from '@/components/ProjectsSection';
import { ProjectModal } from '@/components/ProjectModal';
import { useState } from 'react';

function MyPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <ProjectsSection onProjectClick={handleProjectClick} />
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

### Featured Projects Only

```tsx
<ProjectsSection showFeaturedOnly={true} />
```

## Responsive Breakpoints

- **Mobile (< 768px)**: 1 column grid
- **Tablet (768px - 1023px)**: 2 column grid
- **Desktop (≥ 1024px)**: 3 column grid
- **Large Desktop (≥ 1440px)**: 3 column grid with larger gaps

## Animation

Cards use staggered entrance animations with:
- Animation type: slide up
- Delay: 0.1s per card (index * 0.1)
- Duration: 0.5s
- Respects prefers-reduced-motion

## Requirements

**Validates: Requirements 6.1, 5.5, 7.1**

- 6.1: Card-based grid layout for projects
- 5.5: Consistent section spacing and styling
- 7.1: Staggered animations using Framer Motion
