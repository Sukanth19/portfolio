'use client';

import { Navbar } from '@/components/Navbar';
import { Section } from '@/components/Section';

/**
 * Navbar Demo Page
 * 
 * Demonstrates the Navbar component with full portfolio sections.
 * Shows sticky navigation, smooth scrolling, and mobile responsiveness.
 */
export default function NavbarDemo() {
  return (
    <>
      <Navbar />
      
      <Section id="hero" background="default">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My Portfolio</h1>
          <p className="hero-description">
            This demo showcases the Navbar component with smooth scroll navigation,
            theme integration, and mobile responsiveness.
          </p>
          <p className="hero-instructions">
            Try scrolling to see the navbar stick and change appearance.
            Resize your browser to test the mobile menu.
          </p>
        </div>
      </Section>

      <Section id="about" title="About" background="alternate">
        <div className="content-block">
          <p>
            The Navbar component provides sticky navigation that remains visible
            during scrolling. It includes smooth scroll behavior when clicking
            navigation links.
          </p>
          <h3>Features:</h3>
          <ul>
            <li>Sticky positioning with scroll-aware styling</li>
            <li>Smooth scroll navigation to sections</li>
            <li>Integrated ThemeSwitcher component</li>
            <li>Responsive mobile menu for small viewports</li>
            <li>Full keyboard navigation support</li>
            <li>Theme-aware styling for all four themes</li>
          </ul>
        </div>
      </Section>

      <Section id="projects" title="Projects" background="default">
        <div className="content-block">
          <p>
            Click the navigation links above to smoothly scroll to different sections.
            The navbar automatically accounts for its own height when scrolling.
          </p>
          <div className="demo-cards">
            <div className="demo-card">
              <h3>Desktop Navigation</h3>
              <p>Horizontal layout with inline theme switcher</p>
            </div>
            <div className="demo-card">
              <h3>Mobile Menu</h3>
              <p>Full-screen overlay with hamburger button</p>
            </div>
            <div className="demo-card">
              <h3>Smooth Scrolling</h3>
              <p>Animated navigation to section anchors</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="skills" title="Skills" background="alternate">
        <div className="content-block">
          <p>
            The navbar responds to all four theme modes with appropriate styling:
          </p>
          <ul>
            <li><strong>Light & Dark:</strong> Standard color transitions with subtle hover effects</li>
            <li><strong>Miami Nights:</strong> Gradient brand text and enhanced glow effects</li>
            <li><strong>Vesper:</strong> Mint-green accents with elegant minimal styling</li>
          </ul>
          <p>
            Use the theme switcher in the navbar to see how it adapts to each theme.
          </p>
        </div>
      </Section>

      <Section id="contact" title="Contact" background="default">
        <div className="content-block">
          <p>
            The Navbar component is fully accessible with:
          </p>
          <ul>
            <li>Semantic HTML with proper ARIA labels</li>
            <li>Full keyboard navigation support</li>
            <li>Visible focus indicators</li>
            <li>Screen reader friendly</li>
          </ul>
          <p>
            Try navigating with your keyboard using Tab and Enter keys.
          </p>
        </div>
      </Section>

      <style jsx>{`
        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 0;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .hero-instructions {
          font-size: 1rem;
          color: var(--color-text-accent);
          font-style: italic;
        }

        .content-block {
          max-width: 800px;
          margin: 0 auto;
        }

        .content-block p {
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .content-block h3 {
          color: var(--color-text-primary);
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
        }

        .content-block ul {
          list-style: disc;
          padding-left: 2rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        .content-block li {
          margin-bottom: 0.5rem;
        }

        .demo-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .demo-card {
          padding: 2rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-default);
          border-radius: 0.5rem;
          transition: all var(--transition-duration-normal) var(--transition-easing);
        }

        .demo-card:hover {
          border-color: var(--color-border-accent);
          transform: translateY(-4px);
          box-shadow: var(--effect-shadow-md);
        }

        .demo-card h3 {
          color: var(--color-text-accent);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
        }

        .demo-card p {
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1.125rem;
          }

          .demo-cards {
            grid-template-columns: 1fr;
          }
        }

        /* Theme-specific enhancements */
        :global([data-theme="miami-nights"]) .hero-title {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        :global([data-theme="vesper"]) .hero-title {
          color: var(--color-text-accent);
        }
      `}</style>
    </>
  );
}
