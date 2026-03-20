/**
 * Section Component Tests
 * 
 * Unit tests for the Section layout component.
 * Tests props, rendering, theme integration, and accessibility.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';
import { ThemeProvider } from './ThemeProvider';

/**
 * Helper function to render Section with ThemeProvider
 */
function renderWithTheme(ui: React.ReactElement, theme: 'light' | 'dark' | 'vesper' | 'miami-nights' = 'dark') {
  return render(
    <ThemeProvider defaultTheme={theme}>
      {ui}
    </ThemeProvider>
  );
}

describe('Section Component', () => {
  describe('Basic Rendering', () => {
    it('should render section with id', () => {
      renderWithTheme(
        <Section id="test-section">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('id', 'test-section');
    });

    it('should render children content', () => {
      renderWithTheme(
        <Section id="test-section">
          <p>Test content</p>
        </Section>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should render without title when title prop is not provided', () => {
      renderWithTheme(
        <Section id="test-section">
          <p>Test content</p>
        </Section>
      );

      const headings = screen.queryAllByRole('heading', { level: 2 });
      expect(headings).toHaveLength(0);
    });
  });

  describe('Title Rendering', () => {
    it('should render title when provided', () => {
      renderWithTheme(
        <Section id="test-section" title="Test Title">
          <p>Test content</p>
        </Section>
      );

      expect(screen.getByRole('heading', { level: 2, name: 'Test Title' })).toBeInTheDocument();
    });

    it('should render title as h2 element', () => {
      renderWithTheme(
        <Section id="test-section" title="Test Title">
          <p>Test content</p>
        </Section>
      );

      const heading = screen.getByText('Test Title');
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Background Variants', () => {
    it('should apply default background class when background prop is not provided', () => {
      renderWithTheme(
        <Section id="test-section">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section).toHaveClass('default');
    });

    it('should apply default background class when background="default"', () => {
      renderWithTheme(
        <Section id="test-section" background="default">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section).toHaveClass('default');
    });

    it('should apply alternate background class when background="alternate"', () => {
      renderWithTheme(
        <Section id="test-section" background="alternate">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section).toHaveClass('alternate');
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom className', () => {
      renderWithTheme(
        <Section id="test-section" className="custom-class">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section).toHaveClass('custom-class');
    });

    it('should preserve base classes when custom className is provided', () => {
      renderWithTheme(
        <Section id="test-section" className="custom-class">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section).toHaveClass('portfolio-section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      renderWithTheme(
        <Section id="test-section" title="Light Theme">
          <p>Test content</p>
        </Section>,
        'light'
      );

      expect(screen.getByText('Light Theme')).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      renderWithTheme(
        <Section id="test-section" title="Dark Theme">
          <p>Test content</p>
        </Section>,
        'dark'
      );

      expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    });

    it('should render with vesper theme', () => {
      renderWithTheme(
        <Section id="test-section" title="Vesper Theme">
          <p>Test content</p>
        </Section>,
        'vesper'
      );

      expect(screen.getByText('Vesper Theme')).toBeInTheDocument();
    });

    it('should render with miami-nights theme', () => {
      renderWithTheme(
        <Section id="test-section" title="Miami Nights Theme">
          <p>Test content</p>
        </Section>,
        'miami-nights'
      );

      expect(screen.getByText('Miami Nights Theme')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic section element', () => {
      renderWithTheme(
        <Section id="test-section">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByRole('region');
      expect(section.tagName).toBe('SECTION');
    });

    it('should have unique id for navigation', () => {
      renderWithTheme(
        <>
          <Section id="section-1">
            <p>Content 1</p>
          </Section>
          <Section id="section-2">
            <p>Content 2</p>
          </Section>
        </>
      );

      const sections = screen.getAllByRole('region');
      expect(sections[0]).toHaveAttribute('id', 'section-1');
      expect(sections[1]).toHaveAttribute('id', 'section-2');
    });

    it('should maintain proper heading hierarchy', () => {
      renderWithTheme(
        <Section id="test-section" title="Section Title">
          <h3>Subsection</h3>
          <p>Content</p>
        </Section>
      );

      const h2 = screen.getByRole('heading', { level: 2 });
      const h3 = screen.getByRole('heading', { level: 3 });
      
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
    });
  });

  describe('Complex Content', () => {
    it('should render complex nested content', () => {
      renderWithTheme(
        <Section id="test-section" title="Complex Section">
          <div>
            <p>Paragraph 1</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
            <p>Paragraph 2</p>
          </div>
        </Section>
      );

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });

    it('should render multiple sections', () => {
      renderWithTheme(
        <>
          <Section id="section-1" title="Section 1">
            <p>Content 1</p>
          </Section>
          <Section id="section-2" title="Section 2" background="alternate">
            <p>Content 2</p>
          </Section>
        </>
      );

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });
});
