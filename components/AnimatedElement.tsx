/**
 * AnimatedElement Component
 * 
 * Reusable wrapper component for Framer Motion animations.
 * Supports fade, slide, and scale animations with reduced motion support.
 * 
 * @see Requirements 7.1, 7.2, 7.3, 7.4, 7.5
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

/**
 * AnimatedElement props interface
 */
interface AnimatedElementProps {
  children: React.ReactNode;
  animation: 'fade' | 'slide' | 'scale';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

/**
 * Maximum animation duration (600ms as per requirement 7.3)
 */
const MAX_DURATION = 0.6;

/**
 * Default animation duration
 */
const DEFAULT_DURATION = 0.4;

/**
 * Slide animation distance in pixels
 */
const SLIDE_DISTANCE = 50;

/**
 * AnimatedElement component
 * 
 * Wraps children with Framer Motion animations.
 * Automatically detects and respects prefers-reduced-motion setting.
 */
export function AnimatedElement({
  children,
  animation,
  direction = 'up',
  delay = 0,
  duration = DEFAULT_DURATION,
}: AnimatedElementProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes to the setting
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Enforce maximum duration
  const safeDuration = Math.min(duration, MAX_DURATION);

  // Get animation variants based on animation type
  const variants = getAnimationVariants(animation, direction, prefersReducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0 : safeDuration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Get animation variants based on animation type and direction
 */
function getAnimationVariants(
  animation: 'fade' | 'slide' | 'scale',
  direction: 'up' | 'down' | 'left' | 'right',
  prefersReducedMotion: boolean
): Variants {
  // If user prefers reduced motion, minimize animations
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0.8 },
      visible: { opacity: 1 },
    };
  }

  switch (animation) {
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };

    case 'slide':
      return getSlideVariants(direction);

    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };

    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
}

/**
 * Get slide animation variants based on direction
 */
function getSlideVariants(direction: 'up' | 'down' | 'left' | 'right'): Variants {
  const variants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: SLIDE_DISTANCE },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -SLIDE_DISTANCE },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: SLIDE_DISTANCE },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -SLIDE_DISTANCE },
      visible: { opacity: 1, x: 0 },
    },
  };

  return variants[direction];
}
