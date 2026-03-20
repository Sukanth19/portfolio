# Project Data Module

## Overview

The `lib/data.ts` module contains the Project type definition and sample project data for the portfolio website.

## Types

### Project Interface

```typescript
interface Project {
  id: string;              // Unique identifier
  title: string;           // Project name
  description: string;     // Short description (for cards)
  longDescription?: string; // Detailed description (for modal)
  technologies: string[];  // Tech stack
  githubUrl?: string;      // GitHub repository URL
  liveUrl?: string;        // Live deployment URL
  imageUrl?: string;       // Project screenshot path
  featured?: boolean;      // Featured project flag
  order: number;           // Display order
}
```

## Sample Data

The module includes 6 sample projects demonstrating various technologies:

1. **E-Commerce Platform** - Next.js, TypeScript, PostgreSQL, Stripe
2. **Task Management App** - React, Node.js, MongoDB, Socket.io
3. **Weather Dashboard** - Vue.js, TypeScript, OpenWeather API
4. **Portfolio CMS** - Next.js, Prisma, PostgreSQL
5. **AI Chat Interface** - React, TypeScript, OpenAI API
6. **Fitness Tracker** - React Native, TypeScript, Firebase

## Functions

### getProjects()

Returns all projects sorted by order.

```typescript
const projects = getProjects();
```

### getFeaturedProjects()

Returns only featured projects sorted by order.

```typescript
const featured = getFeaturedProjects();
```

### getProjectById(id: string)

Returns a specific project by ID or undefined if not found.

```typescript
const project = getProjectById('project-1');
```

## Customization

To add your own projects:

1. Replace the sample data in the `projects` array
2. Update project images in the `public/projects/` directory
3. Ensure each project has a unique `id`
4. Set appropriate `order` values for display sequence
5. Mark important projects as `featured: true`

## Image Requirements

- Place project images in `public/projects/`
- Recommended size: 600x400px or larger
- Supported formats: JPG, PNG, WebP
- Use descriptive filenames (e.g., `ecommerce.jpg`)

## Requirements

**Validates: Requirements 6.2, 12.2**

- 6.2: Project data structure with all required fields
- 12.2: TypeScript type definitions for type safety
