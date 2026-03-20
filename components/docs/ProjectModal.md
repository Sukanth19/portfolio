# ProjectModal Component

## Overview

The `ProjectModal` component displays detailed project information in a modal overlay with keyboard navigation and accessibility support.

## Features

- **Expanded Details**: Shows full project description and additional information
- **Large Image Display**: Optimized project screenshot at larger size
- **Keyboard Navigation**: Escape key to close, full keyboard support
- **Click Outside**: Closes when clicking the overlay
- **Body Scroll Lock**: Prevents background scrolling when modal is open
- **Smooth Animations**: Fade in overlay and slide up content
- **Theme-Aware**: Adapts to active theme configuration
- **Accessible**: Proper ARIA attributes and focus management

## Props

```typescript
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
```

## Usage

```tsx
import { ProjectModal } from '@/components/ProjectModal';
import { useState } from 'react';

function MyComponent() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing project for close animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <ProjectModal
      project={selectedProject}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    />
  );
}
```

## Keyboard Shortcuts

- **Escape**: Close the modal
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Provides `aria-labelledby` for modal title
- Prevents body scroll when open
- Focus management for keyboard users
- Descriptive button labels

## Modal Content

The modal displays:
- Large project image (800x500px optimized)
- Project title
- Long description (or regular description if not available)
- Technology stack with badges
- Links to GitHub repository and live demo

## Animations

- **Overlay**: Fade in (0.2s)
- **Content**: Slide up with fade (0.3s)
- Respects prefers-reduced-motion

## Requirements

**Validates: Requirements 6.6**

- 6.6: Modal component for detailed project information with keyboard navigation
